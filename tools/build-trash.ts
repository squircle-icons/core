import { XMLParser } from 'fast-xml-parser';
import { commands, source } from './morph-source.js';
import type { TrashGeometry, TrashCommand } from '../src/morphs/trash.js';

function normalized(d: string): TrashCommand[] {
  return commands(d).map((c) => {
    if (c.command === 'closepath') return { code: 'Z', values: [] };
    if (c.command === 'moveto') return { code: 'M', values: [c.x, c.y] };
    if (c.command === 'curveto') return { code: 'C', values: [c.x1, c.y1, c.x2, c.y2, c.x, c.y] };
    if (['lineto', 'horizontal lineto', 'vertical lineto'].includes(c.command))
      return { code: 'L', values: [c.x, c.y] };
    throw new Error('Unexpected Trash source command');
  });
}
function reverseCounter(d: string) {
  const segments = normalized(d).filter((c) => c.code !== 'Z');
  const reversed = [{ code: 'M', values: segments.at(-1)!.values.slice(-2) }];
  for (let i = segments.length - 1; i > 0; i--) {
    const segment = segments[i],
      end = segments[i - 1].values.slice(-2);
    reversed.push({
      code: segment.code,
      values:
        segment.code === 'C'
          ? [...segment.values.slice(2, 4), ...segment.values.slice(0, 2), ...end]
          : end,
    });
  }
  return reversed.map((c) => c.code + c.values.join(' ')).join('') + 'Z';
}
export function buildTrashGeometry(): TrashGeometry {
  const outline = source('trash').paths;
  if (outline.length !== 4 || outline.some((p) => Number(p['stroke-width']) !== 1.5))
    throw new Error('Trash motion requires the current four-part 1.5 source');
  const filled = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' }).parse(
    source('trash', 'filled').icon.filled,
  ).svg.g.path.d as string;
  // Cut the exported union at its two lid/body junctions. Retain every source
  // cubic, the handle counter and both slot counters, without fitting new curves.
  const right = '19.1495 7.22754';
  const left = '4.8497 7.22754';
  const start = filled.indexOf(right) + right.length;
  const end = filled.indexOf(left) + left.length;
  const outerEnd = filled.indexOf('Z');
  const holes = filled
    .slice(outerEnd + 1)
    .split('Z')
    .filter(Boolean);
  if (start < right.length || end <= start || holes.length !== 3)
    throw new Error('Trash source topology changed; re-author the part split');
  const lid =
    filled.slice(0, start) + 'L' + left + filled.slice(end, outerEnd + 1) + holes[0] + 'Z';
  return {
    strokeWidth: 1.5,
    outline: { body: outline[0].d, lid: outline[1].d + ' ' + outline[2].d, marks: outline[3].d },
    filled: {
      body:
        'M' +
        right +
        filled.slice(start, end) +
        'Z' +
        holes
          .slice(1)
          .map((hole) => reverseCounter(hole + 'Z'))
          .join(''),
      lid,
    },
    filledLidCommands: normalized(lid),
    pivot: [19.75, 6.5],
    lift: 0,
    angle: 12,
  };
}
