import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { expect, it } from 'vitest';
import { FIGMA_STUDY_ICONS } from '../../src/design/figma-catalog.js';
import pathParser from 'svg-path-parser';

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
  expect(hash(mail[0])).toBe('6d98d5a90de0024baaf748c4fdbd31febd21cbb14fe4eec1c9953e2f5099ab0f');
  expect(hash(wallet[0])).toBe('fc8a9df134c0b16b46515d7a9434245ef0ced06c092953754a63049e40cf0f46');
  expect(hash(wallet[2])).toBe('8c2a74b13e40388df0f8b5e53a6467044a34a1d53602dfb83742a10d0169fd8b');
  // Terminals meet the actual body/awning centerlines. Butt ends stay inside
  // that shared ribbon instead of poking through it with an extra round cap.
  expect(mail[1]).toContain('M3.41064 7.23944');
  expect(mail[1]).toContain('C6.05 9.5 9 11.32 11.5 12.72');
  expect(mail[1]).toContain('C11.8333 12.9067 12.1667 12.9067 12.5 12.72');
  expect(mail[1]).toContain('20.5893 7.23946');
  expect(wallet[1]).toContain('M21.1923 9.5');
  expect(wallet[1]).toContain('H21.1923');
  for (const seam of [mail[1], wallet[1]]) expect(seam).not.toContain('stroke-linecap="round"');
});

it('contains every current Figma identity once, with both styles and source references', () => {
  expect(FIGMA_STUDY_ICONS).toHaveLength(94);
  expect(new Set(FIGMA_STUDY_ICONS.map((icon) => icon.id)).size).toBe(94);
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

it('adds lower folds as a separate Mail identity while retaining its base paths', () => {
  const paths = (id: string) =>
    [...FIGMA_STUDY_ICONS.find((icon) => icon.id === id)!.outline.matchAll(/\bd="([^"]+)"/g)].map(
      (match) => match[1],
    );
  const mail = paths('mail'),
    folded = paths('mail-fold');
  expect(folded.slice(0, 2)).toEqual(mail);
  expect(folded).toHaveLength(3);
  expect(folded[2].match(/M/g)).toHaveLength(2);
  const lower = pathParser.makeAbsolute(pathParser.parseSVG(folded[2]));
  const junctions = [
    [4.18375, 17.7038],
    [8.49679784, 10.94092783],
    [15.50320216, 10.94092783],
    [19.8162, 17.7038],
  ];
  // Native Figma export rounds the authored intersections. The same declared
  // .0002 export tolerance applies to the connection, not a new design offset.
  lower.forEach((point, i) =>
    expect(Math.hypot(point.x - junctions[i][0], point.y - junctions[i][1])).toBeLessThan(0.0002),
  );
});
