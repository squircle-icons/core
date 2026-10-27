import { beforeAll, expect, it } from 'vitest';
import { loadSources } from '../../tools/validate.js';
import { buildPlusMinusGeometry } from '../../tools/build-plus-minus.js';
import { plusMinusFrame, type PlusMinusGeometry } from '../../src/morphs/plus-minus.js';
let geometry: PlusMinusGeometry;
beforeAll(async () => {
  geometry = buildPlusMinusGeometry(await loadSources());
});
it('derives the current Plus and Minus with matching Square Filled frames', () => {
  expect(geometry.extent).toBe(4.5);
  expect(geometry.strokeWidth).toBe(1.75);
  expect(plusMinusFrame(0, geometry)).toEqual(geometry.plus);
  expect(plusMinusFrame(1, geometry)).toEqual(geometry.minus);
  expect(plusMinusFrame(NaN, geometry)).toEqual(geometry.plus);
  expect(plusMinusFrame(-1, geometry)).toEqual(geometry.plus);
  expect(plusMinusFrame(Infinity, geometry)).toEqual(geometry.plus);
  expect(plusMinusFrame(2, geometry)).toEqual(geometry.minus);
});
it('preserves the horizontal arm and folds the other monotonically inside the source bounds', () => {
  let previousHeight = 9;
  for (let i = 1; i < 100; i++) {
    const p = i / 100,
      frame = plusMinusFrame(p, geometry);
    const values = frame.outline.match(/-?\d*\.?\d+/g)!.map(Number);
    expect(values.slice(0, 4)).toEqual([7.5, 12, 16.5, 12]);
    const ys = values.filter((_, i) => i % 2 === 1);
    const height = Math.max(...ys) - Math.min(...ys);
    expect(height).toBeLessThanOrEqual(previousHeight + 1e-7);
    previousHeight = height;
    for (const n of values) {
      expect(n - 0.875).toBeGreaterThanOrEqual(6.625 - 1e-7);
      expect(n + 0.875).toBeLessThanOrEqual(17.375 + 1e-7);
    }
    expect(frame.filled.startsWith(geometry.box + ' ')).toBe(true);
    expect(frame.filled).not.toMatch(/NaN|Infinity/);
    plusMinusFrame(1 - p, geometry);
    expect(plusMinusFrame(p, geometry)).toEqual(frame);
  }
});
it('approaches both endpoint centerlines continuously, including the one-line merge', () => {
  const start = plusMinusFrame(0.0001, geometry)
    .outline.match(/-?\d*\.?\d+/g)!
    .map(Number);
  expect(start.slice(4)).toEqual([12, 7.5, 12, 16.5]);
  expect(plusMinusFrame(0.9999, geometry).outline).toBe('M7.5 12 L16.5 12');
  expect(plusMinusFrame(0.5, geometry).outline).not.toBe(plusMinusFrame(0.9999, geometry).outline);
});
