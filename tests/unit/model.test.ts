import { expect, it } from 'vitest';
import { parseSvg, validateIconName } from '../../tools/model.js';
import { loadSources } from '../../tools/validate.js';
import { FIGMA_STUDY_ICONS } from '../../src/design/figma-catalog.js';
const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L22 22" stroke="currentColor" stroke-width="1.5"/></svg>';
it('promotes all 94 source pairs with exact geometry and review status', async () => {
  const icons = await loadSources();
  expect(icons).toHaveLength(94);
  const paths = (node: any): string[] => [
    ...(node.tag === 'path' ? [node.attrs.d] : []),
    ...node.children.flatMap(paths),
  ];
  for (const icon of icons) {
    const original = FIGMA_STUDY_ICONS.find((source) => source.id === icon.name)!;
    expect(icon.metadata.review.status).toBe(original.status);
    for (const style of ['outline', 'filled'] as const) {
      const root = style === 'outline' ? icon.root : icon.filled.root;
      expect(paths(root)).toEqual([...original[style].matchAll(/\bd="([^"]+)"/g)].map((m) => m[1]));
      expect(JSON.stringify(root)).not.toMatch(/clipPath|"id"|clip-path/);
      expect(root.attrs.overflow).toBe('hidden');
    }
  }
});
it.each([
  svg.replace('<path', '<script'),
  svg.replace('stroke="currentColor"', 'onclick="alert(1)"'),
  svg.replace('stroke="currentColor"', 'stroke="url(https://example.com)"'),
  svg.replace('M2 2L22 22', 'M0 0L1e999 1'),
  svg.replace('stroke-width="1.5"', 'stroke-width="NaN"'),
  svg.replace('viewBox="0 0 24 24"', 'viewBox="0 0 32 32"'),
  svg.replace('<path', '<g clip-path="url(#unknown)"><path').replace('</svg>', '</g></svg>'),
  '<!DOCTYPE svg>' + svg,
  svg.replace('</svg>', '<foreignObject/></svg>'),
  svg.replace('<path', '<path transform="rotate(20)"'),
])('rejects unsafe or unsupported source %s', (source) => expect(() => parseSvg(source)).toThrow());
it('validates full-viewport clips before removing redundant definitions', () => {
  const clipped = svg
    .replace('<path', '<g clip-path="url(#c)"><path')
    .replace(
      '</svg>',
      '</g><defs><clipPath id="c"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>',
    );
  expect(parseSvg(clipped).root.attrs.overflow).toBe('hidden');
  expect(() => parseSvg(clipped.replace('<rect width="24"', '<rect width="12"'))).toThrow(
    'viewport',
  );
});
it.each(['../camera', 'Bad Name', 'camera_', 'camera/other'])(
  'rejects unsafe icon names %s',
  (name) => expect(() => validateIconName(name)).toThrow(),
);
