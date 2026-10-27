import { buildMorphFrames } from './build-morph-frames.js';
import type { CoreIcon } from '../src/catalog.js';
import type { MenuXGeometry } from '../src/morphs/menu-x.js';
import { buildPlusXGeometry } from './build-plus-x.js';
export function buildMenuXGeometry(icons: CoreIcon[]): MenuXGeometry {
  const menu = icons.find((icon) => icon.name === 'menu')!;
  const x = icons.find((icon) => icon.name === 'x')!;
  const frames = buildMorphFrames(menu, x);
  const shared = buildPlusXGeometry(icons);
  const outline = String(menu.root.children[0].children[0].attrs.d);
  const values = outline.match(/-?\d*\.?\d+/g)!.map(Number);
  return {
    center: shared.center,
    menuExtent: (values[2] - values[0]) / 2,
    menuOffset: shared.center[1] - values[1],
    xExtent: shared.xExtent,
    strokeWidth: shared.strokeWidth,
    filledStrokeWidth: 2.5,
    menu: { outline, filled: frames.square.from },
    x: shared.x,
    frames,
  };
}
