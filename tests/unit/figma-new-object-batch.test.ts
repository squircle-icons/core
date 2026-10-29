import { readFile } from 'node:fs/promises';
import { expect, it } from 'vitest';
import pathParser from 'svg-path-parser';

const ids = [
  'info',
  'alert',
  'repeat',
  'reply',
  'link',
  'external-link',
  'image',
  'globe',
  'code',
  'terminal',
  'shopping-bag',
  'bell-ring',
];
const source = (id: string, style = 'outline') =>
  readFile(new URL(`../../icons/figma-study/${id}/${style}.svg`, import.meta.url), 'utf8');
const tags = (svg: string) => [...svg.matchAll(/<path\b[^>]*>/g)].map((m) => m[0]);
const data = (tag: string) => tag.match(/\bd="([^"]+)"/)![1];
const commands = (d: string) => pathParser.makeAbsolute(pathParser.parseSVG(d));
const attribute = (tag: string, name: string) => tag.match(new RegExp(`\\b${name}="([^"]+)"`))?.[1];
type Point = [number, number];

// Native Figma exports use cubics and lines. Sampling is only for interior
// probes and distance from a line-based mark, not a global smoothness claim.
function contours(d: string) {
  const result: Point[][] = [];
  let points: Point[] = [];
  for (const c of commands(d)) {
    if (c.code === 'M') {
      points = [[c.x, c.y]];
      result.push(points);
    } else if (c.code === 'C') {
      for (let i = 1; i <= 64; i++) {
        const t = i / 64,
          u = 1 - t;
        points.push([
          u ** 3 * c.x0 + 3 * u ** 2 * t * c.x1 + 3 * u * t ** 2 * c.x2 + t ** 3 * c.x,
          u ** 3 * c.y0 + 3 * u ** 2 * t * c.y1 + 3 * u * t ** 2 * c.y2 + t ** 3 * c.y,
        ]);
      }
    } else if (['L', 'H', 'V', 'Z'].includes(c.code)) points.push([c.x, c.y]);
    else throw new Error(`Unexpected native export command ${c.code}`);
  }
  return result;
}
function inside(polys: Point[][], [x, y]: Point, rule: string) {
  let winding = 0;
  for (const ps of polys)
    for (let i = 0, j = ps.length - 1; i < ps.length; j = i++) {
      const [xi, yi] = ps[i],
        [xj, yj] = ps[j];
      const cross = (xi - xj) * (y - yj) - (x - xj) * (yi - yj);
      if (yj <= y && yi > y && cross > 0) winding++;
      if (yj > y && yi <= y && cross < 0) winding--;
    }
  return rule === 'evenodd' ? Math.abs(winding) % 2 === 1 : winding !== 0;
}

function distance(polys: Point[][], [x, y]: Point) {
  let best = Infinity;
  for (const ps of polys)
    for (let i = 1; i < ps.length; i++) {
      const [ax, ay] = ps[i - 1],
        [bx, by] = ps[i];
      const dx = bx - ax,
        dy = by - ay,
        length = dx * dx + dy * dy;
      const t = length ? Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / length)) : 0;
      best = Math.min(best, Math.hypot(x - ax - t * dx, y - ay - t * dy));
    }
  return best;
}
function composition(svg: string) {
  const rootFill = attribute(svg.slice(0, svg.indexOf('>') + 1), 'fill') ?? 'black';
  const parts = tags(svg).map((tag) => ({
    polygons: contours(data(tag)),
    fill: attribute(tag, 'fill') ?? rootFill,
    rule: attribute(tag, 'fill-rule') ?? 'nonzero',
    stroke: attribute(tag, 'stroke'),
    width: Number(attribute(tag, 'stroke-width') ?? 1),
  }));
  return (point: Point) =>
    parts.some(
      (p) =>
        (p.fill !== 'none' && inside(p.polygons, point, p.rule)) ||
        (p.stroke !== undefined &&
          p.stroke !== 'none' &&
          distance(p.polygons, point) <= p.width / 2),
    );
}
function firstContour(d: string) {
  const all = commands(d),
    next = all.findIndex((c, i) => i > 0 && c.code === 'M');
  return next < 0 ? all : all.slice(0, next);
}
function inheritedGeometry(actual: string, original: string, translation: Point = [0, 0]) {
  const a = firstContour(actual),
    b = firstContour(original);
  expect(a.map((c) => c.code)).toEqual(b.map((c) => c.code));
  for (let i = 0; i < a.length; i++) {
    for (const [x, y] of [
      ['x', 'y'],
      ['x1', 'y1'],
      ['x2', 'y2'],
    ] as const) {
      if (x in b[i]) {
        const aa = a[i] as unknown as Record<string, number>;
        const bb = b[i] as unknown as Record<string, number>;
        expect(
          Math.hypot(aa[x] - bb[x] - translation[0], aa[y] - bb[y] - translation[1]),
        ).toBeLessThan(0.0002);
      }
    }
  }
}

it('keeps the twelve new identities native, safe and consistently stroked', async () => {
  for (const id of ids) {
    for (const style of ['outline', 'filled']) {
      const svg = await source(id, style);
      expect(svg).toContain('width="24" height="24" viewBox="0 0 24 24"');
      expect(svg).not.toMatch(
        /NaN|Infinity|undefined|<(?:image|mask|foreignObject|script)\b|\btransform=/,
      );
      // Figma's white rectangles inside defs establish clipping, not opaque
      // surface patches. Check the painted composition outside definitions.
      expect(svg.replace(/<defs>[\s\S]*?<\/defs>/g, '')).not.toMatch(
        /(?:fill|stroke)="(?:white|#fff(?:fff)?)"/i,
      );
      const stroked = tags(svg).filter(
        (t) => attribute(t, 'stroke') !== undefined && attribute(t, 'stroke') !== 'none',
      );
      if (style === 'outline') expect(stroked.length).toBeGreaterThan(0);
      for (const tag of stroked) {
        expect(attribute(tag, 'stroke-width')).toBe('1.5');
        // The Bag handle stops inside the shared upper-body ribbon. Its butt
        // terminals avoid the hanging round caps the owner rejected.
        if (
          style === 'outline' &&
          ((id === 'shopping-bag' && tag === stroked[0]) || (id === 'image' && tag === stroked[1]))
        )
          expect(attribute(tag, 'stroke-linecap') ?? 'butt').toBe('butt');
        else expect(attribute(tag, 'stroke-linecap')).toBe('round');
      }
      if (style === 'filled') {
        // Bell's exact inherited fill keeps native1.5 ringing accent marks.
        expect(stroked).toHaveLength(id === 'bell-ring' ? 1 : 0);
        for (const tag of tags(svg).filter((t) => !stroked.includes(t)))
          expect(commands(data(tag)).at(-1)!.code).toBe('Z');
      }
      for (const tag of tags(svg))
        for (const c of commands(data(tag)))
          for (const value of Object.values(c))
            if (typeof value === 'number') expect(Number.isFinite(value)).toBe(true);
    }
  }
});

it('inherits the current Triangle body and complete crown-free Bell', async () => {
  for (const style of ['outline', 'filled']) {
    inheritedGeometry(
      data(tags(await source('alert', style))[0]),
      data(tags(await source('triangle', style))[0]),
    );
    const bell = tags(await source('bell', style)),
      ringing = tags(await source('bell-ring', style));
    expect(ringing).toHaveLength(bell.length + 1);
    for (let i = 0; i < bell.length; i++) {
      // Filled Bell contains the shell and clapper subpaths. Compare
      // every command, not only its first exterior or a bounding box.
      const a = commands(data(ringing[i])),
        b = commands(data(bell[i]));
      expect(a.map((c) => c.code)).toEqual(b.map((c) => c.code));
      for (let j = 0; j < a.length; j++)
        for (const key of ['x', 'y', 'x1', 'y1', 'x2', 'y2'] as const)
          if (key in b[j])
            expect(
              Math.abs(
                (a[j] as unknown as Record<string, number>)[key] -
                  (b[j] as unknown as Record<string, number>)[key],
              ),
            ).toBeLessThan(0.0002);
    }
  }
});

it('uses the requested Circle Info housing while retaining its original i position and dimensions', async () => {
  const outline = tags(await source('info')),
    filled = tags(await source('info', 'filled'));
  const ring = commands(data(outline[0]));
  expect(ring.map((c) => c.code)).toEqual(['M', 'C', 'C', 'C', 'C', 'Z']);
  for (const [style, d, radius] of [
    ['outline', data(outline[0]), 9.25],
    ['filled', data(filled[0]), 10],
  ] as const) {
    const points = contours(d)[0];
    const xs = points.map(([x]) => x),
      ys = points.map(([, y]) => y);
    expect(Math.min(...xs)).toBeCloseTo(12 - radius, 4);
    expect(Math.max(...xs)).toBeCloseTo(12 + radius, 4);
    expect(Math.min(...ys)).toBeCloseTo(12 - radius, 4);
    expect(Math.max(...ys)).toBeCloseTo(12 + radius, 4);
    // Figma's ordinary cubic circle has a small known radial approximation.
    // Its semantic circle endpoints/center remain fixed; a squircle fails this.
    for (const [x, y] of points)
      expect(Math.abs(Math.hypot(x - 12, y - 12) - radius), style).toBeLessThan(0.003);
  }
  const dot = contours(data(outline[1]))[0],
    stem = commands(data(outline[2]));
  expect(Math.min(...dot.map(([x]) => x))).toBeCloseTo(11.25, 4);
  expect(Math.max(...dot.map(([x]) => x))).toBeCloseTo(12.75, 4);
  expect(Math.min(...dot.map(([, y]) => y))).toBe(7);
  expect(Math.max(...dot.map(([, y]) => y))).toBe(8.5);
  expect(stem.map((c) => c.code)).toEqual(['M', 'V']);
  for (const [i, [x, y]] of [
    [12, 11.25],
    [12, 16.25],
  ].entries()) {
    expect(stem[i].x).toBeCloseTo(x, 4);
    expect(stem[i].y).toBe(y);
  }
  const paint = composition(await source('info', 'filled'));
  for (const p of [
    [12, 7.75],
    [12, 13.5],
  ] as Point[])
    expect(paint(p)).toBe(false);
  expect(paint([12, 2.5])).toBe(true);
  expect(paint([3, 3])).toBe(false);
});

it('retains the shorter fuller Link rings while trimming only its diagonal connector', async () => {
  const parts = tags(await source('link'));
  expect(parts).toHaveLength(3);
  for (const tag of parts.slice(0, 2)) {
    const points = contours(data(tag))[0];
    const short = points.map(([x, y]) => (x + y - 24) / Math.SQRT2);
    const long = points.map(([x, y]) => (x - y) / Math.SQRT2);
    expect(Math.max(...short) - Math.min(...short)).toBeCloseTo(8.997077639, 3);
    expect(Math.max(...long) - Math.min(...long)).toBeCloseTo(8.085327898, 3);
  }
  const connector = commands(data(parts[2]));
  expect(connector.map((c) => c.code)).toEqual(['M', 'L']);
  for (const [i, [x, y]] of [
    [9.38309339, 14.61694661],
    [14.61704661, 9.38303339],
  ].entries())
    expect(Math.hypot(connector[i].x - x, connector[i].y - y)).toBeLessThan(0.0002);
});

it('joins the ABOVE Bag handle to its upper ribbon and retains the gently flared walls', async () => {
  const outline = await source('shopping-bag'),
    parts = tags(outline);
  expect(parts).toHaveLength(2);
  const handle = commands(data(parts[0])),
    body = commands(data(parts[1]));
  const start = handle[0],
    end = handle.at(-1)!;
  expect(start.x).toBe(8.5);
  expect(end.x).toBe(15.5);
  expect(start.y).toBeCloseTo(8.320223469, 4);
  expect(end.y).toBe(start.y);
  const bodyContour = contours(data(parts[1]));
  for (const terminal of [start, end])
    expect(distance(bodyContour, [terminal.x, terminal.y])).toBeLessThan(0.1);
  const right = body.find((c) => Math.abs(c.x0 - 18.27) < 0.0001 && c.y0 === 10.4)!;
  expect(right.code).toBe('C');
  if (right.code !== 'C') throw new Error('Missing Bag slope');
  expect([right.x, right.y]).toEqual([20.094, 18.4]);
  expect((right.x - right.x0) / (right.y - right.y0)).toBeCloseTo(0.228, 6);
  for (const [x, y] of [
    [right.x1, right.y1],
    [right.x2, right.y2],
  ])
    expect(Math.abs((x - right.x0) * 8 - (y - right.y0) * 1.824)).toBeLessThan(0.001);
  const outlinePaint = composition(outline),
    filledPaint = composition(await source('shopping-bag', 'filled'));
  for (const p of [
    [8.5, start.y],
    [15.5, end.y],
  ] as Point[]) {
    expect(outlinePaint(p)).toBe(true);
    expect(filledPaint(p)).toBe(true);
  }
  for (const p of [
    [8.5, 9.25],
    [15.5, 9.25],
  ] as Point[])
    expect(outlinePaint(p)).toBe(false);
  for (const p of [
    [12, 5],
    [12, 7],
  ] as Point[])
    expect(filledPaint(p)).toBe(false);
  expect(filledPaint([12, 16])).toBe(true);
});

it('connects both Image landscape ends to the original frame with protected Filled bridges', async () => {
  const outline = await source('image'),
    parts = tags(outline),
    mark = commands(data(parts[1]));
  expect(attribute(parts[1], 'stroke-linecap') ?? 'butt').toBe('butt');
  const ends = [mark[0], mark.at(-1)!];
  const body = commands(data(parts[0])).filter((c) => c.code === 'C');
  for (const [i, [x, y]] of [
    [4.27375978, 18.83393107],
    [20.29152433, 18.20550714],
  ].entries()) {
    expect(Math.hypot(ends[i].x - x, ends[i].y - y)).toBeLessThan(0.0002);
    const c = body[i === 0 ? 2 : 0],
      t = i === 0 ? 0.9797174549737411 : 0.8743745435617252,
      u = 1 - t;
    const bx = u ** 3 * c.x0 + 3 * u * u * t * c.x1 + 3 * u * t * t * c.x2 + t ** 3 * c.x;
    const by = u ** 3 * c.y0 + 3 * u * u * t * c.y1 + 3 * u * t * t * c.y2 + t ** 3 * c.y;
    expect(Math.hypot(ends[i].x - bx, ends[i].y - by)).toBeLessThan(0.0002);
  }
  expect(data(parts[1])).toContain('L14.1 16.7L16.25 14.3');
  const filled = composition(await source('image', 'filled'));
  for (const p of [
    [16.6, 8.4],
    [10.05, 12.3],
    [6, 17.5],
    [19, 16.6],
  ] as Point[])
    expect(filled(p)).toBe(false);
  for (const p of [
    [4.2738, 18.8339],
    [20.2916, 18.2055],
    [12, 19.5],
  ] as Point[])
    expect(filled(p)).toBe(true);
});

it('removes the Bell crowns while retaining the separate clapper gap and Ring accents', async () => {
  for (const id of ['bell', 'bell-ring']) {
    const outline = await source(id),
      filled = await source(id, 'filled');
    const outlineParts = tags(outline),
      filledParts = tags(filled);
    expect(outlineParts).toHaveLength(id === 'bell' ? 2 : 3);
    expect(commands(data(outlineParts[0])).map((c) => c.code)).toEqual(['M', 'C', 'C']);
    expect(data(outlineParts[1])).toContain('M12.0001 4.5');
    for (const svg of [outline, filled]) {
      const paint = composition(svg);
      expect(paint([12, 2.75])).toBe(false);
      expect(paint([12, 4])).toBe(true);
      expect(paint([12, 19.25])).toBe(false);
      expect(paint([12, 21.1])).toBe(true);
    }
    // Filled keeps the solid clapper, rather than introducing an inner hole.
    expect(composition(filled)([12, 20.25])).toBe(true);
    if (id === 'bell-ring') {
      expect(data(outlineParts[2])).toBe(data(filledParts[1]));
      const accents = commands(data(outlineParts[2]));
      expect(accents.map((c) => c.code)).toEqual(['M', 'C', 'M', 'C']);
      expect([accents[0].x, accents[0].y]).toEqual([4.35004, 5.89999]);
      expect([accents[2].x, accents[2].y]).toEqual([19.65, 5.89999]);
    }
  }
});

it('keeps the taller Terminal housing20×18 and centers its original prompt and underscore', async () => {
  const outline = tags(await source('terminal'));
  const bounds = (points: Point[]) => [
    Math.min(...points.map(([x]) => x)),
    Math.min(...points.map(([, y]) => y)),
    Math.max(...points.map(([x]) => x)),
    Math.max(...points.map(([, y]) => y)),
  ];
  const centerline = bounds(contours(data(outline[0]))[0]);
  const visible = centerline.map((v, i) => v + (i < 2 ? -0.75 : 0.75));
  expect(visible).toEqual([2, 3, 22, 21]);
  expect(bounds(contours(data(tags(await source('terminal', 'filled'))[0]))[0])).toEqual([
    2, 3, 22, 21,
  ]);
  const prompt = commands(data(outline[1]));
  expect(prompt.map((c) => c.code)).toEqual(['M', 'L', 'L']);
  for (const [i, [x, y]] of [
    [7, 8.85],
    [10.15, 12],
    [7, 15.15],
  ].entries()) {
    expect(prompt[i].x).toBeCloseTo(x, 4);
    expect(prompt[i].y).toBeCloseTo(y, 4);
  }
  const underscore = commands(data(outline[2]));
  expect(underscore.map((c) => [c.x, c.y])).toEqual([
    [13.1, 15.15],
    [16.9, 15.15],
  ]);
  // True1.5 counters keep the original mark dimensions after the sharedY+.35
  // centering move; nearby solid samples prevent a merely enlarged opening.
  const filled = composition(await source('terminal', 'filled'));
  for (const point of [
    [7, 8.85],
    [10.15, 12],
    [7, 15.15],
    [15, 15.15],
  ] as Point[])
    expect(filled(point)).toBe(false);
  for (const point of [
    [11, 12],
    [15, 14.25],
    [15, 16.05],
    [12, 6],
    [12, 18],
  ] as Point[])
    expect(filled(point)).toBe(true);
});

it('preserves genuine semantic counters and solid shell bridges', async () => {
  const probes: Record<string, { clear: Point[]; solid: Point[] }> = {
    info: {
      clear: [
        [12, 7.75],
        [12, 13.5],
      ],
      solid: [[7, 7]],
    },
    alert: {
      clear: [
        [12, 11.5],
        [12, 17],
      ],
      solid: [[8, 15]],
    },
    image: {
      clear: [
        [16.6, 8.4],
        [10.05, 12.3],
      ],
      solid: [[12, 19.5]],
    },
    globe: {
      clear: [
        [12, 12],
        [16, 12],
      ],
      solid: [
        [12, 2.5],
        [3, 12],
      ],
    },
    terminal: {
      clear: [
        [8.5, 10],
        [15, 14.8],
      ],
      solid: [[12, 6]],
    },
    'shopping-bag': { clear: [[12, 6]], solid: [[12, 16]] },
  };
  for (const [id, points] of Object.entries(probes)) {
    const painted = composition(await source(id, 'filled'));
    for (const point of points.clear) expect(painted(point)).toBe(false);
    for (const point of points.solid) expect(painted(point)).toBe(true);
  }
});

it('keeps Link and Code Filled as the same unboxed centerlines expanded at Bold2.5', async () => {
  for (const id of ['link', 'code']) {
    const lines = tags(await source(id)).flatMap((t) => contours(data(t)));
    const painted = composition(await source(id, 'filled'));
    // Compare complete marks across a native grid, skipping only a narrow
    // antialias/export boundary band. This catches a frame, shifted centerline,
    // closed bracket interior or accidental1.5/variable Filled stroke.
    for (let y = 0.25; y < 24; y += 0.5)
      for (let x = 0.25; x < 24; x += 0.5) {
        const d = distance(lines, [x, y]);
        if (Math.abs(d - 1.25) > 0.03)
          expect(painted([x, y]), `${id}: ${x},${y}, distance=${d}`).toBe(d < 1.25);
      }
  }
});

it('uses solid semantic arrowheads while keeping Outline heads open', async () => {
  const samples: Record<string, Point> = {
    repeat: [18.5, 5],
    reply: [7.5, 8],
    'external-link': [18.5, 3.75],
  };
  for (const [id, point] of Object.entries(samples)) {
    expect(composition(await source(id))(point)).toBe(false);
    expect(composition(await source(id, 'filled'))(point)).toBe(true);
  }
});
