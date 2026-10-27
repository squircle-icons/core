import { mergedStrokes } from './round-strokes.js';
export type PlusMinusGeometry = {
  center: [number, number];
  extent: number;
  strokeWidth: number;
  box: string;
  plus: { outline: string; filled: string };
  minus: { outline: string; filled: string };
};
const format = (n: number) => String(Math.round(n * 1e8) / 1e8);
/** Fold the vertical arm onto a fixed horizontal arm, using the same union in Filled. */
export function plusMinusFrame(progress: number, geometry: PlusMinusGeometry) {
  const p = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));
  if (p === 0) return geometry.plus;
  if (p === 1) return geometry.minus;
  const eased = p ** 3 * (10 + p * (-15 + 6 * p));
  const angle = (Math.PI / 2) * (1 - eased);
  const [x, y] = geometry.center,
    length = geometry.extent;
  const line = (a: number) => {
    const dx = length * Math.cos(a),
      dy = length * Math.sin(a);
    return `M${format(x - dx)} ${format(y - dy)} L${format(x + dx)} ${format(y + dy)}`;
  };
  return {
    outline: angle < 1e-6 ? line(0) : line(0) + ' ' + line(angle),
    filled:
      geometry.box + ' ' + mergedStrokes(0, angle, length, geometry.strokeWidth / 2, { x, y }),
  };
}
