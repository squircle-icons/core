import type { CoreIcon } from '../src/catalog.js';
import type { Circle, SunMoonGeometry } from '../src/morphs/sun-moon.js';

/** Derive every endpoint from the validated approved source, never a second drawing. */
export function buildSunMoonGeometry(icons: CoreIcon[]): SunMoonGeometry {
  const sun = icons.find((icon) => icon.name === 'sun')!;
  const moon = icons.find((icon) => icon.name === 'moon')!;
  const disc = sun.root.children.find((node) => node.attrs['data-part'] === 'body')!.children[0];
  const rayPath = sun.root.children.find((node) => node.attrs['data-part'] === 'rays')!.children[0];
  const path = String(moon.root.children[0].children[0].attrs.d);
  const values = path.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi)!.map(Number);
  const [px, py, r, , , , , qx, qy, innerRadius] = values;
  const center = (radius: number, side: number): Circle => {
    const dx = qx - px;
    const dy = qy - py;
    const length = Math.hypot(dx, dy);
    const height = Math.sqrt(radius ** 2 - (length / 2) ** 2);
    return {
      x: (px + qx) / 2 + (side * height * dy) / length,
      y: (py + qy) / 2 - (side * height * dx) / length,
      radius,
    };
  };
  const rayValues = String(rayPath.attrs.d)
    .match(/-?\d*\.?\d+/g)!
    .map(Number);
  return {
    sun: {
      x: Number(disc.attrs.cx),
      y: Number(disc.attrs.cy),
      radius: Number(disc.attrs.r),
      rays: Array.from({ length: rayValues.length / 4 }, (_, i) =>
        rayValues.slice(i * 4, i * 4 + 4),
      ),
    },
    moon: { outer: center(r, -1), inner: center(innerRadius, 1), path },
    strokeWidth: Number(sun.root.attrs['stroke-width']),
  };
}
