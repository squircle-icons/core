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
      expect(svg).not.toMatch(/(?:fill|stroke)="(?:white|#fff(?:fff)?)"/i);
      const stroked = tags(svg).filter(
        (t) => attribute(t, 'stroke') !== undefined && attribute(t, 'stroke') !== 'none',
      );
      if (style === 'outline') expect(stroked.length).toBeGreaterThan(0);
      for (const tag of stroked) {
        expect(attribute(tag, 'stroke-width')).toBe('1.5');
        expect(attribute(tag, 'stroke-linecap')).toBe('round');
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

it('inherits the accepted Square and Triangle bodies and the complete current Bell', async () => {
  for (const style of ['outline', 'filled']) {
    inheritedGeometry(
      data(tags(await source('info', style))[0]),
      data(tags(await source('square', style))[0]),
      style === 'outline' ? [-24, -24] : [-56, -24],
    );
    inheritedGeometry(
      data(tags(await source('alert', style))[0]),
      data(tags(await source('triangle', style))[0]),
    );
    const bell = tags(await source('bell', style)),
      ringing = tags(await source('bell-ring', style));
    expect(ringing).toHaveLength(bell.length + 1);
    for (let i = 0; i < bell.length; i++) {
      // Filled Bell contains both shell/crown and clapper subpaths. Compare
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
