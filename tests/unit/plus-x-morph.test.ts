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
it('keeps the glyph inside its approved bounds while folding through a single line', () => {
  for (let i = 1; i < 100; i++) {
    const frame = plusXFrame(i / 100, geometry);
    const values = frame.outline.match(/-?\d*\.?\d+/g)!.map(Number);
    const xs = values.filter((_, n) => n % 2 === 0),
      ys = values.filter((_, n) => n % 2 === 1);
    for (const axis of [xs, ys]) {
      expect(Math.min(...axis) - 0.85).toBeGreaterThanOrEqual(4 - 1e-7);
      expect(Math.max(...axis) + 0.85).toBeLessThanOrEqual(20 + 1e-7);
    }
    expect(frame.filled.startsWith(geometry.box + ' ')).toBe(true);
    expect(frame.filled).not.toMatch(/NaN|Infinity/);
  }
});

it('merges into one full-length vertical stroke before opening into X', () => {
  for (const p of [0.4, 0.5, 0.6]) {
    expect(plusXFrame(p, geometry).outline).toBe('M12 4.85 L12 19.15');
  }
});
