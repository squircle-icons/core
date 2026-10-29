import { mark } from './morph-source.js';
import type { PlusMinusGeometry } from '../src/morphs/plus-minus.js';
export function buildPlusMinusGeometry(): PlusMinusGeometry {
  const a = mark('plus'),
    b = mark('minus');
  return {
    center: a.center,
    extent: a.extent,
    strokeWidth: a.strokeWidth,
    plus: { outline: a.outline, filled: a.filled },
    minus: { outline: b.outline, filled: b.filled },
  };
}
