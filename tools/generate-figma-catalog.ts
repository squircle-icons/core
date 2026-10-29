import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { format, resolveConfig } from 'prettier';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(
  await readFile(resolve(root, 'icons/figma-study/manifest.json'), 'utf8'),
);
type Record = {
  id: string;
  label: string;
  group: string;
  style: 'outline' | 'filled';
  nodeId: string;
  source: string;
  sha256: string;
};
const records: Record[] = manifest.records;
const ids = [...new Set(records.map((r) => r.id))];
const approved = new Set(['square', 'calendar', 'lock', 'heart']);
const icons = [];
for (const id of ids) {
  const styles = {} as { outline: string; filled: string };
  const figma = {} as { outline: string; filled: string };
  const rows = records.filter((r) => r.id === id);
  for (const row of rows) {
    const raw = await readFile(resolve(root, row.source), 'utf8');
    if (createHash('sha256').update(raw).digest('hex') !== row.sha256)
      throw Error(`Changed source: ${row.source}`);
    // Only paint and identifier normalization. Path coordinates are untouched.
    let svg = raw.replace(/(?:fill|stroke)="(?:black|#000000|#000)"/gi, (paint) =>
      paint.replace(/"[^"]+"$/, '"currentColor"'),
    );
    const refs = new Map(
      [...svg.matchAll(/\bid="([^"]+)"/g)].map((m, i) => [m[1], `${id}-${row.style}-${i}`]),
    );
    for (const [from, to] of refs)
      svg = svg.replaceAll(`id="${from}"`, `id="${to}"`).replaceAll(`url(#${from})`, `url(#${to})`);
    styles[row.style] = svg;
    figma[row.style] = row.nodeId;
  }
  if (!styles.outline || !styles.filled) throw Error(`Incomplete pair: ${id}`);
  icons.push({
    id,
    label: rows[0].label,
    group: rows[0].group,
    status: approved.has(id) ? 'approved' : 'draft',
    baseStroke: 1.5,
    adjustableStroke: id !== 'pen' && /\bstroke="currentColor"/.test(styles.outline),
    ...styles,
    figma,
  });
}
const source = await format(
  `// Generated from icons/figma-study by tools/generate-figma-catalog.ts. Do not redraw here.\nexport const FIGMA_STUDY_ICONS = ${JSON.stringify(icons)} as const;\nexport type FigmaStudyIcon = (typeof FIGMA_STUDY_ICONS)[number];\n`,
  { ...(await resolveConfig(root)), parser: 'typescript' },
);
const target = resolve(root, 'src/design/figma-catalog.ts');
if (process.argv.includes('--check')) {
  if ((await readFile(target, 'utf8')) !== source)
    throw Error('Stale Figma catalog. Run pnpm generate:figma.');
} else await writeFile(target, source);
console.log(`Verified ${icons.length} original Figma icon pairs.`);
