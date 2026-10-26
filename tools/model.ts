import { XMLParser, XMLValidator } from 'fast-xml-parser';
import pathParser from 'svg-path-parser';
import { optimize } from 'svgo';

export type SvgNode = { tag: string; attrs: Record<string, string>; children: SvgNode[] };
const supported: Record<string, string[]> = {
  svg: [
    'xmlns',
    'viewBox',
    'fill',
    'stroke',
    'stroke-width',
    'stroke-linecap',
    'stroke-linejoin',
    'fill-rule',
  ],
  g: ['data-part'],
  path: ['d'],
  circle: ['cx', 'cy', 'r'],
};
const number = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);
function assert(value: unknown, message: string): asserts value {
  if (!value) throw new Error(message);
}

export function parseSvg(
  source: string,
  style: 'outline' | 'filled' = 'outline',
): { root: SvgNode; parts: string[] } {
  assert(
    !/<!|<\?|&/.test(source),
    'Declarations, entities and processing instructions are unsupported',
  );
  assert(XMLValidator.validate(source) === true, 'Malformed SVG XML');
  const parsed = new XMLParser({
    preserveOrder: true,
    ignoreAttributes: false,
    attributeNamePrefix: '',
    trimValues: true,
  }).parse(source);
  const parts: string[] = [];
  const convert = (entry: Record<string, any>, parent?: string): SvgNode => {
    const tag = Object.keys(entry).find((key) => key !== ':@')!;
    assert(tag in supported, `Unsupported SVG element: ${tag}`);
    assert(parent ? tag !== 'svg' : tag === 'svg', 'Expected a single SVG root');
    const attrs = entry[':@'] ?? {};
    for (const key of Object.keys(attrs))
      assert(supported[tag].includes(key), `Unsupported attribute: ${key}`);
    if (tag === 'svg') {
      assert(attrs.xmlns === 'http://www.w3.org/2000/svg', 'Expected SVG namespace');
      assert(attrs.viewBox === '0 0 24 24', 'Expected 24 × 24 viewBox');
      if (style === 'outline') {
        assert(
          attrs.fill === 'none' && attrs.stroke === 'currentColor',
          'Expected unfilled currentColor artwork',
        );
        assert(
          Number(attrs['stroke-width']) > 0 && Number.isFinite(Number(attrs['stroke-width'])),
          'Invalid stroke width',
        );
        assert(
          attrs['stroke-linecap'] === 'round' && attrs['stroke-linejoin'] === 'round',
          'Expected rounded stroke caps and joins',
        );
        assert(attrs['fill-rule'] === undefined, 'Outline artwork cannot set a fill rule');
      } else {
        assert(
          attrs.fill === 'currentColor' && attrs.stroke === 'none',
          'Expected currentColor fill without stroke',
        );
        assert(
          attrs['fill-rule'] === 'evenodd',
          'Filled artwork requires explicit evenodd winding',
        );
        assert(attrs['stroke-width'] === undefined, 'Filled artwork must not add a stroke');
      }
    }
    if (tag === 'g') {
      assert(
        /^[a-z][a-z0-9-]*$/.test(attrs['data-part'] ?? ''),
        'Group requires a stable part name',
      );
      assert(!parts.includes(attrs['data-part']), 'Duplicate part name');
      parts.push(attrs['data-part']);
    }
    if (tag === 'path') {
      assert(typeof attrs.d === 'string', 'Path requires geometry');
      const commands = pathParser.parseSVG(attrs.d);
      assert(
        commands.length > 1 && commands[0].code.toUpperCase() === 'M',
        'Invalid path geometry',
      );
      for (const command of commands)
        for (const value of Object.values(command)) {
          if (typeof value === 'number') assert(Number.isFinite(value), 'Non-finite path geometry');
        }
    }
    if (tag === 'circle')
      for (const key of ['cx', 'cy', 'r']) {
        assert(
          attrs[key] !== undefined && Number.isFinite(Number(attrs[key])),
          'Invalid circle geometry',
        );
        if (key === 'r') assert(Number(attrs[key]) > 0, 'Circle radius must be positive');
      }
    assert(Array.isArray(entry[tag]), 'Unexpected XML content');
    assert(
      tag === 'svg' || tag === 'g' || entry[tag].length === 0,
      'Shapes cannot contain children',
    );
    const children = entry[tag].map((node: any) => convert(node, tag));
    if (tag === 'svg')
      assert(
        children.length > 0 && children.every((node: SvgNode) => node.tag === 'g'),
        'Artwork must use named groups',
      );
    return { tag, attrs, children };
  };
  assert(parsed.length === 1, 'Expected one SVG root');
  const root = convert(parsed[0]);
  assert(parts.length > 0, 'Expected named parts');
  return { root, parts };
}

export function optimizeSvg(source: string, style: 'outline' | 'filled' = 'outline'): string {
  const before = parseSvg(source, style);
  const result = optimize(source, {
    plugins: ['cleanupNumericValues', 'sortAttrs'],
    js2svg: { pretty: true, indent: 2 },
  }).data;
  const after = parseSvg(result, style);
  assert(
    JSON.stringify(before.parts) === JSON.stringify(after.parts),
    'Optimization changed stable parts',
  );
  return result;
}

/** Derive a designated rectangular counter from the SVG itself, by named part. */
export function extractStrokeCutout(
  root: SvgNode,
  input: { part: string; minWidth: number; maxWidth: number },
) {
  assert(input && typeof input.part === 'string', 'Cutout requires a named part');
  const group = root.children.find((node) => node.attrs['data-part'] === input.part);
  assert(
    group && group.children.length === 1 && group.children[0].tag === 'path',
    'Cutout part must contain one compound path',
  );
  const subpaths = group.children[0].attrs.d.trim().split(/(?=[Mm])/);
  assert(
    subpaths.length === 2 && subpaths.every((path) => path.startsWith('M')),
    'Cutout requires two absolute closed subpaths',
  );
  const candidates = subpaths
    .map((path) => {
      const commands = pathParser.makeAbsolute(pathParser.parseSVG(path));
      if (
        commands.length !== 5 ||
        commands[0].command !== 'moveto' ||
        commands.at(-1)?.command !== 'closepath'
      )
        return undefined;
      if (
        !commands
          .slice(1, -1)
          .every((command) =>
            ['lineto', 'horizontal lineto', 'vertical lineto'].includes(command.command),
          )
      )
        return undefined;
      const points = commands.slice(0, -1).map((command) => ({ x: command.x, y: command.y }));
      const xs = [...new Set(points.map((point) => point.x))].sort((a, b) => a - b);
      const ys = [...new Set(points.map((point) => point.y))].sort((a, b) => a - b);
      if (
        xs.length !== 2 ||
        ys.length !== 2 ||
        new Set(points.map((point) => `${point.x},${point.y}`)).size !== 4
      )
        return undefined;
      if (
        !points.every(
          (point, index) =>
            point.x === points[(index + 1) % 4].x || point.y === points[(index + 1) % 4].y,
        )
      )
        return undefined;
      return {
        path,
        left: xs[0],
        right: xs[1],
        centerY: (ys[0] + ys[1]) / 2,
        defaultWidth: Math.round((ys[1] - ys[0]) * 1e9) / 1e9,
      };
    })
    .filter((value) => value !== undefined);
  assert(candidates.length === 1, 'Cutout requires one unambiguous rectangular counter');
  const counter = candidates[0];
  assert(counter.right > counter.left && counter.defaultWidth > 0, 'Invalid cutout dimensions');
  assert(
    number(input.minWidth) &&
      number(input.maxWidth) &&
      input.minWidth > 0 &&
      input.minWidth <= counter.defaultWidth &&
      input.maxWidth >= counter.defaultWidth &&
      input.maxWidth <= 6,
    'Invalid cutout width bounds',
  );
  const outerPath = subpaths.find((path) => path !== counter.path)!;
  assert(
    pathParser.parseSVG(outerPath).at(-1)?.command === 'closepath',
    'Cutout outer contour must be closed',
  );
  return {
    part: input.part,
    outerPath: outerPath.trim(),
    left: counter.left,
    right: counter.right,
    centerY: counter.centerY,
    defaultWidth: counter.defaultWidth,
    minWidth: input.minWidth,
    maxWidth: input.maxWidth,
  };
}
