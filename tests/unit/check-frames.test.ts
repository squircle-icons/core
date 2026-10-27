import { beforeAll, expect, it } from 'vitest';
import pathParser from 'svg-path-parser';
import { loadSources } from '../../tools/validate.js';

let check: Awaited<ReturnType<typeof loadSources>>[number];
beforeAll(async () => {
  check = (await loadSources()).find((icon) => icon.name === 'check')!;
});
const vertices = (d: string) =>
  pathParser.makeAbsolute(pathParser.parseSVG(d)).map(({ x, y }) => [x, y]);
const pieces = (d: string) => d.match(/[Mm][^Mm]*/g)!.map((part) => part.trim());

it('enlarges None natively while preserving the check arm ratio and fixed weight', () => {
  const [a, b, c] = vertices(check.root.children[0].children[0].attrs.d);
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
  expect(c[0] - a[0] + 2.5).toBeCloseTo(20, 7);
  expect(a[0] - 1.75 / 2).toBeCloseTo(2.375, 7);
});

it('preserves the smaller frame glyph and Circle clearance independently of enlarged None', () => {
  const none = vertices(check.root.children[0].children[0].attrs.d);
  const compact = check.frames!.square!.root.children[0].children.at(-1)!.attrs.d;
  for (const frame of Object.values(check.frames!)) {
    const d = frame!.root.children[0].children.at(-1)!.attrs.d;
    expect(d).toBe(compact);
    expect(d).not.toBe(check.root.children[0].children[0].attrs.d);
    const points = vertices(d);
    points.forEach((p, i) =>
      p.forEach((v, axis) => expect(12 + (v - 12) * 1.75).toBeCloseTo(none[i][axis], 7)),
    );
    const maxRadius = Math.max(...points.map(([x, y]) => Math.hypot(x - 12, y - 12))) + 1.25;
    expect(9.125 - 1.25 - maxRadius).toBeGreaterThan(0.5);
  }
});

it('uses independent exact Bold contours for None and smaller transparent frame cutouts', () => {
  const none = check.filled!.root.children[0].children[0].attrs.d;
  expect(check.metadata.filledTreatment).toBe('bold-stroke');
  expect(check.metadata.review?.status).toBe('approved');
  expect(pieces(none)).toHaveLength(1);
  const contours = [none];
  let compact: string | undefined;
  for (const frame of Object.values(check.frames!)) {
    const subpaths = pieces(frame!.filled.root.children[0].children[0].attrs.d);
    expect(subpaths).toHaveLength(2);
    if (compact) expect(subpaths[1]).toBe(compact);
    compact = subpaths[1];
    expect(compact).not.toBe(none);
    contours.push(compact);
  }
  for (const d of contours) {
    const arcs = pathParser.parseSVG(d).filter((command) => 'rx' in command);
    expect(arcs).toHaveLength(3);
    for (const arc of arcs) {
      if (!('rx' in arc)) throw Error('Expected arc');
      expect(arc.rx).toBe(1.25);
      expect(arc.ry).toBe(1.25);
    }
  }
});
