import { XMLParser } from 'fast-xml-parser';
import parser from 'svg-path-parser';
import { FIGMA_STUDY_ICONS } from '../src/design/figma-catalog.js';
import { movingStrokeUnion } from '../src/morphs/round-strokes.js';

export const commands = (d: string) => parser.makeAbsolute(parser.parseSVG(d));
export function source(id: string, style: 'outline' | 'filled' = 'outline') {
  const icon = FIGMA_STUDY_ICONS.find((icon) => icon.id === id);
  if (!icon) throw new Error(`Missing new morph endpoint: ${id}`);
  const root = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' }).parse(
    icon[style],
  ).svg;
  if (root.viewBox !== '0 0 24 24') throw new Error('Morph endpoints require native24×24');
  const paths = (Array.isArray(root.path) ? root.path : [root.path]) as {
    d: string;
    stroke?: string;
    fill?: string;
    'stroke-width'?: string;
  }[];
  return { icon, root, paths };
}
export function mark(id: string) {
  const outline = source(id),
    filled = source(id, 'filled');
  const width = Number(outline.paths[0]['stroke-width']);
  if (width !== 1.5 || outline.paths.some((p) => Number(p['stroke-width']) !== width))
    throw new Error('New morph Outline must be1.5');
  const d = outline.paths.map((p) => p.d).join(' ');
  const points = commands(d)
    .filter((c) => c.command !== 'closepath')
    .map((c) => [c.x, c.y]);
  const xs = points.map((p) => p[0]),
    ys = points.map((p) => p[1]);
  const strokes = filled.paths.filter((p) => p.stroke && p.stroke !== 'none');
  const fillPath = strokes.length
    ? movingStrokeUnion(
        strokes.flatMap((p) => {
          let start = [0, 0];
          return commands(p.d).flatMap((c) => {
            if (c.command === 'moveto') {
              start = [c.x, c.y];
              return [];
            }
            if (!['lineto', 'horizontal lineto', 'vertical lineto'].includes(c.command))
              throw new Error('Filled stroke conversion requires straight source marks');
            const end = [c.x, c.y],
              dx = end[0] - start[0],
              dy = end[1] - start[1];
            const result = {
              center: { x: (start[0] + end[0]) / 2, y: (start[1] + end[1]) / 2 },
              angle: Math.atan2(dy, dx),
              length: Math.hypot(dx, dy) / 2,
              radius: Number(p['stroke-width']) / 2,
            };
            start = end;
            return [result];
          });
        }),
      )
    : filled.paths.map((p) => p.d).join(' ');
  return {
    outline: d,
    filled: fillPath,
    strokeWidth: width,
    center: [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2] as [
      number,
      number,
    ],
    extent: (Math.max(...xs) - Math.min(...xs)) / 2,
    points,
  };
}
