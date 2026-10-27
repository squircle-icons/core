import { beforeAll, expect, it } from 'vitest';
import { loadSources } from '../../tools/validate.js';
import { buildMenuXGeometry } from '../../tools/build-menu-x.js';
import { menuXFrame, type MenuXGeometry } from '../../src/morphs/menu-x.js';
let geometry: MenuXGeometry;
beforeAll(async () => {
  geometry = buildMenuXGeometry(await loadSources());
});
it('preserves both accepted source endpoints, including their different Filled treatments', () => {
  expect(geometry.strokeWidth).toBe(1.75);
  expect(geometry.filledStrokeWidth).toBe(2.5);
  for (const [p, endpoint] of [
    [0, geometry.menu],
    [1, geometry.x],
  ] as const) {
    const frame = menuXFrame(p, geometry);
    expect(frame.outline).toBe(endpoint.outline);
    expect(frame.filled).toBe(endpoint.filled);
    expect(frame.middle).toBe('');
  }
  expect(menuXFrame(NaN, geometry)).toEqual(menuXFrame(0, geometry));
  expect(menuXFrame(-1, geometry)).toEqual(menuXFrame(0, geometry));
  expect(menuXFrame(2, geometry)).toEqual(menuXFrame(1, geometry));
});
it('keeps the Filled contour within the artboard and produces finite reversible frames', () => {
  for (let i = 1; i < 100; i++) {
    const p = i / 100,
      frame = menuXFrame(p, geometry);
    expect(frame.filled).not.toMatch(/NaN|Infinity/);
    expect(frame.filled.startsWith(geometry.frames.square.box)).toBe(true);
    menuXFrame(1 - p, geometry);
    expect(menuXFrame(p, geometry)).toEqual(frame);
  }
  expect(menuXFrame(0.7, geometry).middle).toBe('');
  expect(menuXFrame(0.25, geometry).middleWidth).toBeGreaterThan(0);
});

it('retains the same Square Filled frame immediately after leaving Menu', () => {
  expect(menuXFrame(1e-6, geometry).filled.startsWith(geometry.frames.square.box)).toBe(true);
  expect(menuXFrame(0.999999, geometry).filled.startsWith(geometry.frames.square.box)).toBe(true);
});

for (const frame of ['none', 'square', 'circle'] as const) {
  it(`${frame}: closes three horizontal bars into one line before opening X`, () => {
    const mark = geometry.variants![frame];
    for (const p of [0.1, 0.25, 0.4, 0.49]) {
      const drawing = menuXFrame(p, geometry, frame);
      const values = drawing.outline.match(/-?\d*\.?\d+/g)!.map(Number);
      expect(values).toHaveLength(8);
      expect(values[1]).toBe(values[3]);
      expect(values[5]).toBe(values[7]);
      expect(values[1]).toBeLessThan(mark.center[1]);
      expect(values[5]).toBeGreaterThan(mark.center[1]);
    }
    const merged = menuXFrame(0.5, geometry, frame);
    expect(merged.outline).toBe(
      `M${mark.center[0] - mark.menuExtent} ${mark.center[1]} L${mark.center[0] + mark.menuExtent} ${mark.center[1]}`,
    );
    expect(merged.middle).toBe('');
    expect(merged.middleWidth).toBe(0);
    for (const p of [0.51, 0.6, 0.75, 0.9]) {
      const values = menuXFrame(p, geometry, frame)
        .outline.match(/-?\d*\.?\d+/g)!
        .map(Number);
      expect(values[1]).not.toBe(values[3]);
      expect(values[5]).not.toBe(values[7]);
      expect((values[1] + values[3]) / 2).toBeCloseTo(mark.center[1], 7);
      expect((values[5] + values[7]) / 2).toBeCloseTo(mark.center[1], 7);
    }
    for (const p of [0.499, 0.4999, 0.49999, 0.5, 0.50001, 0.5001, 0.501]) {
      const drawing = menuXFrame(p, geometry, frame);
      expect(drawing.filled).not.toMatch(/NaN|Infinity/);
      expect(drawing.filled.match(/[Mm]/g)).toHaveLength(frame === 'none' ? 1 : 2);
    }
  });
}
