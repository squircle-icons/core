import { createHash } from 'node:crypto';
import pathParser from 'svg-path-parser';
import { expect, it } from 'vitest';
import { prototypeStudy } from '../../src/design/squircle-base.js';

it('preserves the owner-accepted Balanced Folder lower curves while its upper silhouette changes', () => {
  const expected = {
    outline: '3dcabebc880ce9991eee32c5e1dfd8e7b2cccec98c2b7433d461c8adbcc3e393',
    filled: '922ea45a2cb195ec283b304303f0281fe82a1486c161e5be62186fc5b78c141d',
  };
  const shape = prototypeStudy('folder', 3.2);
  for (const style of ['outline', 'filled'] as const) {
    // The start point and first64 cubics are the retained lower half of our Square.
    const lower = pathParser.makeAbsolute(pathParser.parseSVG(shape[style])).slice(0, 65);
    expect(lower).toHaveLength(65);
    expect(lower.slice(1).every((command) => command.code === 'C')).toBe(true);
    // Preserve the accepted curves while permitting uniform optical recentering.
    const relativeY = (value: number) => Number((value - lower[0].y).toFixed(7));
    const coordinates = lower.map((command) => [
      command.code,
      command.x,
      relativeY(command.y),
      'x1' in command ? command.x1 : null,
      'y1' in command ? relativeY(command.y1) : null,
      'x2' in command ? command.x2 : null,
      'y2' in command ? relativeY(command.y2) : null,
    ]);
    expect(createHash('sha256').update(JSON.stringify(coordinates)).digest('hex')).toBe(
      expected[style],
    );
  }
});
