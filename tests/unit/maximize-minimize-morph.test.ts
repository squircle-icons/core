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

it('keeps four rigid parts, circular radii and fixed weight throughout a reversible fold', () => {
  for (let step = 1; step < 100; step++) {
    const p = step / 100;
    const frame = maximizeMinimizeFrame(p, geometry);
    expect(frame.parts.map(({ id }) => id)).toEqual(['tl', 'tr', 'br', 'bl']);
    for (const style of ['outline', 'filled'] as const) {
      expect(frame[style]).not.toMatch(/NaN|Infinity/);
      const source = parse(geometry.maximize[style]);
      const moving = parse(frame[style]);
      expect(moving.map(({ code }) => code)).toEqual(source.map(({ code }) => code));
      moving.forEach((command, index) => {
        const original = source[index];
        if (command.command === 'elliptical arc' && original.command === 'elliptical arc')
          expect([command.rx, command.ry, command.largeArc, command.sweep]).toEqual([
            original.rx,
            original.ry,
            original.largeArc,
            original.sweep,
          ]);
      });
      for (let corner = 0; corner < 4; corner++) {
        const center = geometry.corners[corner].center;
        const movingPart = parse(frame.parts[corner][style]);
        const originalPart = parse(geometry.corners[corner].maximize[style]);
        movingPart.forEach((point, index) => {
          if (point.command === 'closepath') return;
          const original = originalPart[index];
          expect(Math.hypot(point.x - center[0], point.y - center[1])).toBeCloseTo(
            Math.hypot(original.x - center[0], original.y - center[1]),
            7,
          );
        });
      }
    }
    maximizeMinimizeFrame(1 - p, geometry);
    expect(maximizeMinimizeFrame(p, geometry)).toEqual(frame);
  }
});

it('approaches both endpoints continuously and passes the midpoint without a hold', () => {
  for (const [near, exact] of [
    [0.00001, 0],
    [0.99999, 1],
  ]) {
    for (const style of ['outline', 'filled'] as const) {
      const a = parse(maximizeMinimizeFrame(near, geometry)[style]);
      const b = parse(maximizeMinimizeFrame(exact, geometry)[style]);
      a.forEach((point, index) => {
        if (point.command === 'closepath') return;
        expect(point.x).toBeCloseTo(b[index].x, 6);
        expect(point.y).toBeCloseTo(b[index].y, 6);
      });
    }
  }
  const positions = [0.49, 0.5, 0.51].map(
    (p) => parse(maximizeMinimizeFrame(p, geometry).outline)[0],
  );
  const before = Math.hypot(positions[1].x - positions[0].x, positions[1].y - positions[0].y);
  const after = Math.hypot(positions[2].x - positions[1].x, positions[2].y - positions[1].y);
  expect(before).toBeGreaterThan(0.1);
  expect(after).toBeCloseTo(before, 7);
});

it('keeps every corner inside the artboard even while its intermediate margin breathes', () => {
  // A circle containing a whole source L also contains every rigid rotation of it.
  // The elbow and its cap contours lie inside the endpoint square plus half weight.
  for (const corner of geometry.corners) {
    const vertices = corner.outline.filter((command) => command.kind !== 'Z');
    const radius =
      Math.max(...vertices.map((p) => Math.hypot(p.x - corner.center[0], p.y - corner.center[1]))) +
      geometry.filledStrokeWidth / 2;
    for (const coordinate of corner.center) {
      expect(coordinate - radius).toBeGreaterThan(0);
      expect(coordinate + radius).toBeLessThan(24);
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
