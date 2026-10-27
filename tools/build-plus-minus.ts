import type { CoreIcon } from '../src/catalog.js';
import type { PlusMinusGeometry } from '../src/morphs/plus-minus.js';
export function buildPlusMinusGeometry(icons: CoreIcon[]): PlusMinusGeometry {
  const plus = icons.find((icon) => icon.name === 'plus')!;
  const minus = icons.find((icon) => icon.name === 'minus')!;
  const paths = (icon: CoreIcon) => ({
    outline: String(icon.root.children[0].children[0].attrs.d),
    filled: String(icon.frames!.square!.filled!.root.children[0].children[0].attrs.d),
  });
  const from = paths(plus),
    to = paths(minus);
  const values = from.outline.match(/-?\d*\.?\d+/g)!.map(Number);
  const minusValues = to.outline.match(/-?\d*\.?\d+/g)!.map(Number);
  if (values.slice(0, 3).some((n, i) => n !== minusValues[i]))
    throw new Error('Plus/Minus must share the same horizontal centerline');
  const box = from.filled.match(/[Mm][^Mm]*/g)![0].trim();
  if (box !== to.filled.match(/[Mm][^Mm]*/g)![0].trim())
    throw new Error('Plus/Minus must share the same upright Square Filled frame');
  return {
    center: [(values[0] + values[2]) / 2, values[1]],
    extent: (values[2] - values[0]) / 2,
    strokeWidth: Number(plus.root.attrs['stroke-width']),
    box,
    plus: from,
    minus: to,
  };
}
