import { XMLParser } from 'fast-xml-parser';
import pathParser from 'svg-path-parser';
import type { WindowTransferStudyIcon } from '../src/design/window-transfer.js';
import type {
  MaximizeMinimizeStudyGeometry,
  StudyCubic,
  StudyPoint,
} from '../src/morphs/maximize-minimize-study.js';

const parse = (d: string) => pathParser.makeAbsolute(pathParser.parseSVG(d));
const near = (a: StudyPoint, b: StudyPoint) => Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-6;
function paths(svg: string) {
  const root = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' }).parse(svg).svg;
  if (root.viewBox !== '0 0 24 24' || !Array.isArray(root.path) || root.path.length !== 4)
    throw new Error('Study endpoints require four paths on the native 24 canvas');
  return root.path as { d: string; 'stroke-width'?: string; transform?: string }[];
}
function cubics(d: string): StudyCubic[] {
  const commands = parse(d);
  if (commands.length !== 3 || commands[0].command !== 'moveto')
    throw new Error('Each study corner requires two authored cubic runs');
  let from: StudyPoint = [commands[0].x, commands[0].y];
  return commands.slice(1).map((command) => {
    if (command.command !== 'curveto') throw new Error('Study corner must retain its cubic master');
    const curve: StudyCubic = [
      from,
      [command.x1, command.y1],
      [command.x2, command.y2],
      [command.x, command.y],
    ];
    from = curve[3];
    return curve;
  });
}
export function buildMaximizeMinimizeStudyGeometry(
  icons: readonly WindowTransferStudyIcon[],
): MaximizeMinimizeStudyGeometry {
  const a = icons.find((icon) => icon.id === 'maximize');
  const b = icons.find((icon) => icon.id === 'minimize');
  if (!a || !b) throw new Error('Both study endpoints and styles are required');
  const source = paths(a.outline),
    target = paths(b.outline);
  const fills = paths(a.filled),
    targetFills = paths(b.filled);
  const ids = ['tl', 'tr', 'br', 'bl'] as const;
  let width = 0;
  const corners = source.map((piece, i) => {
    if ([piece, target[i], fills[i], targetFills[i]].some((p) => p.transform))
      throw new Error('Study corner transforms must be baked in source');
    if (
      Number(piece['stroke-width']) !== a.baseStroke ||
      Number(target[i]['stroke-width']) !== a.baseStroke ||
      a.baseStroke !== b.baseStroke
    )
      throw new Error('Study endpoint weights must match their declared source');
    const from = cubics(piece.d);
    const to = cubics(target[i].d)
      .reverse()
      .map((curve) => [...curve].reverse() as StudyCubic);
    if (!near(from[0][0], to[0][0]) || !near(from.at(-1)![3], to.at(-1)![3]))
      throw new Error('Study corner tips must stay anchored at both endpoints');
    const first = parse(fills[i].d)[0];
    const h = Math.min(
      ...[from[0][0], from.at(-1)![3]].map((p) => Math.hypot(first.x - p[0], first.y - p[1])),
    );
    if (!(h > 0) || (i > 0 && Math.abs(2 * h - width) > 1e-6))
      throw new Error('Study Filled offsets must use one consistent source weight');
    width = 2 * h;
    return {
      id: ids[i],
      from,
      to,
      maximize: { outline: piece.d, filled: fills[i].d },
      minimize: { outline: target[i].d, filled: targetFills[i].d },
    };
  });
  return { strokeWidth: a.baseStroke, filledStrokeWidth: width, corners };
}
