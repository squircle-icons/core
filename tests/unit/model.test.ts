import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import { parseSvg, optimizeSvg, extractStrokeCutout } from '../../tools/model.js';
import { loadSources } from '../../tools/validate.js';

const source = await readFile(new URL('../../icons/folder.svg', import.meta.url), 'utf8');
describe('single-source artwork pipeline', () => {
  it('validates the original collection', async () => {
    const icons = await loadSources();
    expect(icons.map((icon) => icon.name)).toEqual([
      'bell',
      'camera',
      'folder',
      'heart',
      'moon',
      'search',
      'settings',
      'sun',
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
    left: 4.75,
    right: 19.25,
    centerY: 10.9,
    defaultWidth: 1.7,
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
    'bell',
    'camera',
    'folder',
    'heart',
    'moon',
    'settings',
    'sun',
  ]);
  expect(icons.find((icon) => icon.name === 'search')?.filled).toBeUndefined();
  for (const icon of icons.filter((icon) => icon.filled)) {
    const source = await readFile(
      new URL(`../../icons/filled/${icon.name}.svg`, import.meta.url),
      'utf8',
    );
    expect(parseSvg(optimizeSvg(source, 'filled'), 'filled')).toEqual(parseSvg(source, 'filled'));
    expect(icon.filled?.parts.length).toBeGreaterThan(0);
  }
});
