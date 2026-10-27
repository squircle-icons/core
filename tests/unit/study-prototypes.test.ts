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
      if (!('x1' in c && 'x2' in c))
        throw Error('Whole-body prototype must have continuous cubics');
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
  expect(outlineArcs.map((c) => ('rx' in c ? c.rx : NaN))).toEqual([3.1, 3.1]);
  expect(filledArcs.map((c) => ('rx' in c ? c.rx : NaN))).toEqual([2.35, 2.35, 0.75, 0.75]);
  const folder = prototypeStudy('folder');
  const dividerArcs = pathParser.parseSVG(folder.filled).filter((c) => 'rx' in c);
  expect(dividerArcs.map((c) => ('rx' in c ? c.rx : NaN))).toEqual([0.75, 0.75]);
  expect(bodyCommands(folder.outline).at(-1)!.code).toBe('Z');
});
