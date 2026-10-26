import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSvg, optimizeSvg, validateMotion } from './model.js';

export const root = fileURLToPath(new URL('../', import.meta.url));
export async function loadSources() {
  const files = (await readdir(resolve(root, 'icons')))
    .filter((name) => name.endsWith('.svg'))
    .sort();
  const motionFiles = (await readdir(resolve(root, 'motions'))).filter((name) =>
    name.endsWith('.json'),
  );
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
    if (!/^[a-z][a-z0-9-]*$/.test(name)) throw new Error(`Invalid icon name: ${name}`);
    const source = await readFile(resolve(root, 'icons', file), 'utf8');
    const metadata = JSON.parse(await readFile(resolve(root, 'icons', `${name}.json`), 'utf8'));
    if (
      metadata.name !== name ||
      !metadata.description ||
      !metadata.authorship ||
      !metadata.construction ||
      !Array.isArray(metadata.tags)
    )
      throw new Error(`Invalid metadata: ${name}`);
    const optimized = optimizeSvg(source);
    const parsed = parseSvg(optimized);
    const motion = motionFiles.includes(`${name}.json`)
      ? validateMotion(
          JSON.parse(await readFile(resolve(root, 'motions', `${name}.json`), 'utf8')),
          parsed.parts,
          name,
        )
      : undefined;
    let filled;
    if (filledFiles.includes(file)) {
      const filledSource = await readFile(resolve(root, 'icons/filled', file), 'utf8');
      const filledMetadata = JSON.parse(
        await readFile(resolve(root, 'icons/filled', `${name}.json`), 'utf8'),
      );
      if (
        filledMetadata.name !== name ||
        !filledMetadata.description ||
        !filledMetadata.authorship ||
        !filledMetadata.construction ||
        !Array.isArray(filledMetadata.tags)
      )
        throw new Error(`Invalid filled metadata: ${name}`);
      const filledOptimized = optimizeSvg(filledSource, 'filled');
      filled = { metadata: filledMetadata, ...parseSvg(filledOptimized, 'filled') };
    }
    icons.push({
      name,
      source,
      optimized,
      metadata,
      ...parsed,
      motion,
      ...(filled ? { filled } : {}),
    });
  }
  for (const file of filledFiles)
    if (!files.includes(file)) throw new Error(`Orphan filled icon: ${file}`);
  for (const file of motionFiles)
    if (!files.includes(file.replace('.json', '.svg'))) throw new Error(`Orphan motion: ${file}`);
  return icons;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const icons = await loadSources();
  console.log(
    `Validated ${icons.length} original outline SVGs, ${icons.filter((icon) => icon.filled).length} filled variants and ${icons.filter((icon) => icon.motion).length} motion recipes.`,
  );
}
