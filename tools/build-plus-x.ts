import { buildMorphFrames, morphMark } from './build-morph-frames.js';
import type { CoreIcon } from '../src/catalog.js';
import type { PlusXGeometry, PlusXMarkGeometry } from '../src/morphs/plus-x.js';
import type { MorphFrame } from '../src/morphs/round-strokes.js';

export function buildPlusXGeometry(icons: CoreIcon[]): PlusXGeometry {
  const plus = icons.find((icon) => icon.name === 'plus')!;
  const x = icons.find((icon) => icon.name === 'x')!;
  const frames = buildMorphFrames(plus, x);
  const make = (frame: MorphFrame): PlusXMarkGeometry => {
    const from = morphMark(plus, frame),
      to = morphMark(x, frame);
    const values = (d: string) => d.match(/-?\d*\.?\d+/g)!.map(Number);
    const a = values(from.outline),
      b = values(to.outline);
    const center: [number, number] = [(a[0] + a[2]) / 2, a[1]];
    if (from.strokeWidth !== to.strokeWidth) throw new Error('Plus/X stroke widths must match');
    return {
      center,
      plusExtent: (a[2] - a[0]) / 2,
      xExtent: Math.max(...b.filter((_, i) => i % 2 === 0)) - center[0],
      strokeWidth: from.strokeWidth,
      box: frames[frame].box,
      plus: { outline: from.outline, filled: frames[frame].from },
      x: { outline: to.outline, filled: frames[frame].to },
    };
  };
  const variants = { none: make('none'), square: make('square'), circle: make('circle') };
  return { ...variants.square, frames, variants };
}
