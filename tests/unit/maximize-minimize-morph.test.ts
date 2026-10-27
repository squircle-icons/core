import { beforeAll, expect, it } from 'vitest';
import pathParser from 'svg-path-parser';
import { loadSources } from '../../tools/validate.js';
import { buildMaximizeMinimizeGeometry } from '../../tools/build-maximize-minimize.js';
import {
  maximizeMinimizeFrame,
  type MaximizeMinimizeGeometry,
} from '../../src/morphs/maximize-minimize.js';

let geometry: MaximizeMinimizeGeometry;
let sources: Awaited<ReturnType<typeof loadSources>>;
beforeAll(async () => {
  sources = await loadSources();
  geometry = buildMaximizeMinimizeGeometry(sources);
});
const parse = (path: string) => pathParser.makeAbsolute(pathParser.parseSVG(path));

it('derives the four original rounded L parts and exact static endpoints in both styles', () => {
  expect(geometry.strokeWidth).toBe(1.75);
  expect(geometry.filledStrokeWidth).toBe(2.5);
  expect(geometry.cornerRadius).toBe(3.25);
  expect(geometry.corners.map(({ id, center, direction }) => ({ id, center, direction }))).toEqual([
    { id: 'tl', center: [5.984375, 5.984375], direction: 1 },
    { id: 'tr', center: [18.015625, 5.984375], direction: -1 },
    { id: 'br', center: [18.015625, 18.015625], direction: 1 },
    { id: 'bl', center: [5.984375, 18.015625], direction: -1 },
  ]);
  for (const [progress, endpoint] of [
    [0, 'maximize'],
    [1, 'minimize'],
  ] as const) {
    const frame = maximizeMinimizeFrame(progress, geometry);
    expect(frame.outline).toBe(geometry[endpoint].outline);
    expect(frame.filled).toBe(geometry[endpoint].filled);
    for (const style of ['outline', 'filled'] as const) {
      const icon = sources.find((icon) => icon.name === endpoint)!;
      const root = style === 'filled' ? icon.filled!.root : icon.root;
      const paths = (node: typeof root): string[] =>
        node.tag === 'path' ? [node.attrs.d] : node.children.flatMap(paths);
      expect(parse(frame[style])).toEqual(parse(paths(root).join(' ')));
    }
  }
});

it('clamps finite progress and safely resets nonfinite inputs', () => {
  for (const p of [NaN, Infinity, -Infinity, -1])
    expect(maximizeMinimizeFrame(p, geometry)).toEqual(maximizeMinimizeFrame(0, geometry));
  expect(maximizeMinimizeFrame(2, geometry)).toEqual(maximizeMinimizeFrame(1, geometry));
});

it('anchors the tips while four rounded elbows fold inward without rigid rotation', () => {
  for (let step = 1; step < 100; step++) {
    const p = step / 100;
    const frame = maximizeMinimizeFrame(p, geometry);
    expect(frame.parts.map(({ id }) => id)).toEqual(['tl', 'tr', 'br', 'bl']);
    for (const style of ['outline', 'filled'] as const) {
      expect(frame[style]).not.toMatch(/NaN|Infinity/);
      for (const command of parse(frame[style]))
        if (command.command === 'elliptical arc') {
          expect(command.rx).toBe(command.ry);
          expect(style === 'outline' ? [3.25] : [1.25, 2, 4.5]).toContain(command.rx);
        }
    }
    frame.parts.forEach((part, index) => {
      const moving = parse(part.outline),
        source = parse(geometry.corners[index].maximize.outline);
      for (const at of [0, -1]) {
        expect(moving.at(at)!.x).toBe(source.at(at)!.x);
        expect(moving.at(at)!.y).toBe(source.at(at)!.y);
      }
    });
    maximizeMinimizeFrame(1 - p, geometry);
    expect(maximizeMinimizeFrame(p, geometry)).toEqual(frame);
  }
});

it('approaches both source silhouettes continuously despite reversed endpoint traversal', () => {
  for (const [near, exact] of [
    [0.00001, 0],
    [0.99999, 1],
  ])
    for (const style of ['outline', 'filled'] as const) {
      const a = parse(maximizeMinimizeFrame(near, geometry)[style]).filter(
        (c) => c.command !== 'closepath',
      );
      const b = parse(maximizeMinimizeFrame(exact, geometry)[style]).filter(
        (c) => c.command !== 'closepath',
      );
      for (const [points, target] of [
        [a, b],
        [b, a],
      ])
        for (const point of points)
          expect(
            Math.min(...target.map((other) => Math.hypot(point.x - other.x, point.y - other.y))),
          ).toBeLessThan(0.00001);
    }
});

it('contracts each elbow through a straight diagonal before bending inward, without a hold', () => {
  const middle = maximizeMinimizeFrame(0.5, geometry);
  for (const [index, part] of middle.parts.entries()) {
    const commands = parse(part.outline);
    expect(commands.map(({ code }) => code)).toEqual(['M', 'L']);
    const start = commands[0],
      end = commands[1];
    expect((start.x + end.x) / 2).toBe(geometry.corners[index].center[0]);
    expect((start.y + end.y) / 2).toBe(geometry.corners[index].center[1]);
  }
  for (const p of [0.49, 0.499, 0.501, 0.51])
    expect(maximizeMinimizeFrame(p, geometry).outline).not.toBe(middle.outline);
  const firstBend = (p: number) => parse(maximizeMinimizeFrame(p, geometry).parts[0].outline)[1];
  expect(firstBend(0.25).x + firstBend(0.25).y).toBeLessThan(2 * geometry.corners[0].center[0]);
  expect(firstBend(0.75).x + firstBend(0.75).y).toBeGreaterThan(2 * geometry.corners[0].center[0]);
});

it('keeps each changing centerline inside its source corner square and separated from the center', () => {
  for (let i = 0; i <= 100; i++) {
    const drawing = maximizeMinimizeFrame(i / 100, geometry);
    for (const [index, part] of drawing.parts.entries()) {
      const original = parse(geometry.corners[index].maximize.outline);
      const xs = original.map((c) => c.x),
        ys = original.map((c) => c.y);
      for (const point of parse(part.outline)) {
        expect(point.x).toBeGreaterThanOrEqual(Math.min(...xs) - 1e-7);
        expect(point.x).toBeLessThanOrEqual(Math.max(...xs) + 1e-7);
        expect(point.y).toBeGreaterThanOrEqual(Math.min(...ys) - 1e-7);
        expect(point.y).toBeLessThanOrEqual(Math.max(...ys) + 1e-7);
      }
    }
  }
});

it('rejects a missing endpoint and source changes that break the authored part correspondence', () => {
  expect(() =>
    buildMaximizeMinimizeGeometry(sources.filter((icon) => icon.name !== 'minimize')),
  ).toThrow(/Both/);
  const modified = structuredClone(sources);
  const minimize = modified.find((icon) => icon.name === 'minimize')!;
  const change = (node: typeof minimize.root): void => {
    if (node.tag === 'path') node.attrs.d = node.attrs.d.replace('8.71875', '8.81875');
    else node.children.forEach(change);
  };
  change(minimize.root);
  expect(() => buildMaximizeMinimizeGeometry(modified)).toThrow(/half-turn/);
});
