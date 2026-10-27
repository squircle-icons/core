import { buildMorphFrames, morphMark } from './build-morph-frames.js';
import type { CoreIcon } from '../src/catalog.js';
import type { PlusMinusGeometry, PlusMinusMarkGeometry } from '../src/morphs/plus-minus.js';
import type { MorphFrame } from '../src/morphs/round-strokes.js';
export function buildPlusMinusGeometry(icons: CoreIcon[]): PlusMinusGeometry {
  const plus = icons.find((icon) => icon.name === 'plus')!;
  const minus = icons.find((icon) => icon.name === 'minus')!;
  const frames = buildMorphFrames(plus, minus);
  const make = (frame: MorphFrame): PlusMinusMarkGeometry => {
    const from = morphMark(plus, frame),
      to = morphMark(minus, frame);
    const values = from.outline.match(/-?\d*\.?\d+/g)!.map(Number);
    const minusValues = to.outline.match(/-?\d*\.?\d+/g)!.map(Number);
    if (values.slice(0, 3).some((n, i) => n !== minusValues[i]))
      throw new Error('Plus/Minus must share the same horizontal centerline per frame');
    if (from.strokeWidth !== to.strokeWidth) throw new Error('Plus/Minus stroke widths must match');
    return {
      center: [(values[0] + values[2]) / 2, values[1]],
      extent: (values[2] - values[0]) / 2,
      strokeWidth: from.strokeWidth,
      box: frames[frame].box,
      plus: { outline: from.outline, filled: frames[frame].from },
      minus: { outline: to.outline, filled: frames[frame].to },
    };
  };
  const variants = { none: make('none'), square: make('square'), circle: make('circle') };
  return { ...variants.square, frames, variants };
}
