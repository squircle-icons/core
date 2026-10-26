import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import { parseSvg, optimizeSvg, validateMotion, extractStrokeCutout } from '../../tools/model.js';
import { loadSources } from '../../tools/validate.js';
import { createMotionController } from '../../src/controller.js';

const source = await readFile(new URL('../../icons/folder.svg', import.meta.url), 'utf8');
const motion = JSON.parse(
  await readFile(new URL('../../motions/folder.json', import.meta.url), 'utf8'),
);
const bell = JSON.parse(
  await readFile(new URL('../../motions/bell.json', import.meta.url), 'utf8'),
);

describe('single-source artwork pipeline', () => {
  it('validates the six originals and their motion references', async () => {
    const icons = await loadSources();
    expect(icons.map((icon) => icon.name)).toEqual([
      'bell',
      'camera',
      'folder',
      'heart',
      'search',
      'settings',
    ]);
    expect(icons.filter((icon) => icon.motion)).toHaveLength(2);
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

describe('motion recipe contracts', () => {
  it('rejects missing targets', () =>
    expect(() => validateMotion(motion, ['body'], 'folder')).toThrow('Unknown motion part'));
  it.each([NaN, Infinity, -1, 0, 20000])('rejects duration %s', (duration) =>
    expect(() => validateMotion({ ...motion, duration }, ['body', 'lid'], 'folder')).toThrow(
      'duration',
    ),
  );
  it.each(['cubic-bezier(1)', 'cubic-bezier(2, 0, 0, 1)', 'cubic-bezier(0, NaN, 1, 1)'])(
    'rejects invalid easing %s',
    (easing) =>
      expect(() => validateMotion({ ...motion, easing }, ['lid'], 'folder')).toThrow('easing'),
  );
  it('rejects an absent initial state', () =>
    expect(() => validateMotion({ ...motion, initial: 'missing' }, ['lid'], 'folder')).toThrow(
      'initial',
    ));
  it('rejects non-finite transforms and incomplete state poses', () => {
    const broken = structuredClone(motion);
    broken.states.open.lid.transform = 'rotate(Infinitydeg)';
    expect(() => validateMotion(broken, ['lid'], 'folder')).toThrow('transform');
    broken.states.open = {};
    expect(() => validateMotion(broken, ['lid'], 'folder')).toThrow('Every state');
  });
  it('requires pulse endpoints to return to rest', () => {
    const broken = structuredClone(bell);
    broken.tracks[0].keyframes.at(-1).transform = 'rotate(10deg)';
    expect(() => validateMotion(broken, ['body', 'clapper'], 'bell')).toThrow('rest');
  });
  it('rejects out-of-order offsets and duplicate tracks', () => {
    const broken = structuredClone(bell);
    broken.tracks[0].keyframes[2].offset = -1;
    expect(() => validateMotion(broken, ['body', 'clapper'], 'bell')).toThrow('offset');
    broken.tracks[0] = structuredClone(broken.tracks[1]);
    expect(() => validateMotion(broken, ['body', 'clapper'], 'bell')).toThrow('duplicate');
  });
  it('imports core in a Node environment without DOM globals', () => {
    expect(typeof window).toBe('undefined');
    expect(typeof createMotionController).toBe('function');
  });
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
    'settings',
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
