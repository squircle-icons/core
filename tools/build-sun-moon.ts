import { commands, source } from './morph-source.js';
import type { Circle, SunMoonGeometry } from '../src/morphs/sun-moon.js';
type Point = { x: number; y: number };
/** Recover circles from actual baked cubic anchors, not a previous pose. */
function circle(a: Point, b: Point, c: Point): Circle {
  const d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
  if (Math.abs(d) < 1e-8) throw new Error('Circle source points are collinear');
  const sq = (p: Point) => p.x * p.x + p.y * p.y;
  const x = (sq(a) * (b.y - c.y) + sq(b) * (c.y - a.y) + sq(c) * (a.y - b.y)) / d;
  const y = (sq(a) * (c.x - b.x) + sq(b) * (a.x - c.x) + sq(c) * (b.x - a.x)) / d;
  return { x, y, radius: Math.hypot(a.x - x, a.y - y) };
}
export function buildSunMoonGeometry(): SunMoonGeometry {
  const sun = source('sun'),
    moon = source('moon');
  const disk = commands(sun.paths[0].d),
    crescent = commands(moon.paths[0].d);
  if (disk.length !== 6 || crescent.length !== 14)
    throw new Error('Review changed Sun/Moon master mapping');
  let start: Point = { x: 0, y: 0 };
  const rays = commands(sun.paths[1].d).flatMap((c) => {
    if (c.command === 'moveto') {
      start = c;
      return [];
    }
    const line = [start.x, start.y, c.x, c.y];
    start = c;
    return [line];
  });
  const strokeWidth = Number(sun.paths[0]['stroke-width']);
  if (strokeWidth !== 1.5 || Number(moon.paths[0]['stroke-width']) !== strokeWidth)
    throw new Error('New Sun/Moon source weights differ');
  return {
    strokeWidth,
    sun: {
      ...circle(disk[0], disk[1], disk[2]),
      rays,
      path: sun.paths[0].d,
      filledPath: source('sun', 'filled').paths[0].d,
    },
    moon: {
      outer: circle(crescent[0], crescent[4], crescent[8]),
      inner: circle(crescent[8], crescent[10], crescent[12]),
      path: moon.paths[0].d,
      filledPath: source('moon', 'filled').paths[0].d,
    },
  };
}
