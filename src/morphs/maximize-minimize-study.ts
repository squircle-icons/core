/** An explicitly scoped study pair; legacy production geometry stays independent. */
export type StudyPoint = [number, number];
export type StudyCubic = [StudyPoint, StudyPoint, StudyPoint, StudyPoint];
export type StudyCornerDrawing = { outline: string; filled: string };
export type MaximizeMinimizeStudyGeometry = {
  strokeWidth: number;
  filledStrokeWidth: number;
  corners: {
    id: 'tl' | 'tr' | 'br' | 'bl';
    from: StudyCubic[];
    /** Destination traversal is aligned to the same anchored source tips. */
    to: StudyCubic[];
    maximize: StudyCornerDrawing;
    minimize: StudyCornerDrawing;
  }[];
};
const format = (n: number) => String(Math.round(n * 1e8) / 1e8);
const point = (p: StudyPoint) => p.map(format).join(' ');
const add = (a: StudyPoint, b: StudyPoint, factor = 1): StudyPoint => [
  a[0] + b[0] * factor,
  a[1] + b[1] * factor,
];
const mix = (a: StudyPoint, b: StudyPoint, q: number): StudyPoint => [
  a[0] + (b[0] - a[0]) * q,
  a[1] + (b[1] - a[1]) * q,
];

/** The same two cubic runs fold inward; their outer tips never move. */
export function studyCornerCurves(
  progress: number,
  corner: MaximizeMinimizeStudyGeometry['corners'][number],
): StudyCubic[] {
  const p = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));
  const q = p ** 3 * (10 + p * (-15 + 6 * p));
  return corner.from.map(
    (curve, i) => curve.map((p, j) => mix(p, corner.to[i][j], q)) as StudyCubic,
  );
}

/** Exact offset point and derivative; only the final cubic fit is approximate. */
function offset(curve: StudyCubic, t: number, distance: number) {
  const u = 1 - t;
  const position = [0, 1].map(
    (i) =>
      u ** 3 * curve[0][i] +
      3 * u * u * t * curve[1][i] +
      3 * u * t * t * curve[2][i] +
      t ** 3 * curve[3][i],
  ) as StudyPoint;
  const velocity = [0, 1].map(
    (i) =>
      3 * u * u * (curve[1][i] - curve[0][i]) +
      6 * u * t * (curve[2][i] - curve[1][i]) +
      3 * t * t * (curve[3][i] - curve[2][i]),
  ) as StudyPoint;
  const acceleration = [0, 1].map(
    (i) =>
      6 * u * (curve[2][i] - 2 * curve[1][i] + curve[0][i]) +
      6 * t * (curve[3][i] - 2 * curve[2][i] + curve[1][i]),
  ) as StudyPoint;
  const length = Math.hypot(...velocity);
  const dot = velocity[0] * acceleration[0] + velocity[1] * acceleration[1];
  const normal: StudyPoint = [-velocity[1] / length, velocity[0] / length];
  const normalDerivative: StudyPoint = [
    -acceleration[1] / length + (velocity[1] * dot) / length ** 3,
    acceleration[0] / length - (velocity[0] * dot) / length ** 3,
  ];
  return {
    position: add(position, normal, distance),
    velocity: add(velocity, normalDerivative, distance),
  };
}

function offsetCurves(curves: StudyCubic[], distance: number): StudyCubic[] {
  // Fixed subdivision avoids phase-dependent fitting changes. Error is verified
  // independently against the analytical offset throughout the full fold.
  const steps = 16;
  return curves.flatMap((curve) =>
    Array.from({ length: steps }, (_, i): StudyCubic => {
      const start = offset(curve, i / steps, distance);
      const end = offset(curve, (i + 1) / steps, distance);
      return [
        start.position,
        add(start.position, start.velocity, 1 / (3 * steps)),
        add(end.position, end.velocity, -1 / (3 * steps)),
        end.position,
      ];
    }),
  );
}
const runs = (curves: StudyCubic[]) =>
  curves.map((curve) => 'C' + curve.slice(1).map(point).join(' ')).join(' ');
const path = (curves: StudyCubic[]) => `M${point(curves[0][0])} ${runs(curves)}`;

function drawing(curves: StudyCubic[], width: number): StudyCornerDrawing {
  const radius = width / 2;
  const right = offsetCurves(curves, -radius);
  const left = offsetCurves(curves, radius)
    .reverse()
    .map((curve) => [...curve].reverse() as StudyCubic);
  const cap = (p: StudyPoint) => `A${format(radius)} ${format(radius)} 0 0 1 ${point(p)}`;
  return {
    outline: path(curves),
    filled: `${path(right)} ${cap(left[0][0])} ${runs(left)} ${cap(right[0][0])} Z`,
  };
}

export function maximizeMinimizeStudyFrame(
  progress: number,
  geometry: MaximizeMinimizeStudyGeometry,
) {
  const p = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));
  const parts = geometry.corners.map((corner) => ({
    id: corner.id,
    ...(p === 0
      ? corner.maximize
      : p === 1
        ? corner.minimize
        : drawing(studyCornerCurves(p, corner), geometry.filledStrokeWidth)),
  }));
  return {
    parts,
    outline: parts.map((part) => part.outline).join(' '),
    filled: parts.map((part) => part.filled).join(' '),
  };
}
