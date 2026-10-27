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
    for (const n of frame.filled.match(/-?\d*\.?\d+/g)!.map(Number)) {
      expect(n).toBeGreaterThanOrEqual(2 - 1e-6);
      expect(n).toBeLessThanOrEqual(22 + 1e-6);
    }
    menuXFrame(1 - p, geometry);
    expect(menuXFrame(p, geometry)).toEqual(frame);
  }
  expect(menuXFrame(0.7, geometry).middle).toBe('');
  expect(menuXFrame(0.5, geometry).middleWidth).toBeGreaterThan(0);
});

it('starts the topology bridge at the frame-ready Menu extent without a width jump', () => {
  const frame = menuXFrame(1e-6, geometry);
  const points = frame.filled.match(/-?\d*\.?\d+/g)!.map(Number);
  const xs = points.filter((_, i) => i % 2 === 0);
  expect(Math.min(...xs)).toBeCloseTo(5.75, 3);
  expect(Math.max(...xs)).toBeCloseTo(18.25, 3);
});
