/** Independent base-shape study. Not approved production icon/frame geometry. */
export const STUDY_STROKE = 1.5;
export const DEFAULT_ROUNDNESS = 3.2;
type Point = [number, number];
export type StudyShape = { outline: string; filled: string };
const round = (n: number) => String(Number(n.toFixed(7)));
const xy = (p: Point) => p.map(round).join(' ');

/** A full-contour superellipse, with an inward normal offset for the stroke centerline. */
export function studyPoint(exponent: number, angle: number, inset = 0) {
  const c = Math.max(0, Math.cos(angle)),
    s = Math.max(0, Math.sin(angle));
  const f = c ** exponent + s ** exponent;
  const df = exponent * (-(c ** (exponent - 1)) * s + s ** (exponent - 1) * c);
  const r = 10 * f ** (-1 / exponent),
    dr = (-r * df) / (exponent * f);
  const g: Point = [c ** (exponent - 1), s ** (exponent - 1)];
  const dg: Point = [
    -(exponent - 1) * c ** (exponent - 2) * s,
    (exponent - 1) * s ** (exponent - 2) * c,
  ];
  const len = Math.hypot(...g),
    dot = (g[0] * dg[0] + g[1] * dg[1]) / len ** 2;
  const n: Point = [g[0] / len, g[1] / len];
  const dn: Point = [(dg[0] - g[0] * dot) / len, (dg[1] - g[1] * dot) / len];
  return {
    point: [r * c - inset * n[0], r * s - inset * n[1]] as Point,
    tangent: [dr * c - r * s - inset * dn[0], dr * s + r * c - inset * dn[1]] as Point,
  };
}
function contour(exponent: number, inset: number) {
  const rotate = ([x, y]: Point, q: number): Point =>
    q === 0
      ? [12 + x, 12 + y]
      : q === 1
        ? [12 - y, 12 + x]
        : q === 2
          ? [12 - x, 12 - y]
          : [12 + y, 12 - x];
  const segments = 32,
    step = Math.PI / 2 / segments;
  let d = `M${xy(rotate(studyPoint(exponent, 0, inset).point, 0))}`;
  for (let q = 0; q < 4; q++)
    for (let i = 0; i < segments; i++) {
      const a = studyPoint(exponent, i * step, inset),
        b = studyPoint(exponent, (i + 1) * step, inset);
      d += `C${xy(rotate([a.point[0] + (a.tangent[0] * step) / 3, a.point[1] + (a.tangent[1] * step) / 3], q))} ${xy(rotate([b.point[0] - (b.tangent[0] * step) / 3, b.point[1] - (b.tangent[1] * step) / 3], q))} ${xy(rotate(b.point, q))}`;
    }
  return d + 'Z';
}
export function squircleStudy(exponent = DEFAULT_ROUNDNESS): StudyShape {
  if (!Number.isFinite(exponent) || exponent < 2 || exponent > 5)
    throw new RangeError('Study exponent must be between2 and5');
  return { outline: contour(exponent, STUDY_STROKE / 2), filled: contour(exponent, 0) };
}
/** Explicit comparison references, not additional production icons. */
export function studyReference(kind: 'rounded-square' | 'circle'): StudyShape {
  if (kind === 'circle')
    return {
      outline: 'M21.25 12A9.25 9.25 0 1 1 2.75 12A9.25 9.25 0 1 1 21.25 12Z',
      filled: 'M22 12A10 10 0 1 1 2 12A10 10 0 1 1 22 12Z',
    };
  return {
    outline:
      'M8 2.75H16A5.25 5.25 0 0 1 21.25 8V16A5.25 5.25 0 0 1 16 21.25H8A5.25 5.25 0 0 1 2.75 16V8A5.25 5.25 0 0 1 8 2.75Z',
    filled: 'M8 2H16A6 6 0 0 1 22 8V16A6 6 0 0 1 16 22H8A6 6 0 0 1 2 16V8A6 6 0 0 1 8 2Z',
  };
}
