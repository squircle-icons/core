import { movingStrokeUnion, type MorphFrame, type MorphFrames } from './round-strokes.js';
export type MenuXGeometry = {
  frames: MorphFrames;
  center: [number, number];
  menuExtent: number;
  menuOffset: number;
  xExtent: number;
  strokeWidth: number;
  filledStrokeWidth: number;
  menu: { outline: string; filled: string };
  x: { outline: string; filled: string };
};
const clamp = (p: number) => Math.max(0, Math.min(1, p));
const smooth = (p: number) => {
  const t = clamp(p);
  return t ** 3 * (10 + t * (-15 + 6 * t));
};
const mix = (a: number, b: number, p: number) => a + (b - a) * p;
const fmt = (n: number) => String(Math.round(n * 1e8) / 1e8);
const point = (p: [number, number]) => p.map(fmt).join(' ');
export function menuXFrame(
  progress: number,
  geometry: MenuXGeometry,
  frame: MorphFrame = 'square',
) {
  const p = clamp(Number.isFinite(progress) ? progress : 0);
  if (p === 0)
    return { ...geometry.menu, filled: geometry.frames[frame].from, middle: '', middleWidth: 0 };
  if (p === 1)
    return { ...geometry.x, filled: geometry.frames[frame].to, middle: '', middleWidth: 0 };
  const q = smooth(p),
    center = geometry.center;
  const offset = geometry.menuOffset * (1 - smooth(p / 0.7));
  const angle = (Math.PI / 4) * smooth((p - 0.15) / 0.85);
  const extent = mix(geometry.menuExtent, geometry.xExtent * Math.SQRT2, q);
  const line = (cy: number, a: number) => {
    const dx = Math.cos(a) * extent,
      dy = Math.sin(a) * extent;
    return `M${point([center[0] - dx, cy - dy])} L${point([center[0] + dx, cy + dy])}`;
  };
  const remaining = 1 - smooth(p / 0.65);
  const middleExtent = geometry.menuExtent * remaining;
  const width =
    frame === 'none'
      ? geometry.filledStrokeWidth
      : mix(geometry.filledStrokeWidth, geometry.strokeWidth, q);
  const glyph = movingStrokeUnion([
    { center: { x: center[0], y: center[1] - offset }, angle, length: extent, radius: width / 2 },
    {
      center: { x: center[0], y: center[1] + offset },
      angle: -angle,
      length: extent,
      radius: width / 2,
    },
    {
      center: { x: center[0], y: center[1] },
      angle: 0,
      length: middleExtent,
      radius: (width / 2) * remaining,
    },
  ]);
  return {
    outline: `${line(center[1] - offset, angle)} ${line(center[1] + offset, -angle)}`,
    middle:
      remaining > 1e-7
        ? `M${point([center[0] - middleExtent, center[1]])} H${fmt(center[0] + middleExtent)}`
        : '',
    middleWidth: geometry.strokeWidth * remaining,
    filledWidth: width,
    filled: geometry.frames[frame].box + ' ' + glyph,
  };
}
