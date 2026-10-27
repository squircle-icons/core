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
function bodySamples(d: string) {
  return bodyCommands(d)
    .slice(1, -1)
    .flatMap((c) => {
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
        inside = bodySamples(shape.outline);
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
        [inside, 0.75],
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
it('Camera aperture and Folder divider retain deliberate exact native counters', () => {
  const camera = prototypeStudy('camera');
  const outlineArcs = pathParser.parseSVG(camera.outline).filter((c) => 'rx' in c);
  const filledArcs = pathParser.parseSVG(camera.filled).filter((c) => 'rx' in c);
  expect(outlineArcs.map((c) => ('rx' in c ? c.rx : NaN))).toEqual([3.2411202, 3.2411202]);
  expect(filledArcs.map((c) => ('rx' in c ? c.rx : NaN))).toEqual([
    2.4911202, 2.4911202, 0.75, 0.75,
  ]);
  const folder = prototypeStudy('folder');
  const dividerArcs = pathParser.parseSVG(folder.filled).filter((c) => 'rx' in c);
  expect(dividerArcs.map((c) => ('rx' in c ? c.rx : NaN))).toEqual([0.75, 0.75]);
  expect(bodyCommands(folder.outline).at(-1)!.code).toBe('Z');
});

it('original housing, tab, side runs and details are invariant while only main body corners change', () => {
  const originalFeatures = {
    camera: [
      [8.2758646, 6.63968611],
      [9.20277691, 6.07970858],
      [9.88095856, 4.78932476],
      [10.58717728, 4.36267519],
      [13.41282368, 4.36267519],
      [14.1190424, 4.78932476],
      [14.797225, 6.07970858],
      [15.72413635, 6.63968611],
      [21.25, 16.3962059],
      [6.11612034, 19.63732529],
      [2.75, 9.38217258],
    ],
    folder: [
      [5.66734982, 4.1911912],
      [8.07275391, 4.1911912],
      [8.64480209, 4.4328866],
      [10.89379501, 6.74629974],
      [11.6446085, 7.06352472],
      [18.13319778, 7.06352472],
      [21.25, 16.56768799],
      [6.11612034, 19.80880928],
      [2.75, 6.98354101],
    ],
  };
  for (const subject of ['camera', 'folder'] as const)
    for (const exponent of [2.7, 3.2, 4]) {
      const shape = prototypeStudy(subject, exponent),
        commands = bodyCommands(shape.outline);
      for (const [x, y] of originalFeatures[subject])
        expect(commands.some((c) => Math.hypot(c.x - x, c.y - y) < 0.000001)).toBe(true);
      for (const style of ['outline', 'filled'] as const) {
        const tail = shape[style].slice(shape[style].indexOf('Z') + 1);
        const base = prototypeStudy(subject, 3.2)[style];
        expect(tail).toBe(base.slice(base.indexOf('Z') + 1));
      }
      const outline = pathParser.makeAbsolute(pathParser.parseSVG(shape.outline));
      const detail = outline.slice(outline.findIndex((c) => c.code === 'Z') + 1);
      if (subject === 'camera') {
        expect(detail[0].x).toBeCloseTo(12 - 3.24112022, 6);
        expect(detail[0].y).toBeCloseTo(12.8227459, 6);
        expect(detail[4].x).toBeCloseTo(17.88388062, 6);
        expect(detail[4].y).toBeCloseTo(9.13285542, 6);
      } else {
        expect(detail[0].x).toBe(2.75);
        expect(detail[1].x).toBe(21.25);
        expect(detail[0].y).toBeCloseTo(10.9030056, 6);
      }
    }
});
it('restored native silhouettes retain their original heights and an enclosed Folder counter', () => {
  for (const subject of ['camera', 'folder'] as const) {
    const shape = prototypeStudy(subject),
      outside = bodySamples(shape.filled);
    const ys = outside.map((p) => p.point[1]);
    expect(Math.min(...ys)).toBeCloseTo(subject === 'camera' ? 3.61267519 : 3.4411912, 4);
    expect(Math.max(...ys)).toBeCloseTo(subject === 'camera' ? 20.38732529 : 20.55880928, 4);
  }
  const folder = prototypeStudy('folder');
  const all = pathParser.makeAbsolute(pathParser.parseSVG(folder.filled));
  const counter = all.slice(all.findIndex((c) => c.code === 'Z') + 1);
  const xs = counter.flatMap((c) => ('rx' in c ? [c.x - c.rx, c.x + c.rx] : [c.x]));
  expect(Math.min(...xs)).toBeCloseTo(4.76980874, 6);
  expect(Math.max(...xs)).toBeCloseTo(19.23019126, 6);
  expect(Math.min(...xs) - 2).toBeGreaterThan(2.7);
  expect(22 - Math.max(...xs)).toBeGreaterThan(2.7);
});
