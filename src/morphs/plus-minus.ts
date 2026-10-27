import { mergedStrokes, type MorphFrame, type MorphFrames } from './round-strokes.js';
export type PlusMinusGeometry = {
  center: [number, number];
  frames: MorphFrames;
  extent: number;
  strokeWidth: number;
  box: string;
  plus: { outline: string; filled: string };
  minus: { outline: string; filled: string };
};
const format = (n: number) => String(Math.round(n * 1e8) / 1e8);
/** Fold the vertical arm onto a fixed horizontal arm, using the same union in Filled. */
export function plusMinusFrame(
  progress: number,
  geometry: PlusMinusGeometry,
  frame: MorphFrame = 'square',
) {
  const p = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));
  if (p === 0) return { ...geometry.plus, filled: geometry.frames[frame].from };
  if (p === 1) return { ...geometry.minus, filled: geometry.frames[frame].to };
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
      geometry.frames[frame].box +
      ' ' +
      mergedStrokes(0, angle, length, (frame === 'none' ? 2.5 : geometry.strokeWidth) / 2, {
        x,
        y,
      }),
  };
}
