import { XMLParser } from 'fast-xml-parser';
import { source } from './morph-source.js';
import type { TrashGeometry } from '../src/morphs/trash.js';

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
  return {
    strokeWidth: 1.5,
    outline: { body: outline[0].d, lid: outline[1].d + ' ' + outline[2].d, marks: outline[3].d },
    filled: {
      body: 'M' + right + filled.slice(start, end) + 'Z' + holes.slice(1).join('Z') + 'Z',
      lid: filled.slice(0, start) + 'L' + left + filled.slice(end, outerEnd + 1) + holes[0] + 'Z',
    },
    pivot: [12, 6.5],
    lift: 1.5,
    angle: -12,
  };
}
