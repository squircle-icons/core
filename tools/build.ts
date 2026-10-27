import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { loadSources, root } from './validate.js';
import { buildSunMoonGeometry } from './build-sun-moon.js';
import { buildPlusXGeometry } from './build-plus-x.js';
import { buildMenuXGeometry } from './build-menu-x.js';
import { buildPlusMinusGeometry } from './build-plus-minus.js';
const icons = await loadSources();
await mkdir(resolve(root, 'dist'), { recursive: true });
await writeFile(
  resolve(root, 'dist/catalog.json'),
  JSON.stringify(
    icons.map(({ name, metadata, root, parts, filled, frames }) => ({
      name,
      metadata,
      root,
      parts,
      ...(filled ? { filled } : {}),
      ...(frames ? { frames } : {}),
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
await writeFile(
  resolve(root, 'dist/morphs/plus-x.json'),
  JSON.stringify(buildPlusXGeometry(icons), null, 2) + '\n',
);

await writeFile(
  resolve(root, 'dist/morphs/menu-x.json'),
  JSON.stringify(buildMenuXGeometry(icons), null, 2) + '\n',
);

await writeFile(
  resolve(root, 'dist/morphs/plus-minus.json'),
  JSON.stringify(buildPlusMinusGeometry(icons), null, 2) + '\n',
);
