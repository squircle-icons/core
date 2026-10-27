type Point = { x: number; y: number };
type Edge =
  | { kind: 'line'; a: Point; b: Point }
  | { kind: 'arc'; center: Point; radius: number; angle: number };
const tau = Math.PI * 2;
const epsilon = 1e-8;
const clamp = (p: number) => Math.min(1, Math.max(0, p));
const add = (a: Point, b: Point): Point => ({ x: a.x + b.x, y: a.y + b.y });
const sub = (a: Point, b: Point): Point => ({ x: a.x - b.x, y: a.y - b.y });
const mul = (a: Point, s: number): Point => ({ x: a.x * s, y: a.y * s });
const dot = (a: Point, b: Point) => a.x * b.x + a.y * b.y;
const cross = (a: Point, b: Point) => a.x * b.y - a.y * b.x;
const format = (p: number) => String(Math.round(p * 1e8) / 1e8);
const pointString = (p: Point) => `${format(p.x)} ${format(p.y)}`;
function at(edge: Edge, t: number): Point {
  return edge.kind === 'line'
    ? add(edge.a, mul(sub(edge.b, edge.a), t))
    : add(edge.center, {
        x: edge.radius * Math.cos(edge.angle + Math.PI * t),
        y: edge.radius * Math.sin(edge.angle + Math.PI * t),
      });
}
function parameter(edge: Edge, point: Point): number {
  if (edge.kind === 'line') {
    const direction = sub(edge.b, edge.a);
    return dot(sub(point, edge.a), direction) / dot(direction, direction);
  }
  let angle = (Math.atan2(point.y - edge.center.y, point.x - edge.center.x) - edge.angle) % tau;
  if (angle < 0) angle += tau;
  if (angle > tau - epsilon) angle = 0;
  return angle / Math.PI;
}
function crossings(a: Edge, b: Edge): Point[] {
  let result: Point[] = [];
  if (a.kind === 'line' && b.kind === 'line') {
    const u = sub(a.b, a.a),
      v = sub(b.b, b.a),
      denominator = cross(u, v);
    if (Math.abs(denominator) > epsilon)
      result = [add(a.a, mul(u, cross(sub(b.a, a.a), v) / denominator))];
  } else if (a.kind === 'arc' && b.kind === 'arc') {
    const direction = sub(b.center, a.center),
      distance = Math.hypot(direction.x, direction.y);
    if (distance > epsilon && distance <= 2 * a.radius + epsilon) {
      const half = mul(add(a.center, b.center), 0.5);
      const height = Math.sqrt(Math.max(0, a.radius ** 2 - (distance / 2) ** 2));
      const normal = { x: -direction.y / distance, y: direction.x / distance };
      result = [add(half, mul(normal, height)), add(half, mul(normal, -height))];
    }
  } else {
    const line = (a.kind === 'line' ? a : b) as Extract<Edge, { kind: 'line' }>;
    const arc = (a.kind === 'arc' ? a : b) as Extract<Edge, { kind: 'arc' }>;
    const direction = sub(line.b, line.a),
      offset = sub(line.a, arc.center);
    const aa = dot(direction, direction),
      bb = 2 * dot(offset, direction),
      cc = dot(offset, offset) - arc.radius ** 2;
    const discriminant = bb * bb - 4 * aa * cc;
    if (discriminant >= -epsilon) {
      const root = Math.sqrt(Math.max(0, discriminant));
      result = [(-bb - root) / (2 * aa), (-bb + root) / (2 * aa)].map((t) =>
        add(line.a, mul(direction, t)),
      );
    }
  }
  return result.filter((p) =>
    [parameter(a, p), parameter(b, p)].every((t) => t >= -epsilon && t <= 1 + epsilon),
  );
}
function capsule(angle: number, length: number, h: number): Edge[] {
  const u = { x: Math.cos(angle), y: Math.sin(angle) },
    n = { x: -u.y, y: u.x };
  const left = mul(u, -length),
    right = mul(u, length);
  return [
    { kind: 'line', a: add(left, mul(n, -h)), b: add(right, mul(n, -h)) },
    { kind: 'arc', center: right, radius: h, angle: angle - Math.PI / 2 },
    { kind: 'line', a: add(right, mul(n, h)), b: add(left, mul(n, h)) },
    { kind: 'arc', center: left, radius: h, angle: angle + Math.PI / 2 },
  ];
}
/** Exact union boundary of two centered capsules, including overlapping end caps. */
export function mergedStrokes(
  a: number,
  b: number,
  length: number,
  h: number,
  center: Point,
): string {
  const segments: { edge: Edge; from: number; to: number }[] = [];
  const edges = [capsule(a, length, h), capsule(b, length, h)];
  const single = Math.abs(a - b) < 1e-6;
  for (let side = 0; side < (single ? 1 : 2); side++) {
    const otherAngle = side === 0 ? b : a;
    const otherUnit = { x: Math.cos(otherAngle), y: Math.sin(otherAngle) };
    for (const edge of edges[side]) {
      const cuts = [0, 1];
      if (!single)
        for (const other of edges[1 - side])
          for (const p of crossings(edge, other)) cuts.push(clamp(parameter(edge, p)));
      cuts.sort((x, y) => x - y);
      for (let i = 1; i < cuts.length; i++) {
        const from = cuts[i - 1],
          to = cuts[i];
        if (to - from < epsilon) continue;
        const middle = at(edge, (from + to) / 2);
        const projection = Math.min(length, Math.max(-length, dot(middle, otherUnit)));
        const distance = sub(middle, mul(otherUnit, projection));
        if (single || dot(distance, distance) > h * h + epsilon) segments.push({ edge, from, to });
      }
    }
  }
  // Their union is star-shaped about the origin, so polar order gives one closed contour.
  segments.sort((a, b) => {
    const x = at(a.edge, (a.from + a.to) / 2),
      y = at(b.edge, (b.from + b.to) / 2);
    return Math.atan2(x.y, x.x) - Math.atan2(y.y, y.x);
  });
  let path = 'M' + pointString(add(center, at(segments[0].edge, segments[0].from)));
  for (const { edge, to } of segments) {
    path +=
      (edge.kind === 'line' ? ' L' : ` A${format(h)} ${format(h)} 0 0 1 `) +
      pointString(add(center, at(edge, to)));
  }
  return path + ' Z';
}

export type MorphFrame = 'none' | 'square' | 'circle';
export type MorphFrames = Record<MorphFrame, { box: string; from: string; to: string }>;
export type MovingStroke = { center: Point; angle: number; length: number; radius: number };

// Menu has three moving, sometimes disconnected capsules with unequal radii.
function unequalCrossings(a: Edge, b: Edge): Point[] {
  if (a.kind !== 'arc' || b.kind !== 'arc' || a.radius === b.radius) return crossings(a, b);
  const v = sub(b.center, a.center),
    d = Math.hypot(v.x, v.y);
  if (
    d < epsilon ||
    d > a.radius + b.radius + epsilon ||
    d < Math.abs(a.radius - b.radius) - epsilon
  )
    return [];
  const along = (a.radius ** 2 - b.radius ** 2 + d ** 2) / (2 * d);
  const h = Math.sqrt(Math.max(0, a.radius ** 2 - along ** 2));
  const middle = add(a.center, mul(v, along / d)),
    normal = { x: -v.y / d, y: v.x / d };
  return [add(middle, mul(normal, h)), add(middle, mul(normal, -h))].filter((p) =>
    [parameter(a, p), parameter(b, p)].every((t) => t >= -epsilon && t <= 1 + epsilon),
  );
}
/** Exact capsule union, including disconnected Menu bars and overlapping caps. */
export function movingStrokeUnion(input: MovingStroke[]): string {
  const strokes = input.filter((s) => s.radius > 1e-7 && s.length > 1e-7);
  const shapes = strokes.map((s) =>
    capsule(s.angle, s.length, s.radius).map((edge): Edge =>
      edge.kind === 'line'
        ? { ...edge, a: add(edge.a, s.center), b: add(edge.b, s.center) }
        : { ...edge, center: add(edge.center, s.center) },
    ),
  );
  const inside = (p: Point, s: MovingStroke) => {
    const u = { x: Math.cos(s.angle), y: Math.sin(s.angle) },
      offset = sub(p, s.center);
    const projected = Math.max(-s.length, Math.min(s.length, dot(offset, u)));
    const distance = sub(offset, mul(u, projected));
    return dot(distance, distance) < s.radius ** 2 - epsilon;
  };
  const pieces: { edge: Edge; from: number; to: number }[] = [];
  for (let side = 0; side < shapes.length; side++)
    for (const edge of shapes[side]) {
      const cuts = [0, 1];
      for (let other = 0; other < shapes.length; other++)
        if (other !== side)
          for (const boundary of shapes[other])
            for (const p of unequalCrossings(edge, boundary)) cuts.push(clamp(parameter(edge, p)));
      cuts.sort((a, b) => a - b);
      for (let i = 1; i < cuts.length; i++) {
        const from = cuts[i - 1],
          to = cuts[i];
        if (to - from < epsilon) continue;
        const middle = at(edge, (from + to) / 2);
        if (!strokes.some((s, i) => i !== side && inside(middle, s)))
          pieces.push({ edge, from, to });
      }
    }
  const near = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y) < 1e-6;
  let path = '';
  while (pieces.length) {
    let piece = pieces.shift()!;
    const start = at(piece.edge, piece.from);
    path += 'M' + pointString(start);
    for (;;) {
      const end = at(piece.edge, piece.to);
      path +=
        (piece.edge.kind === 'line'
          ? ' L'
          : ` A${format(piece.edge.radius)} ${format(piece.edge.radius)} 0 0 1 `) +
        pointString(end);
      if (near(end, start)) break;
      const next = pieces.findIndex((p) => near(at(p.edge, p.from), end));
      if (next < 0) throw new Error('Moving stroke union has an open contour');
      piece = pieces.splice(next, 1)[0];
    }
    path += ' Z ';
  }
  return path.trim();
}
