import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { loadSources, root } from './validate.js';
import { buildSunMoonGeometry } from './build-sun-moon.js';
const icons = await loadSources();
await mkdir(resolve(root, 'dist'), { recursive: true });
await writeFile(
  resolve(root, 'dist/catalog.json'),
  JSON.stringify(
    icons.map(({ name, metadata, root, parts, filled }) => ({
      name,
      metadata,
      root,
      parts,
      ...(filled ? { filled } : {}),
    })),
    null,
    2,
  ) + '\n',
);
console.log(`Built ${icons.length} validated core icons.`);
await mkdir(resolve(root, 'dist/morphs'), { recursive: true });
await writeFile(
  resolve(root, 'dist/morphs/sun-moon.json'),
  JSON.stringify(buildSunMoonGeometry(icons), null, 2) + '\n',
);
