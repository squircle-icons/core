import { buildMorphFrames, morphMark } from './build-morph-frames.js';
import type { CoreIcon } from '../src/catalog.js';
import type { MenuXGeometry, MenuXMarkGeometry } from '../src/morphs/menu-x.js';
import type { MorphFrame } from '../src/morphs/round-strokes.js';
import { buildPlusXGeometry } from './build-plus-x.js';
export function buildMenuXGeometry(icons: CoreIcon[]): MenuXGeometry {
  const menu = icons.find((icon) => icon.name === 'menu')!;
  const x = icons.find((icon) => icon.name === 'x')!;
  const frames = buildMorphFrames(menu, x);
  const shared = buildPlusXGeometry(icons);
  const make = (frame: MorphFrame): MenuXMarkGeometry => {
    const mark = shared.variants![frame];
    const from = morphMark(menu, frame);
    const values = from.outline.match(/-?\d*\.?\d+/g)!.map(Number);
    if (from.strokeWidth !== mark.strokeWidth) throw new Error('Menu/X stroke widths must match');
    return {
      center: mark.center,
      menuExtent: (values[2] - values[0]) / 2,
      menuOffset: mark.center[1] - values[1],
      xExtent: mark.xExtent,
      strokeWidth: from.strokeWidth,
      filledStrokeWidth: 2.5,
      menu: { outline: from.outline, filled: frames[frame].from },
      x: mark.x,
    };
  };
  const variants = { none: make('none'), square: make('square'), circle: make('circle') };
  return { ...variants.square, frames, variants };
}
