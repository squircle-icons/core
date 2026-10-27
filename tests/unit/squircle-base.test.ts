import { expect, it } from 'vitest';
import pathParser from 'svg-path-parser';
import {
  DEFAULT_ROUNDNESS,
  STUDY_STROKE,
  squircleStudy,
  studyPoint,
} from '../../src/design/squircle-base.js';

it('uses the scoped1.5 study weight without changing the collection palette', async () => {
  const { STROKE_WEIGHTS } = await import('../../src/types.js');
  expect(STUDY_STROKE).toBe(1.5);
  expect(DEFAULT_ROUNDNESS).toBe(3.2);
  expect(STROKE_WEIGHTS.regular).toBe(1.75);
});
it.each([2, 2.7, 3.2, 4, 5])(
  'profile%s has a symmetric whole contour and a true constant normal inset',
  (n) => {
    let last = [10, 0];
    for (let i = 0; i <= 100; i++) {
      const angle = (i * Math.PI) / 200;
      const outside = studyPoint(n, angle),
        inside = studyPoint(n, angle, 0.75);
      const [x, y] = outside.point;
      expect((x / 10) ** n + (y / 10) ** n).toBeCloseTo(1, 10);
      expect(x).toBeLessThanOrEqual(last[0] + 1e-10);
      expect(y).toBeGreaterThanOrEqual(last[1] - 1e-10);
      last = [x, y];
      const delta = [outside.point[0] - inside.point[0], outside.point[1] - inside.point[1]];
      expect(Math.hypot(...delta)).toBeCloseTo(0.75, 10);
      expect(delta[0] * outside.tangent[0] + delta[1] * outside.tangent[1]).toBeCloseTo(0, 8);
      expect(
        inside.tangent[0] * outside.tangent[0] + inside.tangent[1] * outside.tangent[1],
      ).toBeGreaterThan(0);
    }
    const shape = squircleStudy(n);
    for (const [kind, inset] of [
      ['filled', 0],
      ['outline', 0.75],
    ] as const) {
      const commands = pathParser.makeAbsolute(pathParser.parseSVG(shape[kind]));
      expect(commands).toHaveLength(130);
      expect(commands.at(-1)!.code).toBe('Z');
      for (let i = 0; i < 32; i++) {
        const c = commands[i + 1];
        if (!('x1' in c && 'x2' in c)) throw Error('Expected continuous cubic contour');
        for (const t of [0.125, 0.25, 0.5, 0.75, 0.875]) {
          const actual = [
            (1 - t) ** 3 * c.x0 +
              3 * (1 - t) ** 2 * t * c.x1 +
              3 * (1 - t) * t * t * c.x2 +
              t ** 3 * c.x,
            (1 - t) ** 3 * c.y0 +
              3 * (1 - t) ** 2 * t * c.y1 +
              3 * (1 - t) * t * t * c.y2 +
              t ** 3 * c.y,
          ];
          const expected = studyPoint(n, ((i + t) * Math.PI) / 64, inset).point;
          expect(
            Math.hypot(actual[0] - 12 - expected[0], actual[1] - 12 - expected[1]),
          ).toBeLessThan(0.001);
        }
      }
      const endpoints = commands.filter((c) => c.code !== 'Z');
      for (const axis of ['x', 'y'] as const) {
        expect(Math.min(...endpoints.map((c) => c[axis]))).toBeCloseTo(2 + inset, 6);
        expect(Math.max(...endpoints.map((c) => c[axis]))).toBeCloseTo(22 - inset, 6);
      }
    }
  },
);
it('rejects nonfinite/out-of-study profiles rather than exporting broken geometry', () => {
  for (const n of [NaN, Infinity, 1.9, 5.1]) expect(() => squircleStudy(n)).toThrow(RangeError);
});
