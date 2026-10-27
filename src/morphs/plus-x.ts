import { mergedStrokes } from './round-strokes.js';
export type PlusXGeometry = {
  center: [number, number];
  plusExtent: number;
  xExtent: number;
  strokeWidth: number;
  box: string;
  plus: { outline: string; filled: string };
  x: { outline: string; filled: string };
};
type Point = { x: number; y: number };
const clamp = (p: number) => Math.min(1, Math.max(0, p));
const add = (a: Point, b: Point): Point => ({ x: a.x + b.x, y: a.y + b.y });
const mul = (a: Point, s: number): Point => ({ x: a.x * s, y: a.y * s });
const format = (p: number) => String(Math.round(p * 1e8) / 1e8);
const pointString = (p: Point) => `${format(p.x)} ${format(p.y)}`;
// Quintic Hermite interpolation carries angular velocity through the horizontal merge.
function interpolate(
  from: number,
  to: number,
  startVelocity: number,
  endVelocity: number,
  t: number,
) {
  const delta = to - from;
  return (
    from +
    startVelocity * t +
    (10 * delta - 6 * startVelocity - 4 * endVelocity) * t ** 3 +
    (-15 * delta + 8 * startVelocity + 7 * endVelocity) * t ** 4 +
    (6 * delta - 3 * startVelocity - 3 * endVelocity) * t ** 5
  );
}
/** Plus flows through one horizontal line into X without a hold or zero angular velocity. */
export function plusXFrame(progress: number, geometry: PlusXGeometry) {
  const p = clamp(Number.isFinite(progress) ? progress : 0);
  if (p === 0) return geometry.plus;
  if (p === 1) return geometry.x;
  const turn = Math.PI / 4;
  const t = p < 0.5 ? p * 2 : (p - 0.5) * 2;
  const a = p < 0.5 ? interpolate(0, 0, 0, turn, t) : interpolate(0, turn, turn, 0, t);
  const b = p < 0.5 ? interpolate(Math.PI / 2, 0, 0, -turn, t) : -a;
  const opening = Math.abs(a) / turn;
  const extent = geometry.plusExtent + (geometry.xExtent - geometry.plusExtent) * opening;
  const length = extent / Math.max(Math.abs(Math.cos(a)), Math.abs(Math.cos(b)));
  const center = { x: geometry.center[0], y: geometry.center[1] };
  const end = (angle: number, direction: number) =>
    pointString(
      add(center, {
        x: Math.cos(angle) * length * direction,
        y: Math.sin(angle) * length * direction,
      }),
    );
  const line = (angle: number) => `M${end(angle, -1)} L${end(angle, 1)}`;
  const outline = Math.abs(a - b) < 1e-6 ? line(b) : `${line(a)} ${line(b)}`;
  return {
    outline,
    filled: geometry.box + ' ' + mergedStrokes(a, b, length, geometry.strokeWidth / 2, center),
  };
}
