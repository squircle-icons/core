import { XMLParser, XMLValidator } from 'fast-xml-parser';
import pathParser from 'svg-path-parser';
import { optimize } from 'svgo';
import type { MotionRecipe } from '../src/types.js';

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

export function validateMotion(input: unknown, parts: string[], icon: string): MotionRecipe {
  const recipe = input as MotionRecipe;
  assert(recipe && recipe.icon === icon, 'Motion icon does not match source');
  assert(recipe.kind === 'state' || recipe.kind === 'pulse', 'Invalid motion kind');
  assert(
    number(recipe.duration) && recipe.duration > 0 && recipe.duration <= 10000,
    'Motion duration must be finite and bounded',
  );
  assert(
    typeof recipe.easing === 'string' &&
      /^(linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier\([\d., -]+\))$/.test(recipe.easing),
    'Invalid easing',
  );
  if (recipe.easing.startsWith('cubic-bezier(')) {
    const points = recipe.easing
      .slice(13, -1)
      .split(',')
      .map((value) => Number(value.trim()));
    assert(
      points.length === 4 &&
        points.every(Number.isFinite) &&
        points[0] >= 0 &&
        points[0] <= 1 &&
        points[2] >= 0 &&
        points[2] <= 1,
      'Invalid cubic-bezier easing',
    );
  }
  assert(recipe.states && recipe.initial in recipe.states, 'Missing initial motion state');
  assert(recipe.origins && Object.keys(recipe.origins).length > 0, 'Missing transform origins');
  for (const [part, origin] of Object.entries(recipe.origins)) {
    assert(parts.includes(part), `Unknown motion part: ${part}`);
    assert(number(origin.x) && number(origin.y), 'Invalid transform origin');
  }
  const style = (value: any) => {
    assert(
      value && typeof value.transform === 'string' && value.transform.length > 0,
      'Missing transform',
    );
    assert(
      /^(?:(?:rotate\(-?\d+(?:\.\d+)?deg\)|translate[XY]\(-?\d+(?:\.\d+)?px\)|scale[XY]\(-?\d+(?:\.\d+)?\))\s*)+$/.test(
        value.transform,
      ),
      'Unsupported or non-finite transform',
    );
    if (value.opacity !== undefined)
      assert(number(value.opacity) && value.opacity >= 0 && value.opacity <= 1, 'Invalid opacity');
  };
  const names = Object.keys(recipe.origins).sort();
  for (const pose of Object.values(recipe.states)) {
    assert(
      JSON.stringify(Object.keys(pose).sort()) === JSON.stringify(names),
      'Every state must define every moving part',
    );
    for (const value of Object.values(pose)) style(value);
  }
  if (recipe.kind === 'pulse') {
    assert(
      Array.isArray(recipe.tracks) && recipe.tracks.length === names.length,
      'Pulse requires one track per moving part',
    );
    const seen = new Set<string>();
    for (const track of recipe.tracks) {
      assert(
        names.includes(track.part) && !seen.has(track.part),
        'Unknown or duplicate track part',
      );
      seen.add(track.part);
      assert(track.keyframes.length >= 2, 'Track requires keyframes');
      let previous = -1;
      for (const frame of track.keyframes) {
        style(frame);
        assert(
          number(frame.offset) &&
            frame.offset >= previous &&
            frame.offset >= 0 &&
            frame.offset <= 1,
          'Invalid keyframe offset',
        );
        previous = frame.offset;
      }
      assert(
        track.keyframes[0].offset === 0 && track.keyframes.at(-1)?.offset === 1,
        'Track must cover complete duration',
      );
      for (const endpoint of [track.keyframes[0], track.keyframes.at(-1)!]) {
        const rest = recipe.states[recipe.initial][track.part];
        assert(
          endpoint.transform === rest.transform && endpoint.opacity === rest.opacity,
          'Pulse must start and end at rest',
        );
      }
    }
  } else assert(!recipe.tracks, 'State motion does not use pulse tracks');
  return recipe;
}
