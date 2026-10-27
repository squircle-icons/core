import { beforeAll, expect, it } from 'vitest';
import { loadSources } from '../../tools/validate.js';
import { buildPlusXGeometry } from '../../tools/build-plus-x.js';
import { plusXFrame, type PlusXGeometry } from '../../src/morphs/plus-x.js';
let geometry: PlusXGeometry;
beforeAll(async () => {
  geometry = buildPlusXGeometry(await loadSources());
});
it('uses the approved endpoints and upright radius4 box without altering static sources', () => {
  expect(geometry.strokeWidth).toBe(1.7);
  expect(plusXFrame(0, geometry)).toEqual(geometry.plus);
  expect(plusXFrame(1, geometry)).toEqual(geometry.x);
  expect(geometry.plusExtent).toBeCloseTo(7.15, 8);
  expect(geometry.xExtent).toBeCloseTo(7.15, 8);
});
it('retains 4px visible glyph margins and the same box throughout rotation', () => {
  for (let i = 1; i < 100; i++) {
    const frame = plusXFrame(i / 100, geometry);
    const values = frame.outline.match(/-?\d*\.?\d+/g)!.map(Number);
    const xs = values.filter((_, n) => n % 2 === 0),
      ys = values.filter((_, n) => n % 2 === 1);
    for (const axis of [xs, ys]) {
      expect(Math.min(...axis) - 0.85).toBeCloseTo(4, 7);
      expect(Math.max(...axis) + 0.85).toBeCloseTo(20, 7);
    }
    expect(frame.filled.startsWith(geometry.box + ' ')).toBe(true);
    expect(frame.filled).not.toMatch(/NaN|Infinity/);
  }
});
