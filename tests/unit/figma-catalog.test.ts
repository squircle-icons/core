import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { expect, it } from 'vitest';
import { FIGMA_STUDY_ICONS } from '../../src/design/figma-catalog.js';

it('contains every current Figma identity once, with both styles and source references', () => {
  expect(FIGMA_STUDY_ICONS).toHaveLength(81);
  expect(new Set(FIGMA_STUDY_ICONS.map((icon) => icon.id)).size).toBe(81);
  expect(new Set(FIGMA_STUDY_ICONS.map((icon) => icon.group)).size).toBe(11);
  for (const icon of FIGMA_STUDY_ICONS) {
    expect(icon.baseStroke).toBe(1.5);
    expect(icon.figma.outline).toMatch(/^\d+:\d+$/);
    expect(icon.figma.filled).toMatch(/^\d+:\d+$/);
    for (const svg of [icon.outline, icon.filled]) {
      expect(svg).toContain('viewBox="0 0 24 24"');
      expect(svg).toContain('currentColor');
      expect(svg).not.toMatch(/NaN|Infinity|undefined|<(?:script|image|foreignObject)\b/);
      // White clipping rectangles define visibility, not painted patches.
      expect(svg.replace(/<defs>[\s\S]*?<\/defs>/g, '')).not.toMatch(
        /(?:fill|stroke)="(?:white|#fff(?:fff)?|black|#000(?:000)?)"/i,
      );
    }
  }
  expect(FIGMA_STUDY_ICONS.some((icon) => (icon.id as string) === 'home-eaves')).toBe(false);
});

it('retains the exact source hashes and literal path coordinates through paint normalization', async () => {
  const manifest = JSON.parse(
    await readFile(new URL('../../icons/figma-study/manifest.json', import.meta.url), 'utf8'),
  );
  for (const record of manifest.records) {
    const source = await readFile(new URL(`../../${record.source}`, import.meta.url), 'utf8');
    expect(createHash('sha256').update(source).digest('hex')).toBe(record.sha256);
    const output = FIGMA_STUDY_ICONS.find((icon) => icon.id === record.id)![
      record.style as 'outline' | 'filled'
    ];
    const paths = (svg: string) => [...svg.matchAll(/\bd="([^"]+)"/g)].map((m) => m[1]);
    expect(paths(output)).toEqual(paths(source));
  }
});

it('records authored outline exceptions without pretending fill-only geometry is an editable stroke', () => {
  expect(FIGMA_STUDY_ICONS.filter((icon) => !icon.adjustableStroke).map((icon) => icon.id)).toEqual(
    ['heart', 'pen'],
  );
  for (const id of ['sun', 'moon', 'menu', 'plus', 'minus', 'x', 'maximize', 'minimize']) {
    const icon = FIGMA_STUDY_ICONS.find((entry) => entry.id === id)!;
    expect(icon.adjustableStroke).toBe(true);
    expect(icon.outline).toContain('stroke-width="1.5"');
  }
});
