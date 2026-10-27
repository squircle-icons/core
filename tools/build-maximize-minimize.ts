import pathParser from 'svg-path-parser';
import type { CoreIcon } from '../src/catalog.js';
import type {
  CornerCommand,
  CornerId,
  MaximizeMinimizeGeometry,
} from '../src/morphs/maximize-minimize.js';

const ids: CornerId[] = ['tl', 'tr', 'br', 'bl'];
const near = (a: number, b: number) => Math.abs(a - b) < 1e-6;
function paths(icon: CoreIcon, filled = false): string[] {
  const root = filled ? icon.filled!.root : icon.root;
  const collect = (node: CoreIcon['root']): string[] =>
    node.tag === 'path' ? [node.attrs.d] : node.children.flatMap(collect);
  const pieces = collect(root)
    .flatMap((path) => path.match(/[Mm][^Mm]*/g) ?? [])
    .map((path) => path.trim());
  if (pieces.length !== 4) throw new Error(`${icon.name} requires four stable L subpaths`);
  return pieces;
}
function commands(path: string): CornerCommand[] {
  return pathParser.makeAbsolute(pathParser.parseSVG(path)).map((command) => {
    if (command.command === 'closepath') return { kind: 'Z' };
    if (command.command === 'elliptical arc') {
      if (!near(command.rx, command.ry))
        throw new Error('Corner morph requires circular elbow and cap arcs');
      return {
        kind: 'A',
        rx: command.rx,
        ry: command.ry,
        rotation: command.xAxisRotation,
        large: command.largeArc,
        sweep: command.sweep,
        x: command.x,
        y: command.y,
      };
    }
    if (['moveto', 'lineto', 'horizontal lineto', 'vertical lineto'].includes(command.command))
      return { kind: command.command === 'moveto' ? 'M' : 'L', x: command.x, y: command.y };
    throw new Error(`Unsupported corner command: ${command.command}`);
  });
}
function assertHalfTurn(from: CornerCommand[], to: CornerCommand[], center: [number, number]) {
  if (from.length !== to.length) throw new Error('Corner endpoint command structures differ');
  from.forEach((command, index) => {
    const end = to[index];
    if (command.kind !== end.kind) throw new Error('Corner endpoint command structures differ');
    if (command.kind === 'Z' || end.kind === 'Z') return;
    if (!near(2 * center[0] - command.x, end.x) || !near(2 * center[1] - command.y, end.y))
      throw new Error('Minimize must be the same L after a local half-turn');
    if (command.kind === 'A' && end.kind === 'A')
      if (
        !near(command.rx, end.rx) ||
        !near(command.ry, end.ry) ||
        command.large !== end.large ||
        command.sweep !== end.sweep
      )
        throw new Error('Corner endpoint radii or arc directions differ');
  });
}
export function buildMaximizeMinimizeGeometry(icons: CoreIcon[]): MaximizeMinimizeGeometry {
  const maximize = icons.find((icon) => icon.name === 'maximize');
  const minimize = icons.find((icon) => icon.name === 'minimize');
  if (!maximize?.filled || !minimize?.filled)
    throw new Error('Both Maximize and Minimize styles are required');
  if ([maximize, minimize].some((icon) => Object.keys(icon.frames ?? {}).length))
    throw new Error('This authored pair supports unframed sources only');
  const strokeWidth = Number(maximize.root.attrs['stroke-width']);
  if (!near(strokeWidth, Number(minimize.root.attrs['stroke-width'])))
    throw new Error('Corner endpoint Outline weights differ');
  const outlines = paths(maximize),
    fills = paths(maximize, true),
    targets = paths(minimize),
    targetFills = paths(minimize, true);
  let cornerRadius = 0,
    filledStrokeWidth = 0;
  const corners = outlines.map((path, index) => {
    const outline = commands(path),
      filled = commands(fills[index]);
    const vertices = outline.filter(
      (command): command is Exclude<CornerCommand, { kind: 'Z' }> => command.kind !== 'Z',
    );
    const xs = vertices.map((command) => command.x),
      ys = vertices.map((command) => command.y);
    const center: [number, number] = [
      (Math.min(...xs) + Math.max(...xs)) / 2,
      (Math.min(...ys) + Math.max(...ys)) / 2,
    ];
    const expected: CornerId =
      center[1] < 12 ? (center[0] < 12 ? 'tl' : 'tr') : center[0] < 12 ? 'bl' : 'br';
    if (expected !== ids[index]) throw new Error('Corner subpaths must retain TL/TR/BR/BL order');
    const elbow = outline.find(
      (command): command is Extract<CornerCommand, { kind: 'A' }> => command.kind === 'A',
    );
    if (!elbow) throw new Error('Each L requires its source rounded elbow');
    const radii = filled
      .filter((command): command is Extract<CornerCommand, { kind: 'A' }> => command.kind === 'A')
      .map((command) => command.rx);
    const width = 2 * (Math.max(...radii) - elbow.rx);
    if (index && (!near(cornerRadius, elbow.rx) || !near(filledStrokeWidth, width)))
      throw new Error('Corner weights and radii must match across all four L parts');
    cornerRadius = elbow.rx;
    filledStrokeWidth = width;
    if (
      !(width > 0) ||
      !radii.some((radius) => near(radius, width / 2)) ||
      !radii.some((radius) => near(radius, elbow.rx - width / 2))
    )
      throw new Error('Filled corner contour must have matching round caps and offsets');
    assertHalfTurn(outline, commands(targets[index]), center);
    assertHalfTurn(filled, commands(targetFills[index]), center);
    return {
      id: ids[index],
      center,
      direction: (index % 2 ? -1 : 1) as 1 | -1,
      outline,
      filled,
      maximize: { outline: path, filled: fills[index] },
      minimize: { outline: targets[index], filled: targetFills[index] },
    };
  });
  return {
    strokeWidth,
    filledStrokeWidth,
    cornerRadius,
    corners,
    maximize: { outline: outlines.join(' '), filled: fills.join(' ') },
    minimize: { outline: targets.join(' '), filled: targetFills.join(' ') },
  };
}
