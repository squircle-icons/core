import { beforeAll, expect, it } from 'vitest';
import { buildSunMoonGeometry } from '../../tools/build-sun-moon.js';
import { sunMoonFrame, type SunMoonGeometry } from '../../src/morphs/sun-moon.js';
let geometry: SunMoonGeometry;
beforeAll(async () => {
  geometry = buildSunMoonGeometry();
});
it('derives approved Sun and Moon endpoints without modifying the catalog', () => {
  expect(geometry.sun.radius).toBeCloseTo(4.7, 3);
  expect(geometry.sun.rays).toHaveLength(8);
  expect(geometry.moon.outer.x).toBeCloseTo(12.00675074, 3);
  expect(geometry.moon.outer.y).toBeCloseTo(11.86562791, 3);
  expect(sunMoonFrame(1, geometry).body).toBe(geometry.moon.path);
  expect(sunMoonFrame(0, geometry).rayOpacity).toBe(1);
  expect(sunMoonFrame(1, geometry).rayOpacity).toBe(0);
});
it('keeps the circle intersection finite and repeatable in both directions', () => {
  for (let i = 0; i <= 1000; i++) {
    const p = i / 1000;
    const frame = sunMoonFrame(p, geometry);
    expect(frame.body).not.toMatch(/NaN|Infinity/);
    expect(frame.rays.join()).not.toMatch(/NaN|Infinity/);
    const reverse = sunMoonFrame(1 - (1 - p), geometry);
    const numbers = (d: string) => d.match(/-?\d*\.?\d+/g)!.map(Number);
    const forwardValues = numbers(frame.body + frame.rays.join(' '));
    const reverseValues = numbers(reverse.body + reverse.rays.join(' '));
    expect(forwardValues).toHaveLength(reverseValues.length);
    forwardValues.forEach((value, index) => expect(value).toBeCloseTo(reverseValues[index], 6));
    expect(frame.rayOpacity).toBeCloseTo(reverse.rayOpacity, 12);
  }
});
it('clamps invalid progress and keeps the seam invisible near the Sun', () => {
  expect(sunMoonFrame(-1, geometry)).toEqual(sunMoonFrame(0, geometry));
  expect(sunMoonFrame(Infinity, geometry)).toEqual(sunMoonFrame(0, geometry));
  expect(sunMoonFrame(2, geometry)).toEqual(sunMoonFrame(1, geometry));
});
