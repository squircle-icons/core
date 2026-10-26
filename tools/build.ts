import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { loadSources, root } from './validate.js';
const icons = await loadSources();
await mkdir(resolve(root, 'dist'), { recursive: true });
await writeFile(
  resolve(root, 'dist/catalog.json'),
  JSON.stringify(
    icons.map(({ name, metadata, root, parts, motion }) => ({
      name,
      metadata,
      root,
      parts,
      ...(motion ? { motion } : {}),
    })),
    null,
    2,
  ) + '\n',
);
console.log(`Built ${icons.length} validated core icons.`);
