import { expect, it } from 'vitest';
import pathParser from 'svg-path-parser';
import { loadSources } from '../../tools/validate.js';

it('uses the rounder Square enclosing contour without changing the 2px outer bounds', async () => {
  const icons = (await loadSources()).filter((icon) => icon.frames?.square);
  expect(icons).toHaveLength(35);
  for (const icon of icons) {
    for (const [style, radius, inset] of [
      ['outline', 5.125, 2.875],
      ['filled', 6, 2],
    ] as const) {
      const frame = icon.frames!.square!;
      const root = style === 'filled' ? frame.filled.root : frame.root;
      const d = root.children[0].children[0].attrs.d;
      const outer = d.match(/^[Mm][^Mm]*?[Zz]/)![0];
      const commands = pathParser.makeAbsolute(pathParser.parseSVG(outer));
      const arcs = commands.filter((command) => command.command === 'elliptical arc');
      expect(arcs).toHaveLength(4);
      for (const arc of arcs) {
        if (!('rx' in arc)) throw Error('Expected arc');
        expect(arc.rx).toBe(radius);
        expect(arc.ry).toBe(radius);
        expect(arc.xAxisRotation).toBe(0);
        expect(arc.largeArc).toBe(false);
        expect(arc.sweep).toBe(true);
      }
      const xs = commands.map((command) => command.x),
        ys = commands.map((command) => command.y);
      expect(Math.min(...xs)).toBe(inset);
      expect(Math.max(...xs)).toBe(24 - inset);
      expect(Math.min(...ys)).toBe(inset);
      expect(Math.max(...ys)).toBe(24 - inset);
      expect(commands[0].x).toBe(8);
      expect(commands[1].x).toBe(16);
      if (style === 'outline') expect(root.attrs['stroke-width']).toBe('1.75');
      else expect(root.attrs['fill-rule']).toBe('evenodd');
    }
  }
});
