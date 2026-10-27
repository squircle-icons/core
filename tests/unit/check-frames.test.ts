import { beforeAll, expect, it } from 'vitest';
import pathParser from 'svg-path-parser';
import { loadSources } from '../../tools/validate.js';

let check: Awaited<ReturnType<typeof loadSources>>[number];
beforeAll(async () => {
  check = (await loadSources()).find((icon) => icon.name === 'check')!;
});

it('preserves the check proportions and native center at the smaller frame-ready size', () => {
  const commands = pathParser.makeAbsolute(
    pathParser.parseSVG(check.root.children[0].children[0].attrs.d),
  );
  const [a, b, c] = commands.map(({ x, y }) => [x, y]);
  const length = (p: number[], q: number[]) => Math.hypot(q[0] - p[0], q[1] - p[1]);
  expect(length(b, c) / length(a, b)).toBeCloseTo(9 / 4, 7);
  for (const [p, q] of [
    [a, b],
    [b, c],
  ])
    expect(Math.abs(q[0] - p[0])).toBeCloseTo(Math.abs(q[1] - p[1]), 7);
  expect((a[0] + c[0]) / 2).toBe(12);
  expect((b[1] + c[1]) / 2).toBeCloseTo(12, 7);
  expect(check.root.attrs['stroke-width']).toBe('1.75');
  const maxRadius = Math.max(...[a, b, c].map(([x, y]) => Math.hypot(x - 12, y - 12))) + 1.25;
  expect(9.125 - 1.25 - maxRadius).toBeGreaterThan(0.5);
});

it('uses one unboxed Bold contour and the identical contour as every Filled frame cutout', () => {
  const d = check.filled!.root.children[0].children[0].attrs.d;
  const pieces = (value: string) => value.match(/[Mm][^Mm]*/g)!.map((part) => part.trim());
  expect(check.metadata.filledTreatment).toBe('bold-stroke');
  expect(check.metadata.review?.status).toBe('draft');
  expect(pieces(d)).toHaveLength(1);
  const arcs = pathParser.parseSVG(d).filter((command) => 'rx' in command);
  expect(arcs).toHaveLength(3);
  for (const arc of arcs) {
    if (!('rx' in arc)) throw new Error('Expected arc');
    expect(arc.rx).toBe(1.25);
    expect(arc.ry).toBe(1.25);
  }
  for (const frame of Object.values(check.frames!)) {
    expect(frame!.root.children[0].children.at(-1)!.attrs.d).toBe(
      check.root.children[0].children[0].attrs.d,
    );
    expect(pieces(frame!.filled.root.children[0].children[0].attrs.d)).toHaveLength(2);
    expect(pieces(frame!.filled.root.children[0].children[0].attrs.d).slice(1)).toEqual([d]);
  }
});
