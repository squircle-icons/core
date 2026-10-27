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

it('passes through one horizontal stroke without holding neighboring frames', () => {
  expect(plusXFrame(0.5, geometry).outline).toBe('M4.85 12 L19.15 12');
  for (const p of [0.4, 0.49, 0.499, 0.501, 0.51, 0.6]) {
    expect(plusXFrame(p, geometry).outline).not.toBe(plusXFrame(0.5, geometry).outline);
  }
});
it('carries nonzero, continuous angular velocity through the merge', () => {
  const angles = (p: number) => {
    const values = plusXFrame(p, geometry)
      .outline.match(/-?\d*\.?\d+/g)!
      .map(Number);
    return [0, 4].map((i) => Math.atan2(values[i + 3] - values[i + 1], values[i + 2] - values[i]));
  };
  const left = angles(0.499),
    right = angles(0.501);
  for (let stroke = 0; stroke < 2; stroke++) {
    const incoming = -left[stroke] / 0.001,
      outgoing = right[stroke] / 0.001;
    expect(Math.abs(incoming)).toBeGreaterThan(1);
    expect(outgoing).toBeCloseTo(incoming, 2);
  }
});
