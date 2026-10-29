import { XMLParser, XMLValidator } from 'fast-xml-parser';
import pathParser from 'svg-path-parser';

export type SvgNode = { tag: string; attrs: Record<string, string>; children: SvgNode[] };
const attributes: Record<string, readonly string[]> = {
  svg: ['xmlns', 'viewBox', 'width', 'height', 'fill'],
  g: ['id', 'transform', 'clip-path'],
  path: [
    'id',
    'd',
    'fill',
    'stroke',
    'stroke-width',
    'stroke-linecap',
    'stroke-linejoin',
    'fill-rule',
    'clip-rule',
  ],
  defs: [],
  clipPath: ['id'],
  rect: ['width', 'height', 'fill'],
};
function assert(value: unknown, message: string): asserts value {
  if (!value) throw new Error(message);
}
export function validateIconName(name: string) {
  assert(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name), `Invalid icon name: ${name}`);
}

/** Validate native source paint; replace redundant full-viewport clips with root overflow. */
export function parseSvg(source: string): { root: SvgNode; parts: string[] } {
  assert(!/<!|<\?|&/.test(source), 'Declarations and entities are unsupported');
  assert(XMLValidator.validate(source) === true, 'Malformed SVG XML');
  const parsed = new XMLParser({
    preserveOrder: true,
    ignoreAttributes: false,
    attributeNamePrefix: '',
    trimValues: true,
  }).parse(source);
  const ids = new Set<string>();
  const clips = new Set<string>();
  let shapes = 0;
  const convert = (entry: Record<string, any>, parent?: string, transformed = false): SvgNode => {
    const tag = Object.keys(entry).find((key) => key !== ':@')!;
    assert(Object.hasOwn(attributes, tag), `Unsupported SVG element: ${tag}`);
    assert(parent ? tag !== 'svg' : tag === 'svg', 'Expected a single SVG root');
    const attrs = { ...(entry[':@'] ?? {}) } as Record<string, string>;
    for (const key of Object.keys(attrs))
      assert(attributes[tag].includes(key), `Unsupported attribute: ${key}`);
    if (attrs.id) {
      assert(
        /^[a-zA-Z_][\w:.-]*$/.test(attrs.id) && !ids.has(attrs.id),
        'Invalid or duplicate SVG id',
      );
      ids.add(attrs.id);
    }
    if (tag === 'svg') {
      assert(
        attrs.xmlns === 'http://www.w3.org/2000/svg' && attrs.viewBox === '0 0 24 24',
        'Expected native SVG viewport',
      );
      assert(
        attrs.width === '24' && attrs.height === '24' && attrs.fill === 'none',
        'Expected native size and paint',
      );
    }
    if (tag === 'defs') assert(parent === 'svg', 'Definitions must belong to the root');
    if (tag === 'clipPath')
      assert(parent === 'defs' && attrs.id, 'Unsupported clipping definition');
    if (tag === 'rect')
      assert(
        parent === 'clipPath' &&
          attrs.width === '24' &&
          attrs.height === '24' &&
          attrs.fill === 'white',
        'Only a full-viewport clip rectangle is supported',
      );
    if (tag === 'path') {
      assert(typeof attrs.d === 'string', 'Path requires geometry');
      const commands = pathParser.parseSVG(attrs.d);
      assert(
        commands.length > 1 && commands[0].code.toUpperCase() === 'M',
        'Invalid path geometry',
      );
      for (const command of commands)
        for (const value of Object.values(command))
          if (typeof value === 'number') assert(Number.isFinite(value), 'Non-finite path geometry');
      shapes++;
    }
    if (attrs.transform) {
      assert(
        /^translate\(-?\d+(?:\.\d+)? -?\d+(?:\.\d+)?\)$/.test(attrs.transform),
        'Unsupported source transform',
      );
      assert(
        attrs.transform.match(/-?\d+(?:\.\d+)?/g)!.every((n) => Number.isFinite(Number(n))),
        'Invalid transform',
      );
    }
    if (attrs['clip-path'])
      assert(
        parent === 'svg' &&
          !transformed &&
          !attrs.transform &&
          /^url\(#[\w:.-]+\)$/.test(attrs['clip-path']),
        'Only root-aligned viewport clipping is supported',
      );
    for (const key of ['fill', 'stroke'])
      if (attrs[key] !== undefined && tag !== 'rect')
        assert(['none', 'currentColor'].includes(attrs[key]), 'Unsupported paint');
    if (attrs['stroke-width'] !== undefined)
      assert(
        /^\d+(?:\.\d+)?$/.test(attrs['stroke-width']) &&
          Number.isFinite(Number(attrs['stroke-width'])) &&
          Number(attrs['stroke-width']) > 0,
        'Invalid stroke width',
      );
    for (const key of ['fill-rule', 'clip-rule'])
      if (attrs[key] !== undefined)
        assert(['evenodd', 'nonzero'].includes(attrs[key]), 'Invalid winding rule');
    if (attrs['stroke-linecap'])
      assert(['round', 'butt', 'square'].includes(attrs['stroke-linecap']), 'Invalid line cap');
    if (attrs['stroke-linejoin'])
      assert(['round', 'miter', 'bevel'].includes(attrs['stroke-linejoin']), 'Invalid line join');
    assert(Array.isArray(entry[tag]), 'Unexpected SVG content');
    const children = entry[tag].map((node: any) =>
      convert(node, tag, transformed || Boolean(attrs.transform)),
    );
    if (tag === 'path' || tag === 'rect')
      assert(children.length === 0, 'Shapes cannot contain children');
    if (tag === 'clipPath') {
      assert(children.length === 1 && children[0].tag === 'rect', 'Unsupported clip shape');
      clips.add(attrs.id);
    }
    if (tag === 'defs')
      assert(
        children.length > 0 && children.every((child: SvgNode) => child.tag === 'clipPath'),
        'Unsupported definitions',
      );
    return { tag, attrs, children };
  };
  assert(parsed.length === 1, 'Expected one SVG root');
  const root = convert(parsed[0]);
  assert(shapes > 0, 'Expected at least one shape');
  const clean = (node: SvgNode): SvgNode => {
    const attrs = { ...node.attrs };
    if (attrs['clip-path'])
      assert(clips.has(attrs['clip-path'].slice(5, -1)), 'Unknown clip reference');
    delete attrs.id;
    delete attrs['clip-path'];
    return {
      tag: node.tag,
      attrs,
      children: node.children.filter((child) => child.tag !== 'defs').map(clean),
    };
  };
  const drawing = clean(root);
  drawing.attrs.overflow = 'hidden';
  drawing.children = [{ tag: 'g', attrs: { 'data-part': 'body' }, children: drawing.children }];
  return { root: drawing, parts: ['body'] };
}
