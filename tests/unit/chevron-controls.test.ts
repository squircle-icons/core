import { beforeAll, expect, it } from 'vitest';
import pathParser from 'svg-path-parser';
import { loadSources } from '../../tools/validate.js';

type Point = [number, number];
let icons: Awaited<ReturnType<typeof loadSources>>;
beforeAll(async () => {
  icons = await loadSources();
});
const icon = (name: string) => icons.find((entry) => entry.name === name)!;
const path = (name: string) => icon(name).root.children[0].children[0].attrs.d;
const points = (name: string): Point[] =>
  pathParser.makeAbsolute(pathParser.parseSVG(path(name))).map((command) => [command.x, command.y]);
const turn = ([x, y]: Point, angle: number): Point => [
  12 + (x - 12) * Math.cos(angle) - (y - 12) * Math.sin(angle),
  12 + (x - 12) * Math.sin(angle) + (y - 12) * Math.cos(angle),
];

it('rotates opposed and stop-line chevrons without changing arm lengths or placement', () => {
  for (const [name, angle] of [
    ['chevron-line-up', 0],
    ['chevron-line-right', Math.PI / 2],
    ['chevron-line-down', Math.PI],
    ['chevron-line-left', (3 * Math.PI) / 2],
  ] as const) {
    const reference = points('chevron-line-up').map((point) => turn(point, angle));
    const actual = points(name);
    expect(actual).toHaveLength(reference.length);
    actual.forEach((point, i) =>
      point.forEach((value, axis) => expect(value).toBeCloseTo(reference[i][axis], 7)),
    );
    for (const [a, b] of [
      [actual[0], actual[1]],
      [actual[1], actual[2]],
    ])
      expect(Math.hypot(a[0] - b[0], a[1] - b[1])).toBeCloseTo(4 * Math.SQRT2, 7);
  }
  const horizontal = points('chevron-left-right');
  points('chevron-up-down')
    .map((point) => turn(point, Math.PI / 2))
    .forEach((point, i) =>
      point.forEach((value, axis) => expect(horizontal[i][axis]).toBeCloseTo(value, 7)),
    );
});

it('keeps visible opposing gaps and stop-line gaps at Regular and Bold weights', () => {
  const opposed = points('chevron-up-down');
  const line = points('chevron-line-up');
  const opposedCenterlineGap = opposed[3][1] - opposed[0][1];
  const stopCenterlineGap = line[1][1] - line[3][1];
  for (const [weight, clearance] of [
    [1.75, 1.25],
    [2.5, 0.5],
  ]) {
    expect(opposedCenterlineGap - weight).toBeCloseTo(clearance, 7);
    expect(stopCenterlineGap - weight).toBeCloseTo(clearance, 7);
  }
});

it.each([
  'chevron-up-down',
  'chevron-left-right',
  'chevron-line-up',
  'chevron-line-down',
  'chevron-line-left',
  'chevron-line-right',
])(
  '%s preserves the exact Filled silhouette in frames and clears the Bold Circle border',
  (name) => {
    const entry = icon(name);
    const subpaths = (d: string) => d.match(/[Mm][^Mm]*/g)!.map((part) => part.trim());
    const filled = subpaths(entry.filled!.root.children[0].children[0].attrs.d);
    expect(entry.metadata.review?.status).toBe('draft');
    expect(entry.root.attrs['stroke-width']).toBe('1.75');
    for (const frame of Object.values(entry.frames!)) {
      expect(frame!.root.children[0].children.at(-1)!.attrs.d).toBe(path(name));
      const cutout = subpaths(frame!.filled.root.children[0].children[0].attrs.d).slice(1);
      expect(cutout).toEqual(filled);
    }
    // Rounded lines lie within vertex disks; a disk's radial maximum is vertex radius + half-weight.
    const glyphRadius =
      Math.max(...points(name).map(([x, y]) => Math.hypot(x - 12, y - 12))) + 1.25;
    const circleInnerRadius =
      Number(entry.frames!.circle!.root.children[0].children[0].attrs.r) - 1.25;
    expect(circleInnerRadius - glyphRadius).toBeGreaterThan(1);
  },
);
