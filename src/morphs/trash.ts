export type TrashGeometry = {
  strokeWidth: number;
  outline: { body: string; lid: string; marks: string };
  filled: { body: string; lid: string };
  pivot: [number, number];
  lift: number;
  angle: number;
};
/** A rigid lid and handle lift together; the body and transparent slots stay fixed. */
export function trashFrame(progress: number, geometry: TrashGeometry) {
  const p = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));
  return {
    progress: p,
    lift: -geometry.lift * p,
    angle: geometry.angle * p,
    transform: `translate(0 ${-geometry.lift * p}) rotate(${geometry.angle * p} ${geometry.pivot.join(' ')})`,
  };
}
