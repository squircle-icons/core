import { expect, it } from 'vitest';
import pathParser from 'svg-path-parser';
import { WINDOW_TRANSFER_STUDY } from '../../src/design/window-transfer.js';
import { buildMaximizeMinimizeStudyGeometry } from '../../tools/build-maximize-minimize-study.js';
import {
  maximizeMinimizeStudyFrame,
  studyCornerCurves,
  type StudyCubic,
  type StudyPoint,
} from '../../src/morphs/maximize-minimize-study.js';

const geometry = buildMaximizeMinimizeStudyGeometry(WINDOW_TRANSFER_STUDY);
const parse = (d: string) => pathParser.makeAbsolute(pathParser.parseSVG(d));
const value = (c: StudyCubic, t: number): StudyPoint =>
  [0, 1].map(
    (i) =>
      (1 - t) ** 3 * c[0][i] +
      3 * (1 - t) ** 2 * t * c[1][i] +
      3 * (1 - t) * t * t * c[2][i] +
      t ** 3 * c[3][i],
  ) as StudyPoint;
function curves(d: string): StudyCubic[] {
  let start: StudyPoint = [0, 0];
  return parse(d).flatMap((c) => {
    if (c.command === 'curveto') {
      const result: StudyCubic = [start, [c.x1, c.y1], [c.x2, c.y2], [c.x, c.y]];
      start = result[3];
      return [result];
    }
    if (c.command !== 'closepath') start = [c.x, c.y];
    return [];
  });
}
it('uses the actual draft study paths at both ends, independently of legacy weights', () => {
  expect(geometry.strokeWidth).toBe(1.5);
  expect(geometry.filledStrokeWidth).toBe(2.5);
  for (const [p, id] of [
    [0, 'maximize'],
    [1, 'minimize'],
  ] as const)
    for (const style of ['outline', 'filled'] as const) {
      const source = WINDOW_TRANSFER_STUDY.find((icon) => icon.id === id)![style];
      const paths = [...source.matchAll(/\sd="([^"]+)"/g)].map((m) => m[1]);
      expect(maximizeMinimizeStudyFrame(p, geometry)[style]).toBe(paths.join(' '));
    }
});
it('clamps invalid and out-of-range progress without introducing geometry state', () => {
  for (const p of [NaN, Infinity, -Infinity, -2])
    expect(maximizeMinimizeStudyFrame(p, geometry)).toEqual(
      maximizeMinimizeStudyFrame(0, geometry),
    );
  expect(maximizeMinimizeStudyFrame(2, geometry)).toEqual(maximizeMinimizeStudyFrame(1, geometry));
  const forward = maximizeMinimizeStudyFrame(0.3, geometry);
  maximizeMinimizeStudyFrame(0.8, geometry);
  expect(maximizeMinimizeStudyFrame(0.3, geometry)).toEqual(forward);
});
it('keeps source tips fixed, preserves cubic joins, and stays inside separate quadrants', () => {
  for (let n = 0; n <= 100; n++)
    geometry.corners.forEach((corner) => {
      const cs = studyCornerCurves(n / 100, corner);
      expect(cs[0][0]).toEqual(corner.from[0][0]);
      expect(cs.at(-1)![3]).toEqual(corner.from.at(-1)![3]);
      expect(cs[0][3]).toEqual(cs[1][0]);
      for (let axis = 0; axis < 2; axis++)
        expect(cs[0][3][axis] - cs[0][2][axis]).toBeCloseTo(cs[1][1][axis] - cs[1][0][axis], 10);
      const half = corner.id.includes('l') ? [2, 9.75] : [14.25, 22];
      for (const c of cs)
        for (const p of c) {
          expect(p[0]).toBeGreaterThanOrEqual(half[0]);
          expect(p[0]).toBeLessThanOrEqual(half[1]);
          expect(p[1]).toBeGreaterThanOrEqual(corner.id.startsWith('t') ? 2 : 14.25);
          expect(p[1]).toBeLessThanOrEqual(corner.id.startsWith('t') ? 9.75 : 22);
        }
    });
});
it('passes continuously through straight chords with no intermediate hold or rigid rotation', () => {
  geometry.corners.forEach((corner) => {
    const cs = studyCornerCurves(0.5, corner),
      a = cs[0][0],
      b = cs.at(-1)![3];
    const cross = (p: StudyPoint) => (p[0] - a[0]) * (b[1] - a[1]) - (p[1] - a[1]) * (b[0] - a[0]);
    for (const c of cs) for (const p of c) expect(cross(p)).toBeCloseTo(0, 10);
    const before = cross(studyCornerCurves(0.4999, corner)[0][3]);
    const after = cross(studyCornerCurves(0.5001, corner)[0][3]);
    expect(before * after).toBeLessThan(0);
    expect(Math.abs(before)).toBeGreaterThan(0.001);
    expect(Math.abs(before + after)).toBeLessThan(1e-10);
  });
});
it('fits both moving Bold offsets to analytical normal distances within .0002', () => {
  let error = 0;
  for (const p of [
    0.000001, 0.02, 0.1, 0.25, 0.4, 0.49, 0.5, 0.51, 0.6, 0.75, 0.9, 0.98, 0.999999,
  ]) {
    const frame = maximizeMinimizeStudyFrame(p, geometry);
    expect(frame.filled).not.toMatch(/NaN|Infinity/);
    frame.parts.forEach((part, index) => {
      const centers = studyCornerCurves(p, geometry.corners[index]);
      const filled = curves(part.filled);
      expect(filled).toHaveLength(64);
      for (const side of [-1, 1])
        for (let k = 0; k < 32; k++)
          for (const t of [0.25, 0.5, 0.75]) {
            const source = centers[Math.floor(k / 16)],
              u = ((k % 16) + t) / 16;
            const position = value(source, u);
            const derivative = [0, 1].map(
              (i) =>
                3 * (1 - u) ** 2 * (source[1][i] - source[0][i]) +
                6 * (1 - u) * u * (source[2][i] - source[1][i]) +
                3 * u * u * (source[3][i] - source[2][i]),
            );
            const length = Math.hypot(...derivative);
            const expected = [
              position[0] - (side * 1.25 * derivative[1]) / length,
              position[1] + (side * 1.25 * derivative[0]) / length,
            ];
            const fit = value(filled[side === -1 ? k : 63 - k], side === -1 ? t : 1 - t);
            error = Math.max(error, Math.hypot(fit[0] - expected[0], fit[1] - expected[1]));
            expect(Math.min(...fit)).toBeGreaterThanOrEqual(1.9998);
            expect(Math.max(...fit)).toBeLessThanOrEqual(22.0002);
          }
    });
  }
  expect(error).toBeLessThan(0.0002);
});
it('rejects missing endpoint identities and changed source tips', () => {
  expect(() =>
    buildMaximizeMinimizeStudyGeometry(WINDOW_TRANSFER_STUDY.filter((x) => x.id !== 'minimize')),
  ).toThrow(/Both/);
  const copy = WINDOW_TRANSFER_STUDY.map((icon) =>
    icon.id === 'minimize'
      ? { ...icon, outline: icon.outline.replace('M3.25 8.5', 'M3.25 8.4') }
      : icon,
  );
  expect(() => buildMaximizeMinimizeStudyGeometry(copy)).toThrow(/anchored/);
});

function boundary(d: string): StudyPoint[] {
  const points: StudyPoint[] = [];
  let start: StudyPoint = [0, 0];
  for (const c of parse(d)) {
    if (c.command === 'curveto') {
      const curve: StudyCubic = [start, [c.x1, c.y1], [c.x2, c.y2], [c.x, c.y]];
      for (let k = 1; k <= 16; k++) points.push(value(curve, k / 16));
    } else if (c.command === 'elliptical arc') {
      // Moving caps are true semicircles; static exported caps are cubic runs.
      const center = [(start[0] + c.x) / 2, (start[1] + c.y) / 2];
      const angle = Math.atan2(start[1] - center[1], start[0] - center[0]);
      for (let k = 1; k <= 128; k++)
        points.push([
          center[0] + c.rx * Math.cos(angle + (Math.PI * k) / 128),
          center[1] + c.ry * Math.sin(angle + (Math.PI * k) / 128),
        ]);
    } else if (c.command === 'moveto') points.push([c.x, c.y]);
    if (c.command !== 'closepath') start = [c.x, c.y];
  }
  return points;
}
const deviation = (a: StudyPoint[], b: StudyPoint[]) =>
  Math.max(
    ...a.map((p) =>
      Math.min(
        ...b.slice(1).map((end, i) => {
          const start = b[i],
            dx = end[0] - start[0],
            dy = end[1] - start[1];
          const q = Math.max(
            0,
            Math.min(
              1,
              ((p[0] - start[0]) * dx + (p[1] - start[1]) * dy) / (dx * dx + dy * dy || 1),
            ),
          );
          return Math.hypot(p[0] - start[0] - q * dx, p[1] - start[1] - q * dy);
        }),
      ),
    ),
  );
it('approaches the literal Figma Filled contours continuously at both ends', () => {
  for (const [near, exact] of [
    [0.000001, 0],
    [0.999999, 1],
  ]) {
    const a = boundary(maximizeMinimizeStudyFrame(near, geometry).parts[0].filled);
    const b = boundary(maximizeMinimizeStudyFrame(exact, geometry).parts[0].filled);
    expect(deviation(a, b)).toBeLessThan(0.0005);
    expect(deviation(b, a)).toBeLessThan(0.0005);
  }
});
