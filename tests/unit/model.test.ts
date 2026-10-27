import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import { parseSvg, optimizeSvg, extractStrokeCutout, validateIconName } from '../../tools/model.js';
import { loadSources } from '../../tools/validate.js';

const source = await readFile(new URL('../../icons/folder.svg', import.meta.url), 'utf8');
describe('single-source artwork pipeline', () => {
  it('validates the original collection', async () => {
    const icons = await loadSources();
    expect(icons.map((icon) => icon.name)).toEqual([
      'arrow-down-left',
      'arrow-down-right',
      'arrow-down',
      'arrow-left',
      'arrow-right',
      'arrow-up-left',
      'arrow-up-right',
      'arrow-up',
      'bell',
      'camera',
      'check',
      'chevron-down-left',
      'chevron-down-right',
      'chevron-down',
      'chevron-left',
      'chevron-right',
      'chevron-up-left',
      'chevron-up-right',
      'chevron-up',
      'copy',
      'download',
      'folder',
      'heart',
      'menu',
      'moon',
      'plus',
      'search',
      'settings',
      'sun',
      'trash',
      'upload',
      'x',
    ]);
  });
  it('preserves part names and geometry during conservative optimization', () => {
    const optimized = optimizeSvg(source);
    expect(parseSvg(optimized)).toEqual(parseSvg(source));
    expect(optimizeSvg(source)).toBe(optimized);
  });
  it.each([
    ['malformed XML', source.replace('</svg>', '')],
    ['active content', source.replace('</svg>', '<script>alert(1)</script></svg>')],
    [
      'external resources',
      source.replace(
        '<g data-part="body">',
        '<g data-part="body" href="https://example.org/art.svg">',
      ),
    ],
    ['duplicate parts', source.replace('data-part="lid"', 'data-part="body"')],
    ['unnamed parts', source.replace('data-part="lid"', 'class="lid"')],
    ['invalid viewBox', source.replace('0 0 24 24', '0 0 NaN 24')],
    ['invalid path', source.replace(/<path d="[^"]*"/, '<path d="M invalid"')],
    ['entities', '<!DOCTYPE svg [<!ENTITY test "x">]>' + source],
    ['unsupported text', source.replace('</svg>', '<text>hello</text></svg>')],
    [
      'negative circle radius',
      source.replace('<g data-part="lid">', '<g data-part="lid"><circle cx="12" cy="12" r="-1"/>'),
    ],
  ])('rejects %s', (_, svg) => expect(() => parseSvg(svg)).toThrow());
});

describe('filled artwork pipeline', () => {
  it('preserves compound cutouts and named parts through optimization', async () => {
    const source = await readFile(
      new URL('../../icons/filled/folder.svg', import.meta.url),
      'utf8',
    );
    expect(parseSvg(optimizeSvg(source, 'filled'), 'filled')).toEqual(parseSvg(source, 'filled'));
    const icons = await loadSources();
    expect(icons.find((icon) => icon.name === 'folder')?.filled?.parts).toEqual(['body']);
    expect(() => parseSvg(source)).toThrow('unfilled');
    expect(() =>
      parseSvg(source.replace('stroke="none"', 'stroke="currentColor"'), 'filled'),
    ).toThrow('without stroke');
    expect(() =>
      parseSvg(source.replace('fill-rule="evenodd"', 'fill-rule="invalid"'), 'filled'),
    ).toThrow('winding');
    expect(() =>
      parseSvg(source.replace('</svg>', '<script>alert(1)</script></svg>'), 'filled'),
    ).toThrow();
  });
});

it('derives adjustable negative-space geometry by part and rejects invalid targets or widths', async () => {
  const svg = parseSvg(
    await readFile(new URL('../../icons/filled/folder.svg', import.meta.url), 'utf8'),
    'filled',
  );
  const config = { part: 'body', minWidth: 0.25, maxWidth: 6 };
  expect(extractStrokeCutout(svg.root, config)).toMatchObject({
    left: 4.76980874,
    right: 19.23019126,
    centerY: 10.90300546,
    defaultWidth: 1.75,
  });
  expect(() => extractStrokeCutout(svg.root, { ...config, part: 'missing' })).toThrow(
    'Cutout part',
  );
  expect(() => extractStrokeCutout(svg.root, { ...config, maxWidth: Infinity })).toThrow('bounds');
  expect(() => extractStrokeCutout(svg.root, { ...config, minWidth: 2 })).toThrow('bounds');
});

it('available filled sources preserve named parts and original geometry through optimization', async () => {
  const icons = await loadSources();
  expect(icons.filter((icon) => icon.filled).map((icon) => icon.name)).toEqual([
    'arrow-down-left',
    'arrow-down-right',
    'arrow-down',
    'arrow-left',
    'arrow-right',
    'arrow-up-left',
    'arrow-up-right',
    'arrow-up',
    'bell',
    'camera',
    'check',
    'chevron-down-left',
    'chevron-down-right',
    'chevron-down',
    'chevron-left',
    'chevron-right',
    'chevron-up-left',
    'chevron-up-right',
    'chevron-up',
    'copy',
    'download',
    'folder',
    'heart',
    'menu',
    'moon',
    'plus',
    'search',
    'settings',
    'sun',
    'trash',
    'upload',
    'x',
  ]);
  expect(icons.find((icon) => icon.name === 'search')?.filled).toBeDefined();
  for (const icon of icons.filter((icon) => icon.filled)) {
    const source = await readFile(
      new URL(`../../icons/filled/${icon.name}.svg`, import.meta.url),
      'utf8',
    );
    expect(parseSvg(optimizeSvg(source, 'filled'), 'filled')).toEqual(parseSvg(source, 'filled'));
    expect(icon.filled?.parts.length).toBeGreaterThan(0);
  }
});

it.each(['foo-', 'foo--bar', '-foo', '../camera', 'Camera'])(
  'rejects invalid icon name %s',
  (name) => {
    expect(() => validateIconName(name)).toThrow('Invalid icon name');
  },
);
it.each(['camera', 'chevron-down', 'camera-2'])('accepts icon name %s', (name) => {
  expect(() => validateIconName(name)).not.toThrow();
});
it('rejects empty artwork even when it has a named group', () => {
  const empty = source.replace(/<path[^>]*\/>/g, '');
  expect(() => parseSvg(empty)).toThrow('at least one shape');
});
it('preserves small and precise circle geometry during optimization', () => {
  const precise = source.replace(
    '<g data-part="body">',
    '<g data-part="body"><circle cx="1.23456789" cy="2.34567891" r="0.0001"/>',
  );
  expect(parseSvg(optimizeSvg(precise))).toEqual(parseSvg(precise));
});

it.each(['', '0x10', '0b10', '4px', '1e999'])('rejects non-SVG circle coordinate %s', (cx) => {
  const invalid = source.replace(
    '<g data-part="body">',
    `<g data-part="body"><circle cx="${cx}" cy="12" r="1"/>`,
  );
  expect(() => parseSvg(invalid)).toThrow('circle geometry');
});

it('validates Square and Circle frame sources with the identical standalone arrow glyph', async () => {
  const icons = await loadSources();
  const arrows = icons.filter((icon) => /^(arrow|chevron)-/.test(icon.name));
  expect(arrows).toHaveLength(16);
  for (const icon of arrows) {
    expect(Object.keys(icon.frames!)).toEqual(['square', 'circle']);
    for (const frame of Object.values(icon.frames!)) {
      expect(frame!.root.children[0].children[1].attrs.d).toBe(
        icon.root.children[0].children[0].attrs.d,
      );
      expect(frame!.metadata.review?.status).toBe('draft');
      expect(frame!.filled.root.attrs.stroke).toBe('none');
    }
  }
  expect(icons.filter((icon) => icon.frames)).toHaveLength(16);
});
