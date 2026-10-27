import { beforeAll, expect, it } from 'vitest';
import pathParser from 'svg-path-parser';
import { loadSources } from '../../tools/validate.js';

let icons: Awaited<ReturnType<typeof loadSources>>;
beforeAll(async () => {
  icons = await loadSources();
});
const icon = (name: string) => icons.find((entry) => entry.name === name)!;
const contours = (name: string, filled = false) => {
  const entry = icon(name),
    root = filled ? entry.filled!.root : entry.root;
  return root.children[0].children[0].attrs.d
    .match(/[Mm][^Mm]*/g)!
    .map((d) => pathParser.makeAbsolute(pathParser.parseSVG(d)));
};

it.each(['maximize', 'minimize'])(
  '%s uses four tangent rounded Ls, fixed weights and no enclosing frames',
  (name) => {
    const entry = icon(name);
    expect(entry.frames).toBeUndefined();
    expect(entry.metadata.review?.status).toBe('draft');
    expect(entry.metadata.filledTreatment).toBe('bold-stroke');
    expect(entry.root.attrs['stroke-width']).toBe('1.75');
    const outline = contours(name);
    expect(outline).toHaveLength(4);
    const vertices = outline.flat();
    for (const axis of ['x', 'y'] as const) {
      expect(Math.min(...vertices.map((point) => point[axis]))).toBe(3.25);
      expect(Math.max(...vertices.map((point) => point[axis]))).toBe(20.75);
    }
    for (const commands of outline) {
      expect(commands.map((command) => command.code)).toEqual(['M', 'L', 'A', 'L']);
      const [, incoming, arc, outgoing] = commands;
      if (!('rx' in arc)) throw Error('Rounded elbow requires a circular arc');
      expect(arc.rx).toBe(3.25);
      expect(arc.ry).toBe(3.25);
      expect(arc.largeArc).toBe(false);
      const a = [incoming.x - incoming.x0, incoming.y - incoming.y0];
      const b = [outgoing.x - outgoing.x0, outgoing.y - outgoing.y0];
      for (const vector of [a, b]) expect(Math.hypot(...vector)).toBeCloseTo(2.21875, 7);
      const centers = [
        [arc.x0, arc.y],
        [arc.x, arc.y0],
      ];
      const tangent = (x: number, y: number) => (arc.sweep ? [-y, x] : [y, -x]);
      const aligned = (a: number[], b: number[]) =>
        Math.abs((a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b)) - 1) < 1e-7;
      expect(
        centers.some(
          ([cx, cy]) =>
            aligned(a, tangent(arc.x0 - cx, arc.y0 - cy)) &&
            aligned(b, tangent(arc.x - cx, arc.y - cy)),
        ),
      ).toBe(true);
    }
    const filled = contours(name, true);
    expect(filled).toHaveLength(4);
    for (const commands of filled) {
      expect(commands.at(-1)!.code).toBe('Z');
      const radii = commands
        .filter((command) => 'rx' in command)
        .map((command) => ('rx' in command ? command.rx : NaN))
        .sort((a, b) => a - b);
      expect(radii).toEqual([1.25, 1.25, 2, 4.5]);
    }
    // Same centerline bounds plus fixed Bold half-width yield the requested2..22 exterior.
    expect(3.25 - 1.25).toBe(2);
    expect(20.75 + 1.25).toBe(22);
  },
);

it('Minimize turns each corner180 degrees locally, preserving rounded Outline and exact Filled contours', () => {
  const centers = [
    [5.984375, 5.984375],
    [18.015625, 5.984375],
    [18.015625, 18.015625],
    [5.984375, 18.015625],
  ];
  for (const filled of [false, true]) {
    const max = contours('maximize', filled),
      min = contours('minimize', filled);
    max.forEach((commands, corner) =>
      commands.forEach((command, index) => {
        const target = min[corner][index];
        expect(target.code).toBe(command.code);
        expect(target.x).toBeCloseTo(2 * centers[corner][0] - command.x, 7);
        expect(target.y).toBeCloseTo(2 * centers[corner][1] - command.y, 7);
        if ('rx' in command) {
          if (!('rx' in target)) throw Error('Missing rotated arc');
          expect(target.rx).toBe(command.rx);
          expect(target.ry).toBe(command.ry);
          expect(target.sweep).toBe(command.sweep);
        }
      }),
    );
  }
});
