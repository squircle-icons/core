import { STROKE_WEIGHTS } from '../src/types.js';
import type { CoreFrame } from '../src/catalog.js';
import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSvg, optimizeSvg, extractStrokeCutout, validateIconName } from './model.js';

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
  const files = (await readdir(resolve(root, 'icons')))
    .filter((name) => name.endsWith('.svg'))
    .sort();
  const filledFiles = (
    await readdir(resolve(root, 'icons/filled')).catch((error) => {
      if (error.code === 'ENOENT') return [] as string[];
      throw error;
    })
  )
    .filter((name) => name.endsWith('.svg'))
    .sort();
  const icons = [];
  for (const file of files) {
    const name = file.slice(0, -4);
    validateIconName(name);
    const source = await readFile(resolve(root, 'icons', file), 'utf8');
    const metadata = validateMetadata(
      JSON.parse(await readFile(resolve(root, 'icons', `${name}.json`), 'utf8')),
      name,
    );
    const optimized = optimizeSvg(source);
    const parsed = parseSvg(optimized);
    if (Number(parsed.root.attrs['stroke-width']) !== STROKE_WEIGHTS.regular)
      throw new Error(`Default stroke must match Regular: ${name}`);
    let filled;
    if (filledFiles.includes(file)) {
      const filledSource = await readFile(resolve(root, 'icons/filled', file), 'utf8');
      const filledMetadata = validateMetadata(
        JSON.parse(await readFile(resolve(root, 'icons/filled', `${name}.json`), 'utf8')),
        name,
      );
      const filledOptimized = optimizeSvg(filledSource, 'filled');
      const filledParsed = parseSvg(filledOptimized, 'filled');
      const cutout = filledMetadata.strokeWidthCutout
        ? extractStrokeCutout(filledParsed.root, filledMetadata.strokeWidthCutout)
        : undefined;
      filled = { metadata: filledMetadata, ...filledParsed, ...(cutout ? { cutout } : {}) };
    }
    const frames: Partial<Record<'square' | 'circle', CoreFrame>> = {};
    for (const frame of ['square', 'circle'] as const) {
      const directory = resolve(root, 'icons/frames', frame);
      const frameSource = await readFile(resolve(directory, file), 'utf8').catch((error) => {
        if (error.code === 'ENOENT') return undefined;
        throw error;
      });
      if (!frameSource) continue;
      const metadata = validateMetadata(
        JSON.parse(await readFile(resolve(directory, `${name}.json`), 'utf8')),
        name,
      );
      const parsed = parseSvg(optimizeSvg(frameSource));
      if (Number(parsed.root.attrs['stroke-width']) !== STROKE_WEIGHTS.regular)
        throw new Error(`Frame default stroke must match Regular: ${frame}/${name}`);
      const filledSource = await readFile(resolve(directory, 'filled', file), 'utf8');
      const filledMetadata = validateMetadata(
        JSON.parse(await readFile(resolve(directory, 'filled', `${name}.json`), 'utf8')),
        name,
      );
      const filledParsed = parseSvg(optimizeSvg(filledSource, 'filled'), 'filled');
      frames[frame] = {
        metadata,
        ...parsed,
        filled: { metadata: filledMetadata, ...filledParsed },
      };
    }
    icons.push({
      name,
      source,
      optimized,
      metadata,
      ...parsed,
      ...(filled ? { filled } : {}),
      ...(Object.keys(frames).length ? { frames } : {}),
    });
  }
  for (const file of filledFiles)
    if (!files.includes(file)) throw new Error(`Orphan filled icon: ${file}`);
  for (const frame of ['square', 'circle'])
    for (const style of ['', 'filled']) {
      const frameFiles = await readdir(resolve(root, 'icons/frames', frame, style)).catch(
        (error) => {
          if (error.code === 'ENOENT') return [] as string[];
          throw error;
        },
      );
      for (const file of frameFiles.filter((file) => file.endsWith('.svg'))) {
        if (!files.includes(file)) throw new Error(`Orphan frame icon: ${frame}/${style}/${file}`);
        if (style === 'filled') await readFile(resolve(root, 'icons/frames', frame, file), 'utf8');
      }
    }
  return icons;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const icons = await loadSources();
  console.log(
    `Validated ${icons.length} original outline SVGs, ${icons.filter((icon) => icon.filled).length} filled variants.`,
  );
}
