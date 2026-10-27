import { expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import pathParser from 'svg-path-parser';
import { parseSvg } from '../../tools/model.js';

const references = [
  ['', 'outline', 'a75a85cb335043bb436a001258d28a8c3f4bb7aa4996f9c9392ef4ca69673f5a'],
  ['filled/', 'filled', '7dac46d8701f3335b6f41329503a987d241223a0aded8b1d33ac6149db7a2a88'],
] as const;

for (const [directory, style, originalHash] of references)
  it(`preserves the former ${style} Copy exactly as New Window and reflects the revised Copy`, async () => {
    const file = (name: string) => new URL(`../../icons/${directory}${name}.svg`, import.meta.url);
    const preserved = await readFile(file('new-window'));
    expect(createHash('sha256').update(preserved).digest('hex')).toBe(originalHash);
    const original = parseSvg(preserved.toString(), style).root;
    const mirrored = parseSvg(await readFile(file('copy'), 'utf8'), style).root;
    expect(mirrored.attrs).toEqual(original.attrs);
    expect(mirrored.children.map((group) => group.attrs['data-part'])).toEqual(['back', 'front']);
    for (let group = 0; group < original.children.length; group++) {
      const before = pathParser.makeAbsolute(
        pathParser.parseSVG(original.children[group].children[0].attrs.d),
      );
      const after = pathParser.makeAbsolute(
        pathParser.parseSVG(mirrored.children[group].children[0].attrs.d),
      );
      expect(after).toHaveLength(before.length);
      before.forEach((command, index) => {
        const old = command as unknown as Record<string, unknown>;
        const actual = after[index] as unknown as Record<string, unknown>;
        expect(actual.code).toBe(old.code);
        for (const key of ['x', 'x0', 'x1', 'x2'])
          if (typeof old[key] === 'number' && !(key === 'x0' && index === 0))
            expect(actual[key]).toBeCloseTo(24 - (old[key] as number), 7);
        for (const key of ['y', 'y0', 'y1', 'y2', 'rx', 'ry'])
          if (typeof old[key] === 'number') expect(actual[key]).toBeCloseTo(old[key] as number, 7);
        if (old.command === 'elliptical arc') {
          expect(actual.xAxisRotation).toBeCloseTo(-(old.xAxisRotation as number), 7);
          expect(actual.sweep).toBe(!old.sweep);
          expect(actual.largeArc).toBe(old.largeArc);
        }
      });
    }
    const front = (root: typeof original) =>
      pathParser.makeAbsolute(pathParser.parseSVG(root.children[1].children[0].attrs.d));
    const xs = (root: typeof original) => front(root).map((command) => command.x);
    expect((Math.min(...xs(original)) + Math.max(...xs(original))) / 2).toBeGreaterThan(12);
    expect((Math.min(...xs(mirrored)) + Math.max(...xs(mirrored))) / 2).toBeLessThan(12);
    for (const name of ['copy', 'new-window']) {
      const metadata = JSON.parse(
        await readFile(new URL(`../../icons/${directory}${name}.json`, import.meta.url), 'utf8'),
      );
      expect(metadata.review.status).toBe('draft');
      if (name === 'copy')
        expect(
          metadata.reviewHistory.some((review: { status: string }) => review.status === 'approved'),
        ).toBe(true);
      else expect(metadata.reviewHistory).toBeUndefined();
    }
  });
