import { expect, it } from 'vitest';
import pathParser from 'svg-path-parser';
import {
  prototypeStudy,
  squircleStudy,
  type StudySubject,
} from '../../src/design/squircle-base.js';

type Point = [number, number];
const bodyCommands = (d: string) =>
  pathParser.makeAbsolute(pathParser.parseSVG(d.slice(0, d.indexOf('Z') + 1)));
function circularArc(c: ReturnType<typeof pathParser.makeAbsolute>[number], t: number) {
  if (!('rx' in c)) throw Error('Expected circular arc');
  const r = c.rx,
    dx = c.x - c.x0,
    dy = c.y - c.y0,
    chord = Math.hypot(dx, dy),
    h = Math.sqrt(Math.max(0, r * r - (chord * chord) / 4));
  let selected: { center: Point; start: number; delta: number } | undefined;
  for (const sign of [-1, 1]) {
    const center: Point = [
      (c.x + c.x0) / 2 - (sign * dy * h) / chord,
      (c.y + c.y0) / 2 + (sign * dx * h) / chord,
    ];
    const start = Math.atan2(c.y0 - center[1], c.x0 - center[0]);
    let delta = Math.atan2(c.y - center[1], c.x - center[0]) - start;
    if (c.sweep && delta < 0) delta += 2 * Math.PI;
    if (!c.sweep && delta > 0) delta -= 2 * Math.PI;
    if (c.largeArc ? Math.abs(delta) >= Math.PI - 1e-6 : Math.abs(delta) <= Math.PI + 1e-6) {
      selected = { center, start, delta };
      break;
    }
  }
  if (!selected) throw Error('Invalid circular join');
  const angle = selected.start + selected.delta * t;
  return {
    point: [
      selected.center[0] + r * Math.cos(angle),
      selected.center[1] + r * Math.sin(angle),
    ] as Point,
    tangent: [-r * Math.sin(angle) * selected.delta, r * Math.cos(angle) * selected.delta] as Point,
  };
}
function bodySamples(d: string, includeArcs = true) {
  return bodyCommands(d)
    .slice(1, -1)
    .flatMap((c) => {
      if (c.code === 'A')
        return includeArcs ? [0, 0.25, 0.5, 0.75].map((t) => circularArc(c, t)) : [];
      if (c.code === 'L')
        return [0, 0.25, 0.5, 0.75].map((t) => ({
          point: [c.x0 + (c.x - c.x0) * t, c.y0 + (c.y - c.y0) * t] as Point,
          tangent: [c.x - c.x0, c.y - c.y0] as Point,
        }));
      if (!('x1' in c && 'x2' in c)) throw Error('Expected source body line or progressive curve');
      return [0, 0.25, 0.5, 0.75].map((t) => ({
        point: [
          (1 - t) ** 3 * c.x0 +
            3 * (1 - t) ** 2 * t * c.x1 +
            3 * (1 - t) * t * t * c.x2 +
            t ** 3 * c.x,
          (1 - t) ** 3 * c.y0 +
            3 * (1 - t) ** 2 * t * c.y1 +
            3 * (1 - t) * t * t * c.y2 +
            t ** 3 * c.y,
        ] as Point,
        tangent: [
          3 * (1 - t) ** 2 * (c.x1 - c.x0) +
            6 * (1 - t) * t * (c.x2 - c.x1) +
            3 * t * t * (c.x - c.x2),
          3 * (1 - t) ** 2 * (c.y1 - c.y0) +
            6 * (1 - t) * t * (c.y2 - c.y1) +
            3 * t * t * (c.y - c.y2),
        ] as Point,
      }));
    });
}
const cross = (a: Point, b: Point, c: Point) =>
  (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
function intersects(points: Point[]) {
  for (let i = 0; i < points.length; i++)
    for (let j = i + 2; j < points.length; j++) {
      if (i === 0 && j === points.length - 1) continue;
      const a = points[i],
        b = points[(i + 1) % points.length],
        c = points[j],
        d = points[(j + 1) % points.length];
      if (cross(a, b, c) * cross(a, b, d) < -1e-10 && cross(c, d, a) * cross(c, d, b) < -1e-10)
        return true;
    }
  return false;
}
it('Square reuses the base study while every subject/style responds to the same profile', () => {
  expect(prototypeStudy('square')).toEqual(squircleStudy());
  for (const subject of ['square', 'camera', 'folder'] as StudySubject[])
    for (const kind of ['outline', 'filled'] as const) {
      expect(prototypeStudy(subject, 2.7)[kind]).not.toBe(prototypeStudy(subject, 4)[kind]);
      const commands = pathParser.parseSVG(prototypeStudy(subject)[kind]);
      for (const command of commands)
        for (const value of Object.values(command))
          if (typeof value === 'number') expect(Number.isFinite(value)).toBe(true);
    }
});
for (const subject of ['camera', 'folder'] as const)
  it.each([2, 2.4, 2.7, 3.2, 4, 4.4, 5])(
    `${subject} profile%s keeps native stroke offset, clear contour and balanced natural bounds`,
    (n) => {
      const shape = prototypeStudy(subject, n),
        outside = bodySamples(shape.filled),
        inside = bodySamples(shape.outline, false);
      expect(inside).toHaveLength(outside.length);
      for (let i = 0; i < outside.length; i++) {
        const a = outside[i],
          b = inside[i],
          delta = [a.point[0] - b.point[0], a.point[1] - b.point[1]];
        expect(Math.hypot(...delta)).toBeCloseTo(0.75, 3);
        expect(
          Math.abs((delta[0] * a.tangent[0] + delta[1] * a.tangent[1]) / Math.hypot(...a.tangent)),
        ).toBeLessThan(0.001);
        expect(a.tangent[0] * b.tangent[0] + a.tangent[1] * b.tangent[1]).toBeGreaterThan(0);
      }
      for (const [samples, half] of [
        [outside, 0],
        [bodySamples(shape.outline), 0.75],
      ] as const) {
        const xs = samples.map((p) => p.point[0]),
          ys = samples.map((p) => p.point[1]);
        const left = Math.min(...xs) - half,
          right = Math.max(...xs) + half,
          top = Math.min(...ys) - half,
          bottom = Math.max(...ys) + half;
        expect(left).toBeCloseTo(2, 3);
        expect(right).toBeCloseTo(22, 3);
        expect(top + bottom).toBeCloseTo(24, 3);
        expect(bottom - top).toBeLessThan(20);
        expect(intersects(samples.map((p) => p.point))).toBe(false);
      }
    },
  );
it('Camera counters preserve shared placement and the scoped stroke relationship', () => {
  const camera = prototypeStudy('camera');
  const outline = pathParser.makeAbsolute(pathParser.parseSVG(camera.outline)),
    filled = pathParser.makeAbsolute(pathParser.parseSVG(camera.filled));
  const outlineArcs = outline.filter((c) => 'rx' in c),
    filledArcs = filled.filter((c) => 'rx' in c);
  expect(outlineArcs).toHaveLength(2);
  expect(filledArcs).toHaveLength(4);
  for (let i = 0; i < 2; i++) {
    if (!('rx' in outlineArcs[i] && 'rx' in filledArcs[i])) throw Error('Missing lens arc');
    expect(filledArcs[i].rx).toBeCloseTo(outlineArcs[i].rx - 0.75, 6);
    expect(filledArcs[i].rx).toBeGreaterThan(0);
  }
  const outlineMoves = outline.filter((c) => c.code === 'M'),
    filledMoves = filled.filter((c) => c.code === 'M');
  if (!('rx' in outlineArcs[0] && 'rx' in filledArcs[0])) throw Error('Missing circular lens');
  expect(outlineMoves[1].x + outlineArcs[0].rx).toBeCloseTo(filledMoves[1].x + filledArcs[0].rx, 6);
  expect(outlineMoves[1].y).toBeCloseTo(filledMoves[1].y, 6);
  expect(outlineMoves[2].x).toBeCloseTo(filledMoves[2].x + 0.75, 6);
  expect(outlineMoves[2].y).toBeCloseTo(filledMoves[2].y, 6);
});
it('Camera semantic line runs and interior geometry do not follow the body corner control', () => {
  const reference = prototypeStudy('camera');
  const lineRuns = (d: string) =>
    bodyCommands(d)
      .filter((c) => c.code === 'L')
      .map((c) => [c.x, c.y]);
  const detail = (d: string) => d.slice(d.indexOf('Z') + 1);
  for (const n of [2.7, 3.2, 4]) {
    const shape = prototypeStudy('camera', n);
    expect(lineRuns(shape.outline)).toEqual(lineRuns(reference.outline));
    expect(detail(shape.outline)).toBe(detail(reference.outline));
    expect(detail(shape.filled)).toBe(detail(reference.filled));
  }
});
it('Folder retains actual Square lower curves without anisotropic scaling, allowing a uniform recenter after the cut', () => {
  for (const n of [2.7, 3.2, 4])
    for (const style of ['outline', 'filled'] as const) {
      const square = bodyCommands(squircleStudy(n)[style]),
        folder = bodyCommands(prototypeStudy('folder', n)[style]);
      const lowerCount = (square.length - 2) / 2,
        shift = folder[0].y - square[0].y;
      for (let i = 1; i <= lowerCount; i++) {
        const a = square[i],
          b = folder[i];
        expect(b.code).toBe('C');
        if (!('x1' in a && 'x2' in a && 'x1' in b && 'x2' in b))
          throw Error('Expected inherited Square curves');
        for (const key of ['x0', 'x1', 'x2', 'x'] as const) expect(b[key]).toBeCloseTo(a[key], 3);
        for (const key of ['y0', 'y1', 'y2', 'y'] as const)
          expect(b[key] - shift).toBeCloseTo(a[key], 3);
      }
    }
});

it('Folder uses a visible rear form and an occluding front boundary with transparent geometry', () => {
  const shape = prototypeStudy('folder');
  const outer = bodyCommands(shape.outline),
    joinArcs = outer.filter((c) => 'rx' in c);
  expect(joinArcs).toHaveLength(1);
  for (const arc of joinArcs)
    if ('rx' in arc) {
      expect(arc.rx).toBe(0.75);
      expect(arc.sweep).toBe(false);
    }
  const internal = shape.outline.slice(shape.outline.indexOf('Z') + 1);
  expect(internal.startsWith('M')).toBe(true);
  expect(internal.endsWith('Z')).toBe(false);
  const internalCommands = pathParser.makeAbsolute(pathParser.parseSVG(internal));
  const polygon = bodySamples(shape.filled).map((s) => s.point);
  for (const c of internalCommands) expect(pointInside([c.x, c.y], polygon)).toBe(true);
  // Neither style needs an opaque background-colored patch to hide the rear form.
  expect(shape.outline).not.toMatch(/white|#fff|mask|clipPath/i);
  expect(shape.filled).not.toMatch(/white|#fff|mask|clipPath/i);
});
function pointInside(point: Point, polygon: Point[]) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i],
      b = polygon[j];
    if (
      a[1] > point[1] !== b[1] > point[1] &&
      point[0] < ((b[0] - a[0]) * (point[1] - a[1])) / (b[1] - a[1]) + a[0]
    )
      inside = !inside;
  }
  return inside;
}
it.each([2, 2.4, 2.7, 3.2, 4, 4.4, 5])(
  'Folder counter remains enclosed with clear1.5-weight capsule at profile%s',
  (n) => {
    const shape = prototypeStudy('folder', n),
      all = pathParser.makeAbsolute(pathParser.parseSVG(shape.filled));
    const counter = all.slice(all.findIndex((c) => c.code === 'Z') + 1),
      arcs = counter.filter((c) => 'rx' in c);
    expect(arcs).toHaveLength(2);
    for (const arc of arcs) if ('rx' in arc) expect(arc.rx).toBe(0.75);
    const xs = counter.flatMap((c) => ('rx' in c ? [c.x - c.rx, c.x + c.rx] : [c.x]));
    const ys = counter.map((c) => c.y),
      body = bodySamples(shape.filled).map((s) => s.point);
    const minX = Math.min(...xs),
      maxX = Math.max(...xs),
      minY = Math.min(...ys),
      maxY = Math.max(...ys);
    expect(maxY - minY).toBeGreaterThanOrEqual(1.5);
    const hole = shape.filled.slice(shape.filled.indexOf('Z') + 1);
    const holeSamples = bodySamples(hole);
    expect(intersects(holeSamples.map((s) => s.point))).toBe(false);
    for (const sample of holeSamples) {
      expect(Math.hypot(...sample.tangent)).toBeGreaterThan(0.00001);
      expect(pointInside(sample.point, body)).toBe(true);
    }
    expect(minX - 2).toBeGreaterThan(1);
    expect(22 - maxX).toBeGreaterThan(1);
  },
);

it.each([2, 2.4, 2.7, 3.2, 4, 4.4, 5])(
  'Folder layers share the actual convex Square left curve without an inward neck at profile%s',
  (n) => {
    const shape = prototypeStudy('folder', n);
    for (const style of ['outline', 'filled'] as const) {
      const folder = bodyCommands(shape[style]),
        square = bodyCommands(squircleStudy(n)[style]);
      // The first eight upper-left intervals are the Square's own native curve,
      // continuous with its accepted lower half; no returning rear edge is drawn.
      for (let i = 65; i <= 72; i++) {
        const a = folder[i],
          b = square[i];
        if (!('x1' in a && 'x2' in a && 'x1' in b && 'x2' in b))
          throw Error('Expected shared Square cubics');
        for (const k of (style === 'filled' ? ['x0', 'x1', 'x2', 'x'] : ['x0', 'x']) as Array<
          'x0' | 'x1' | 'x2' | 'x'
        >)
          expect(a[k]).toBeCloseTo(b[k], 3);
        const shift = folder[0].y - square[0].y;
        for (const k of (style === 'filled' ? ['y0', 'y1', 'y2', 'y'] : ['y0', 'y']) as Array<
          'y0' | 'y1' | 'y2' | 'y'
        >)
          expect(a[k] - shift).toBeCloseTo(b[k], 3);
      }
    }
    const upper = bodySamples(shape.filled).slice(64 * 4, 105 * 4);
    for (let i = 1; i < upper.length; i++) {
      const a = upper[i - 1],
        b = upper[i];
      expect(b.point[0]).toBeGreaterThanOrEqual(a.point[0] - 0.00001);
      expect(b.point[1]).toBeLessThanOrEqual(a.point[1] + 0.00001);
      const bend =
        (a.tangent[0] * b.tangent[1] - a.tangent[1] * b.tangent[0]) /
        (Math.hypot(...a.tangent) * Math.hypot(...b.tangent));
      expect(bend).toBeGreaterThanOrEqual(-0.00001);
    }
    const body = bodyCommands(shape.outline),
      internal = shape.outline.slice(shape.outline.indexOf('Z') + 1),
      seam = pathParser.makeAbsolute(pathParser.parseSVG(internal));
    // The front boundary branches from the SAME left centerline point. Neither
    // a near-touching cap nor an independently offset rear-left line can replace it.
    expect([seam[0].x, seam[0].y]).toEqual([body[64].x, body[64].y]);
    for (const sample of bodySamples(internal + 'Z')) {
      expect(sample.tangent[0]).toBeGreaterThanOrEqual(-0.00001);
      expect(sample.tangent[1]).toBeLessThanOrEqual(0.00001);
      expect(Math.hypot(...sample.tangent)).toBeGreaterThan(0.00001);
    }
  },
);
