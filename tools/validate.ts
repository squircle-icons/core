import { FIGMA_STUDY_ICONS } from '../src/design/figma-catalog.js';
import { parseSvg, validateIconName } from './model.js';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
export const root = fileURLToPath(new URL('../', import.meta.url));
export function validateMetadata(metadata: any, name: string) {
  if (
    !metadata ||
    typeof metadata !== 'object' ||
    Array.isArray(metadata) ||
    metadata.name !== name ||
    !['description', 'authorship', 'construction'].every(
      (field) => typeof metadata[field] === 'string' && metadata[field].trim().length > 0,
    ) ||
    !Array.isArray(metadata.tags) ||
    !metadata.tags.every((tag: unknown) => typeof tag === 'string' && tag.trim().length > 0) ||
    (metadata.supportsBold !== undefined && typeof metadata.supportsBold !== 'boolean') ||
    (metadata.review !== undefined &&
      (!metadata.review ||
        typeof metadata.review !== 'object' ||
        Array.isArray(metadata.review) ||
        !['approved', 'draft'].includes(metadata.review.status)))
  )
    throw new Error(`Invalid metadata: ${name}`);
  return metadata;
}

export async function loadSources() {
  return FIGMA_STUDY_ICONS.map((icon) => {
    validateIconName(icon.id);
    const metadata = validateMetadata(
      {
        name: icon.id,
        description: icon.label,
        tags: [icon.id, icon.label, icon.group],
        authorship: 'Original Squircle Icons artwork by the project owner.',
        construction: 'Native source SVG; path coordinates and authored paint preserved.',
        review: {
          status: icon.status,
          reviewedBy: icon.status === 'approved' ? 'owner' : 'pending',
          date: '2026-10-29',
          style: 'outline/filled',
          preview: { x: 100, y: 100, strokeWidth: icon.baseStroke },
          note: 'Publication does not change visual review status.',
        },
      },
      icon.id,
    );
    return {
      name: icon.id,
      label: icon.label,
      group: icon.group,
      baseStroke: icon.baseStroke,
      adjustableStroke: icon.adjustableStroke,
      figma: icon.figma,
      metadata,
      ...parseSvg(icon.outline),
      filled: { metadata, ...parseSvg(icon.filled) },
    };
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const icons = await loadSources();
  console.log(`Validated ${icons.length} current source pairs.`);
}
