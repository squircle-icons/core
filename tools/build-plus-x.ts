import type { CoreIcon } from '../src/catalog.js';
import type { PlusXGeometry } from '../src/morphs/plus-x.js';

export function buildPlusXGeometry(icons: CoreIcon[]): PlusXGeometry {
  const plus = icons.find((icon) => icon.name === 'plus')!;
  const x = icons.find((icon) => icon.name === 'x')!;
  const paths = (icon: CoreIcon) => ({
    outline: String(icon.root.children[0].children[0].attrs.d),
    filled: String(
      (icon.frames?.square?.filled ?? icon.filled!).root.children[0].children[0].attrs.d,
    ),
  });
  const from = paths(plus),
    to = paths(x);
  const values = (d: string) => d.match(/-?\d*\.?\d+/g)!.map(Number);
  const a = values(from.outline),
    b = values(to.outline);
  const center: [number, number] = [(a[0] + a[2]) / 2, a[1]];
  const box = from.filled.match(/[Mm][^Mm]*/g)![0].trim();
  if (box !== to.filled.match(/[Mm][^Mm]*/g)![0].trim())
    throw new Error('Plus/X morph needs the same approved upright Filled box');
  return {
    center,
    plusExtent: (a[2] - a[0]) / 2,
    xExtent: Math.max(...b.filter((_, i) => i % 2 === 0)) - center[0],
    strokeWidth: Number(plus.root.attrs['stroke-width']),
    box,
    plus: from,
    x: to,
  };
}
