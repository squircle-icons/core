import { expect, it } from 'vitest';
import { buildTrashGeometry } from '../../tools/build-trash.js';
import { trashFrame } from '../../src/morphs/trash.js';
import { commands, source } from '../../tools/morph-source.js';
const geometry = buildTrashGeometry();
it('retains the current outline parts and filled source curves and counters', () => {
  const paths = source('trash').paths;
  expect(geometry.outline.body).toBe(paths[0].d);
  expect(geometry.outline.lid).toBe(paths[1].d + ' ' + paths[2].d);
  expect(geometry.outline.marks).toBe(paths[3].d);
  expect(commands(geometry.filled.body).filter((c) => c.command === 'moveto')).toHaveLength(3);
  expect(commands(geometry.filled.lid).filter((c) => c.command === 'moveto')).toHaveLength(2);
  expect(geometry.strokeWidth).toBe(1.5);
});
it('clamps invalid progress and moves only a rigid lid continuously and deterministically', () => {
  for (const value of [NaN, Infinity, -1])
    expect(trashFrame(value, geometry)).toEqual(trashFrame(0, geometry));
  expect(trashFrame(2, geometry)).toEqual(trashFrame(1, geometry));
  for (let i = 0; i <= 100; i++) {
    const p = i / 100,
      frame = trashFrame(p, geometry);
    expect(frame.lift).toBe(-1.5 * p);
    expect(frame.angle).toBe(-12 * p);
    expect(frame.transform).not.toMatch(/NaN|Infinity/);
    expect(trashFrame(p, geometry)).toEqual(frame);
  }
  expect(trashFrame(1e-8, geometry).lift).toBeCloseTo(0, 6);
  expect(trashFrame(1 - 1e-8, geometry).angle).toBeCloseTo(-12, 6);
});
