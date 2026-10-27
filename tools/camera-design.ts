/** Camera-only original profile trial; not a universal family formula. */
export type Point = [number, number];
const add = (a: Point, b: Point): Point => [a[0] + b[0], a[1] + b[1]];
const mul = (a: Point, k: number): Point => [a[0] * k, a[1] * k];
const sub = (a: Point, b: Point): Point => add(a, mul(b, -1));
export function bezier(points: Point[], t: number): Point {
  let row = points;
  while (row.length > 1) row = row.slice(1).map((p, i) => add(mul(row[i], 1 - t), mul(p, t)));
  return row[0];
}
function derivative(points: Point[]): Point[] {
  return points.slice(1).map((p, i) => mul(sub(p, points[i]), points.length - 1));
}
export function sampleProfile(points: Point[], t: number, offset = 0) {
  const p = bezier(points, t);
  const d = bezier(derivative(points), t);
  const dd = points.length > 2 ? bezier(derivative(derivative(points)), t) : [0, 0];
  const speed = Math.hypot(...d);
  const normal: Point = [d[1] / speed, -d[0] / speed];
  const dot = (d[0] * dd[0] + d[1] * dd[1]) / (speed * speed);
  const dn: Point = [dd[1] / speed - normal[0] * dot, -dd[0] / speed - normal[1] * dot];
  return {
    point: add(p, mul(normal, offset)),
    tangent: add(d, mul(dn, offset)),
    curvature: (d[0] * dd[1] - d[1] * dd[0]) / speed ** 3,
  };
}
function corner(a: Point, b: Point, c: Point): Point[] {
  const k = 0.32;
  return [
    a,
    add(a, mul(sub(b, a), k)),
    add(a, mul(sub(b, a), 2 * k)),
    add(c, mul(sub(b, c), 2 * k)),
    add(c, mul(sub(b, c), k)),
    c,
  ];
}
const roof: Point[] = [
  [6.2, 7.25],
  [7.5, 7.25],
  [8.2, 7.25],
  [8.6, 4.5],
  [9.3, 4.5],
  [10.6, 4.5],
];
export const cameraProfiles: Point[][] = [
  [
    [5.875, 7.25],
    [6.2, 7.25],
  ],
  roof,
  [
    [10.6, 4.5],
    [13.4, 4.5],
  ],
  roof.map(([x, y]): Point => [24 - x, y]).reverse(),
  [
    [17.8, 7.25],
    [18.125, 7.25],
  ],
  corner([18.125, 7.25], [21.125, 7.25], [21.125, 10.25]),
  [
    [21.125, 10.25],
    [21.125, 15],
  ],
  corner([21.125, 15], [21.125, 19.5], [16.625, 19.5]),
  [
    [16.625, 19.5],
    [7.375, 19.5],
  ],
  corner([7.375, 19.5], [2.875, 19.5], [2.875, 15]),
  [
    [2.875, 15],
    [2.875, 10.25],
  ],
  corner([2.875, 10.25], [2.875, 7.25], [5.875, 7.25]),
];
const n = (x: number) => String(Number(x.toFixed(7)));
const xy = (p: Point) => p.map(n).join(' ');
export function cameraBody(offset = 0): string {
  let d = `M${xy(sampleProfile(cameraProfiles[0], 0, offset).point)}`;
  for (const profile of cameraProfiles) {
    if (profile.length === 2) {
      d += `L${xy(sampleProfile(profile, 1, offset).point)}`;
      continue;
    }
    // Hermite fitting at 1/24 intervals keeps normal-offset error below .0001 units.
    for (let i = 0; i < 24; i++) {
      const a = sampleProfile(profile, i / 24, offset);
      const b = sampleProfile(profile, (i + 1) / 24, offset);
      d += `C${xy(add(a.point, mul(a.tangent, 1 / 72)))} ${xy(sub(b.point, mul(b.tangent, 1 / 72)))} ${xy(b.point)}`;
    }
  }
  return d + 'Z';
}
export function cameraSources() {
  const lens = 'M8.65 13a3.35 3.35 0 1 0 6.7 0a3.35 3.35 0 1 0 -6.7 0Z';
  const indicator = 'M17.125 10.15a.875 .875 0 1 0 1.75 0a.875 .875 0 1 0 -1.75 0Z';
  return {
    outline: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">\n<g data-part="body"><path d="${cameraBody()}"/></g><g data-part="lens"><circle cx="12" cy="13" r="3.35"/></g><g data-part="indicator"><path d="M18 10.15L18 10.15"/></g>\n</svg>\n`,
    filled: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" fill-rule="evenodd">\n<g data-part="body"><path d="${cameraBody(0.875)}${lens}${indicator}"/></g>\n</svg>\n`,
  };
}
