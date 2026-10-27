import { beforeAll, expect, it } from 'vitest';
import { loadSources } from '../../tools/validate.js';
import type { CoreIcon } from '../../src/catalog.js';
import { buildMenuXGeometry } from '../../tools/build-menu-x.js';
import { buildPlusXGeometry } from '../../tools/build-plus-x.js';
import { buildPlusMinusGeometry } from '../../tools/build-plus-minus.js';
import { menuXFrame } from '../../src/morphs/menu-x.js';
import { plusXFrame } from '../../src/morphs/plus-x.js';
import { plusMinusFrame } from '../../src/morphs/plus-minus.js';
let icons: CoreIcon[];
beforeAll(async () => {
  icons = await loadSources();
});
const cases = [
  {
    name: 'Menu X',
    from: 'menu',
    to: 'x',
    make: () => {
      const g = buildMenuXGeometry(icons);
      return { g, render: (p: number, f: 'none' | 'square' | 'circle') => menuXFrame(p, g, f) };
    },
  },
  {
    name: 'Plus X',
    from: 'plus',
    to: 'x',
    make: () => {
      const g = buildPlusXGeometry(icons);
      return { g, render: (p: number, f: 'none' | 'square' | 'circle') => plusXFrame(p, g, f) };
    },
  },
  {
    name: 'Plus Minus',
    from: 'plus',
    to: 'minus',
    make: () => {
      const g = buildPlusMinusGeometry(icons);
      return { g, render: (p: number, f: 'none' | 'square' | 'circle') => plusMinusFrame(p, g, f) };
    },
  },
];
for (const item of cases)
  for (const frame of ['none', 'square', 'circle'] as const)
    it(`${item.name} implements the complete matching ${frame} family`, () => {
      const { g, render } = item.make();
      for (const [name, p] of [
        [item.from, 0],
        [item.to, 1],
      ] as const) {
        const source = icons.find((icon) => icon.name === name)!;
        const variant = frame === 'none' ? source.filled! : source.frames![frame]!.filled!;
        const outline = frame === 'none' ? source : source.frames![frame]!;
        expect(render(p, frame).outline).toBe(
          String(outline.root.children[0].children[frame === 'none' ? 0 : 1].attrs.d),
        );
        expect(render(p, frame).filled).toBe(String(variant.root.children[0].children[0].attrs.d));
      }
      for (const p of [0.000001, 0.1, 0.3, 0.5, 0.65, 0.9, 0.999999]) {
        const result = render(p, frame);
        expect(result.filled).not.toMatch(/NaN|Infinity/);
        if (frame !== 'none')
          expect(result.filled.startsWith(g.frames[frame].box + ' ')).toBe(true);
      }
    });
it('rejects a partial frame family instead of silently mixing endpoint variants', () => {
  const broken = structuredClone(icons);
  delete broken.find((icon) => icon.name === 'menu')!.frames!.circle;
  expect(() => buildMenuXGeometry(broken)).toThrow(/missing Filled circle/);
});

it('derives larger None marks independently without resizing either framed morph', () => {
  const enlarged = structuredClone(icons);
  for (const name of ['plus', 'minus', 'x', 'menu']) {
    const glyph = enlarged.find((icon) => icon.name === name)!.root.children[0].children[0];
    glyph.attrs.d = String(glyph.attrs.d).replace(/-?\d*\.?\d+/g, (n) =>
      String(12 + (Number(n) - 12) * 1.1),
    );
  }
  const verify = <G>(
    build: (icons: CoreIcon[]) => G,
    render: (p: number, g: G, f: 'none' | 'square' | 'circle') => { outline: string },
  ) => {
    const previous = build(icons),
      next = build(enlarged);
    expect(render(0.4, next, 'none').outline).not.toBe(render(0.4, previous, 'none').outline);
    for (const frame of ['square', 'circle'] as const)
      for (const p of [0, 0.001, 0.4, 0.5, 0.9, 1])
        expect(render(p, next, frame)).toEqual(render(p, previous, frame));
  };
  verify(buildPlusXGeometry, plusXFrame);
  verify(buildPlusMinusGeometry, plusMinusFrame);
  verify(buildMenuXGeometry, menuXFrame);
});
