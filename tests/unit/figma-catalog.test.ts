import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { expect, it } from 'vitest';
import { FIGMA_STUDY_ICONS } from '../../src/design/figma-catalog.js';

it('connects marked seams while retaining the owner body and detail masters', () => {
  const paths = (id: string) =>
    [...FIGMA_STUDY_ICONS.find((icon) => icon.id === id)!.outline.matchAll(/<path\b[^>]*>/g)].map(
      (match) => match[0],
    );
  const hash = (tag: string) =>
    createHash('sha256')
      .update(tag.match(/\bd="([^"]+)"/)![1])
      .digest('hex');
  const mail = paths('mail');
  const wallet = paths('wallet');
  const shop = paths('shop');
  expect(hash(mail[0])).toBe('6d98d5a90de0024baaf748c4fdbd31febd21cbb14fe4eec1c9953e2f5099ab0f');
  expect(hash(wallet[0])).toBe('fc8a9df134c0b16b46515d7a9434245ef0ced06c092953754a63049e40cf0f46');
  expect(hash(wallet[2])).toBe('8c2a74b13e40388df0f8b5e53a6467044a34a1d53602dfb83742a10d0169fd8b');
  expect(hash(shop[0])).toBe(hash(paths('home-door')[0]));
  expect(hash(shop[1])).toBe('304f503a0ad77b73dbe1ca8a9a3f8c702e68398ae983f0f6f1277b42a0897a32');
  // Terminals meet the actual body/awning centerlines. Butt ends stay inside
  // that shared ribbon instead of poking through it with an extra round cap.
  expect(mail[1]).toContain('M3.41064 7.23944');
  expect(mail[1]).toContain('C6.05 9.5 9 11.32 11.5 12.72');
  expect(mail[1]).toContain('C11.8333 12.9067 12.1667 12.9067 12.5 12.72');
  expect(mail[1]).toContain('20.5893 7.23946');
  expect(wallet[1]).toContain('M21.1923 9.5');
  expect(wallet[1]).toContain('H21.1923');
  for (const seam of [mail[1], wallet[1]]) expect(seam).not.toContain('stroke-linecap="round"');
  const filled = FIGMA_STUDY_ICONS.find((icon) => icon.id === 'shop')!.filled;
  expect([...filled.matchAll(/<path\b/g)]).toHaveLength(1);
});

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
