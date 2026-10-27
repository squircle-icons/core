import { createHash } from 'node:crypto';
import { expect, it } from 'vitest';
import { DEFAULT_ROUNDNESS, STUDY_STROKE, squircleStudy } from '../../src/design/squircle-base.js';

it('preserves the exact owner-accepted Balanced Square while object tops are revised', () => {
  expect(DEFAULT_ROUNDNESS).toBe(3.2);
  expect(STUDY_STROKE).toBe(1.5);
  const shape = squircleStudy();
  const digest = (path: string) => createHash('sha256').update(path).digest('hex');
  expect(digest(shape.outline)).toBe(
    '47ad9356ed5eda66493e72216107ecb419709e5eedc57f88341524277e5aa38d',
  );
  expect(digest(shape.filled)).toBe(
    '742b00eeb969e52f40f583adefa7fe0273183a3c3871815d529a3700b621e9d4',
  );
});
