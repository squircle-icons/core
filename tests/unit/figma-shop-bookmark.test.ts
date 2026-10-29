import { readFile } from 'node:fs/promises';
import { expect, it } from 'vitest';
import pathParser from 'svg-path-parser';

const source = (id: string, style = 'outline') =>
  readFile(new URL(`../../icons/figma-study/${id}/${style}.svg`, import.meta.url), 'utf8');
const paths = (svg: string) =>
  [...svg.matchAll(/<path\b[^>]*\bd="([^"]+)"[^>]*>/g)].map((m) => m[1]);
const commands = (d: string) => pathParser.makeAbsolute(pathParser.parseSVG(d));

// Figma replaces an exact collinear vertical cubic with V. Normalize only that
// representation change, retaining every meaningful lower-body/door control.
function lowerBody(d: string) {
  const cs = commands(d);
  const start = cs.findIndex((c) => c.x0 === 21.25 && c.y0 === 14 && c.code === 'C');
  const end = cs.findIndex((c, i) => i >= start && c.x === 2.75 && c.y === 14);
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  return cs.slice(start, end + 1).map((c) => {
    if (c.code === 'V' || (c.code === 'C' && c.x0 === c.x1 && c.x1 === c.x2 && c.x2 === c.x))
      return ['L', c.x, c.y];
    if (c.code !== 'C') throw new Error(`Unexpected lower body command: ${c.code}`);
    return ['C', c.x1, c.y1, c.x2, c.y2, c.x, c.y];
  });
}

function polygons(d: string) {
  const result: number[][][] = [];
  let points: number[][] = [];
  for (const c of commands(d)) {
    if (c.code === 'M') {
      points = [[c.x, c.y]];
      result.push(points);
    } else if (c.code === 'C') {
      for (let i = 1; i <= 64; i++) {
        const t = i / 64,
          u = 1 - t;
        points.push([
          u ** 3 * c.x0 + 3 * u ** 2 * t * c.x1 + 3 * u * t ** 2 * c.x2 + t ** 3 * c.x,
          u ** 3 * c.y0 + 3 * u ** 2 * t * c.y1 + 3 * u * t ** 2 * c.y2 + t ** 3 * c.y,
        ]);
      }
    } else if (['L', 'H', 'V', 'Z'].includes(c.code)) points.push([c.x, c.y]);
    else throw new Error(`Unexpected native export command: ${c.code}`);
  }
  return result;
}
function painted(d: string, x: number, y: number) {
  let inside = false;
  for (const points of polygons(d)) {
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const [xi, yi] = points[i],
        [xj, yj] = points[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
  }
  return inside;
}

it('retains the exact Home Door lower body beneath the straight-sided Shop fabric canopy', async () => {
  const outline = await source('shop'),
    shop = paths(outline);
  expect(shop).toHaveLength(4);
  expect(lowerBody(shop[0])).toEqual(lowerBody(paths(await source('home-door'))[0]));
  const slopes = commands(shop[1])
    .filter((c) => c.code === 'L')
    .map((c) => [c.x0, c.y0, c.x, c.y]);
  // Straight slopes cannot develop the rejected inward roof concavity.
  expect(slopes).toEqual([
    [19.5, 5.15, 21.05, 8.05],
    [2.95, 8.05, 4.5, 5.15],
  ]);
  expect(shop[3]).toBe('M7.15002 13.2V15.3');
  const seams = commands(shop[2]).filter((c) => c.code === 'L');
  expect(seams.map((c) => [c.x, c.y])).toEqual([
    [8.94995, 9.35],
    [15.05, 9.35],
  ]);
  expect(outline.match(/stroke-width="1.5"/g)).toHaveLength(4);
  const filled = await source('shop', 'filled'),
    body = paths(filled);
  expect(body).toHaveLength(1);
  expect(filled).toContain('fill-rule="evenodd"');
  expect(filled).not.toMatch(/\bstroke=/);
  for (const [x, y] of [
    [9.1, 7],
    [14.9, 7],
    [7.15002, 14.25],
    [12, 19],
  ])
    expect(painted(body[0], x, y)).toBe(false);
  for (const [x, y] of [
    [5, 16],
    [18, 7],
    [12, 7],
    [9.3, 4.1],
    [8.95, 9.35],
    [12, 12],
  ])
    expect(painted(body[0], x, y)).toBe(true);
});

it('keeps Bookmark upright at the requested fuller16-unit width and unchanged20-unit height', async () => {
  const outline = await source('bookmark'),
    filled = await source('bookmark', 'filled');
  expect(outline).toContain('stroke-width="1.5"');
  const points = polygons(paths(outline)[0]).flat();
  const xs = points.map((p) => p[0]),
    ys = points.map((p) => p[1]);
  expect(Math.min(...xs)).toBe(4.75);
  expect(Math.max(...xs)).toBe(19.25);
  expect(Math.min(...ys)).toBe(2.75);
  expect(Math.max(...ys) + 0.75).toBeCloseTo(22, 3);
  const solidPoints = polygons(paths(filled)[0]).flat();
  expect(Math.min(...solidPoints.map((p) => p[0]))).toBe(4);
  expect(Math.max(...solidPoints.map((p) => p[0]))).toBe(20);
  expect(Math.min(...solidPoints.map((p) => p[1]))).toBe(2);
  // A local V notch remains open; the middle of the paper remains solid.
  expect(painted(paths(filled)[0], 12, 20)).toBe(false);
  expect(painted(paths(filled)[0], 12, 12)).toBe(true);
});
