import { mark } from './morph-source.js';
import type { MenuXGeometry } from '../src/morphs/menu-x.js';
export function buildMenuXGeometry(): MenuXGeometry {
  const a = mark('menu'),
    b = mark('x');
  return {
    center: a.center,
    menuExtent: a.extent,
    menuOffset: a.center[1] - Math.min(...a.points.map((p) => p[1])),
    xExtent: b.extent,
    strokeWidth: a.strokeWidth,
    filledStrokeWidth: 2.5,
    menu: { outline: a.outline, filled: a.filled },
    x: { outline: b.outline, filled: b.filled },
  };
}
