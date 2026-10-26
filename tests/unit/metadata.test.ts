import { expect, it } from 'vitest';
import { validateMetadata } from '../../tools/validate.js';

const valid = {
  name: 'camera',
  description: 'Camera',
  authorship: 'Original artwork',
  construction: 'A rounded camera body',
  tags: ['photo'],
};

for (const field of ['description', 'authorship', 'construction'])
  it.each([42, {}, true, '', '   ', null])(`rejects invalid ${field}: %s`, (value) => {
    expect(() => validateMetadata({ ...valid, [field]: value }, 'camera')).toThrow(
      'Invalid metadata',
    );
  });
it.each([
  null,
  [],
  'camera',
  42,
  { ...valid, name: 'folder' },
  { ...valid, tags: [1] },
  { ...valid, tags: [{}] },
  { ...valid, tags: [''] },
  { ...valid, tags: ['   '] },
  { ...valid, tags: 'photo' },
])('rejects malformed metadata or non-string tags: %s', (metadata) => {
  expect(() => validateMetadata(metadata, 'camera')).toThrow('Invalid metadata');
});
it.each(['approved', 'draft'])(
  'preserves explicit review status %s and optional fields',
  (status) => {
    const metadata = {
      ...valid,
      review: { status, note: 'Recorded review' },
      strokeWidthCutout: { part: 'body', minWidth: 0.25, maxWidth: 6 },
      custom: 'retained',
    };
    expect(validateMetadata(metadata, 'camera')).toBe(metadata);
  },
);
it.each([null, 'approved', [], {}, { status: 'published' }, { status: 1 }])(
  'rejects invalid review status: %s',
  (review) => {
    expect(() => validateMetadata({ ...valid, review }, 'camera')).toThrow('Invalid metadata');
  },
);
it('keeps absent review metadata absent without inventing approval', () => {
  expect(validateMetadata(valid, 'camera')).toBe(valid);
  expect(valid).not.toHaveProperty('review');
});
