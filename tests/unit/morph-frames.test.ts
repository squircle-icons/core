import { expect, it } from 'vitest';
import { buildPlusXGeometry } from '../../tools/build-plus-x.js';
import { buildPlusMinusGeometry } from '../../tools/build-plus-minus.js';
import { buildMenuXGeometry } from '../../tools/build-menu-x.js';
import { plusXFrame } from '../../src/morphs/plus-x.js';
import { plusMinusFrame } from '../../src/morphs/plus-minus.js';
import { menuXFrame } from '../../src/morphs/menu-x.js';
import { mark } from '../../tools/morph-source.js';
const x = buildPlusXGeometry(),
  minus = buildPlusMinusGeometry(),
  menu = buildMenuXGeometry();
for (const c of [
  { name: 'Plus X', from: 'plus', to: 'x', geometry: x, frame: (p: number) => plusXFrame(p, x) },
  {
    name: 'Plus Minus',
    from: 'plus',
    to: 'minus',
    geometry: minus,
    frame: (p: number) => plusMinusFrame(p, minus),
  },
  {
    name: 'Menu X',
    from: 'menu',
    to: 'x',
    geometry: menu,
    frame: (p: number) => menuXFrame(p, menu),
  },
]) {
  it(c.name + ' uses only current unboxed Figma source endpoints and1.5 Outline', () => {
    expect(c.geometry.strokeWidth).toBe(1.5);
    expect(c.geometry).not.toHaveProperty('frames');
    expect(c.geometry).not.toHaveProperty('variants');
    for (const [p, id] of [
      [0, c.from],
      [1, c.to],
    ] as const) {
      const s = mark(id),
        frame = c.frame(p);
      expect(frame.outline).toBe(s.outline);
      expect(frame.filled).toBe(s.filled);
    }
  });
  it(c.name + ' remains finite, source-bounded and deterministic through reversals', () => {
    for (let i = 0; i <= 100; i++) {
      const p = i / 100,
        a = c.frame(p);
      expect(a.outline + a.filled).not.toMatch(/NaN|Infinity/);
      c.frame(1 - p);
      expect(c.frame(p)).toEqual(a);
    }
    expect(c.frame(NaN)).toEqual(c.frame(0));
    expect(c.frame(-2)).toEqual(c.frame(0));
    expect(c.frame(3)).toEqual(c.frame(1));
  });
}
