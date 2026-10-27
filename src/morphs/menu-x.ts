export type MenuXGeometry = {
  center: [number, number];
  menuExtent: number;
  menuOffset: number;
  xExtent: number;
  strokeWidth: number;
  filledStrokeWidth: number;
  menu: { outline: string; filled: string };
  x: { outline: string; filled: string };
};
type Point = [number, number];
const clamp = (p: number) => Math.max(0, Math.min(1, p));
const smooth = (p: number) => {
  const t = clamp(p);
  return t ** 3 * (10 + t * (-15 + 6 * t));
};
const mix = (a: number, b: number, p: number) => a + (b - a) * p;
const fmt = (n: number) => String(Math.round(n * 1e8) / 1e8);
const point = (p: Point) => p.map(fmt).join(' ');

// Arclength correspondence turns each solid outer Menu bar into one half of the
// boxed X. Its negative-space branches open geometrically, without a crossfade.
function resample(points: Point[], count = 192): Point[] {
  const lengths = [0];
  for (let i = 1; i <= points.length; i++) {
    const a = points[i - 1],
      b = points[i % points.length];
    lengths.push(lengths[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1]));
  }
  let edge = 0;
  return Array.from({ length: count }, (_, i) => {
    const distance = (lengths.at(-1)! * i) / count;
    while (lengths[edge + 1] < distance) edge++;
    const a = points[edge],
      b = points[(edge + 1) % points.length];
    const t = (distance - lengths[edge]) / (lengths[edge + 1] - lengths[edge]);
    return [mix(a[0], b[0], t), mix(a[1], b[1], t)];
  });
}
function arc(cx: number, cy: number, r: number, from: number, to: number): Point[] {
  return Array.from({ length: 49 }, (_, i) => {
    const angle = mix(from, to, i / 48);
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  });
}
function capsule(extent: number, y: number, r: number): Point[] {
  return resample([
    ...arc(-extent, y, r, Math.PI, Math.PI * 1.5),
    ...arc(extent, y, r, -Math.PI / 2, Math.PI / 2),
    ...arc(-extent, y, r, Math.PI / 2, Math.PI),
  ]);
}
function upperBox(g: MenuXGeometry): Point[] {
  const d = g.xExtent,
    r = g.strokeWidth / 2,
    c = r / Math.SQRT2;
  return resample([
    [-10, 0],
    [-10, -6],
    ...arc(-6, -6, 4, Math.PI, Math.PI * 1.5),
    [6, -10],
    ...arc(6, -6, 4, -Math.PI / 2, 0),
    [10, 0],
    [r * Math.SQRT2, 0],
    [d + c, -d + c],
    ...arc(d, -d, r, Math.PI / 4, (-Math.PI * 3) / 4),
    [0, -r * Math.SQRT2],
    [-d + c, -d - c],
    ...arc(-d, -d, r, -Math.PI / 4, (-Math.PI * 5) / 4),
    [-r * Math.SQRT2, 0],
  ]);
}
const contours = new WeakMap<MenuXGeometry, { from: Point[]; to: Point[] }>();
export function menuXFrame(progress: number, geometry: MenuXGeometry) {
  const p = clamp(Number.isFinite(progress) ? progress : 0);
  if (p === 0) return { ...geometry.menu, middle: '', middleWidth: 0 };
  if (p === 1) return { ...geometry.x, middle: '', middleWidth: 0 };
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
  let pair = contours.get(geometry);
  if (!pair) {
    pair = {
      from: capsule(geometry.menuExtent, -geometry.menuOffset, geometry.filledStrokeWidth / 2),
      to: upperBox(geometry),
    };
    contours.set(geometry, pair);
  }
  const upper = pair.from.map((a, i): Point => [
    mix(a[0], pair!.to[i][0], q),
    mix(a[1], pair!.to[i][1], q),
  ]);
  const path = (points: Point[]) =>
    'M' + points.map((a) => point([center[0] + a[0], center[1] + a[1]])).join(' L') + ' Z';
  const lower = upper.map(([x, y]): Point => [-x, -y]);
  const middle =
    remaining > 1e-7
      ? path(capsule(middleExtent, 0, (geometry.filledStrokeWidth / 2) * remaining))
      : '';
  return {
    outline: `${line(center[1] - offset, angle)} ${line(center[1] + offset, -angle)}`,
    middle:
      remaining > 1e-7
        ? `M${point([center[0] - middleExtent, center[1]])} H${fmt(center[0] + middleExtent)}`
        : '',
    middleWidth: geometry.strokeWidth * remaining,
    filled: path(upper) + ' ' + path(lower) + ' ' + middle,
  };
}
