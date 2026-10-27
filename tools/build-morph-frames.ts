import type { CoreIcon } from '../src/catalog.js';
import type { MorphFrames } from '../src/morphs/round-strokes.js';
/** Require the same complete frame family at both endpoints; never mix variants. */
export function buildMorphFrames(from: CoreIcon, to: CoreIcon): MorphFrames {
  const path = (icon: CoreIcon, frame: 'none' | 'square' | 'circle') => {
    const variant = frame === 'none' ? icon.filled : icon.frames?.[frame]?.filled;
    if (!variant) throw new Error(`${icon.name} is missing Filled ${frame} for morph parity`);
    return String(variant.root.children[0].children[0].attrs.d);
  };
  return Object.fromEntries(
    (['none', 'square', 'circle'] as const).map((frame) => {
      const a = path(from, frame),
        b = path(to, frame);
      const box = frame === 'none' ? '' : a.match(/[Mm][^Mm]*/g)![0].trim();
      if (frame !== 'none' && box !== b.match(/[Mm][^Mm]*/g)![0].trim())
        throw new Error(`Mismatched ${frame} morph frames`);
      return [frame, { box, from: a, to: b }];
    }),
  ) as MorphFrames;
}
