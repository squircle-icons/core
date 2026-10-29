import { mark } from './morph-source.js';
import type { PlusXGeometry } from '../src/morphs/plus-x.js';
export function buildPlusXGeometry(): PlusXGeometry {
  const a = mark('plus'),
    b = mark('x');
  return {
    center: a.center,
    plusExtent: a.extent,
    xExtent: b.extent,
    strokeWidth: a.strokeWidth,
    plus: { outline: a.outline, filled: a.filled },
    x: { outline: b.outline, filled: b.filled },
  };
}
