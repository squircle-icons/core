import type { CoreIcon } from '../src/catalog.js';
import type { MorphFrames } from '../src/morphs/round-strokes.js';
/** Require the same complete frame family at both endpoints; never mix variants. */
export function buildMorphFrames(from: CoreIcon, to: CoreIcon): MorphFrames {
  const path = (icon: CoreIcon, frame: 'none' | 'square' | 'circle') => {
    const variant = frame === 'none' ? icon.filled : icon.frames?.[frame]?.filled;
    if (!variant) throw new Error(`${icon.name} is missing Filled ${frame} for morph parity`);
    return String(variant.root.children[0].children[0].attrs.d);
  };
  const outlineFrame = (icon: CoreIcon, frame: 'none' | 'square' | 'circle') => {
    if (frame === 'none') return '';
    const shape = icon.frames?.[frame]?.root.children[0].children[0];
    if (!shape) throw new Error(`${icon.name} is missing Outline ${frame}`);
    if (shape.attrs.d) return String(shape.attrs.d);
    const cx = Number(shape.attrs.cx),
      cy = Number(shape.attrs.cy),
      r = Number(shape.attrs.r);
    if (![cx, cy, r].every(Number.isFinite)) throw new Error('Unsupported morph frame');
    return `M${cx - r} ${cy} A${r} ${r} 0 1 0 ${cx + r} ${cy} A${r} ${r} 0 1 0 ${cx - r} ${cy} Z`;
  };
  return Object.fromEntries(
    (['none', 'square', 'circle'] as const).map((frame) => {
      const a = path(from, frame),
        b = path(to, frame);
      const box = frame === 'none' ? '' : a.match(/[Mm][^Mm]*/g)![0].trim();
      if (frame !== 'none' && box !== b.match(/[Mm][^Mm]*/g)![0].trim())
        throw new Error(`Mismatched ${frame} morph frames`);
      const outline = outlineFrame(from, frame);
      if (outline !== outlineFrame(to, frame)) throw new Error('Mismatched Outline morph frames');
      return [frame, { box, outline, from: a, to: b }];
    }),
  ) as MorphFrames;
}
