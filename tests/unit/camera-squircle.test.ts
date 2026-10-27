import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import pathParser from 'svg-path-parser';
import { bezier, cameraProfiles, sampleProfile, type Point } from '../../tools/camera-design.js';
const source = (filled = false) =>
  readFileSync(
    new URL(`../../icons/${filled ? 'filled/' : ''}camera.svg`, import.meta.url),
    'utf8',
  );
const commands = (filled = false) =>
  pathParser.makeAbsolute(pathParser.parseSVG(source(filled).match(/d="([^"]+)"/)![1]));

it('Camera progressive corners leave straight sides with zero curvature and a noncircular turn', () => {
  for (const p of cameraProfiles.filter((p) => p.length === 6)) {
    expect(sampleProfile(p, 0).curvature).toBeCloseTo(0, 10);
    expect(sampleProfile(p, 1).curvature).toBeCloseTo(0, 10);
  }
  const corner = cameraProfiles[7];
  const bend = [0, 0.125, 0.25, 0.375, 0.5].map((t) => sampleProfile(corner, t).curvature);
  for (let i = 1; i < bend.length; i++) expect(bend[i]).toBeGreaterThan(bend[i - 1]);
  for (let i = 0; i < cameraProfiles.length; i++) {
    const a = sampleProfile(cameraProfiles[i], 1);
    const b = sampleProfile(cameraProfiles[(i + 1) % cameraProfiles.length], 0);
    expect(a.point).toEqual(b.point);
    expect(a.tangent[0] * b.tangent[1] - a.tangent[1] * b.tangent[0]).toBeCloseTo(0, 8);
    expect(a.tangent[0] * b.tangent[0] + a.tangent[1] * b.tangent[1]).toBeGreaterThan(0);
  }
});

it.each([false, true])(
  'Camera source fits its independent profile and analytical offset (Filled=%s)',
  (filled) => {
    const parsed = commands(filled);
    let index = 1;
    let worst = 0;
    for (const profile of cameraProfiles) {
      const count = profile.length === 2 ? 1 : 24;
      for (let i = 0; i < count; i++) {
        const c = parsed[index++];
        for (const u of [0, 0.125, 0.25, 0.5, 0.75, 0.875, 1]) {
          const actual =
            c.code === 'L'
              ? bezier(
                  [
                    [c.x0, c.y0],
                    [c.x, c.y],
                  ],
                  u,
                )
              : 'x1' in c && 'x2' in c
                ? bezier(
                    [
                      [c.x0, c.y0],
                      [c.x1, c.y1],
                      [c.x2, c.y2],
                      [c.x, c.y],
                    ],
                    u,
                  )
                : (() => {
                    throw Error('Expected cubic source curve');
                  })();
          const expected = sampleProfile(profile, (i + u) / count, filled ? 0.875 : 0).point;
          worst = Math.max(worst, Math.hypot(actual[0] - expected[0], actual[1] - expected[1]));
        }
      }
    }
    expect(worst).toBeLessThan(0.0001);
    expect(parsed[index].code).toBe('Z');
  },
);

it.each([0, 0.875])(
  'Camera has balanced native bounds and no cusps or intersections at offset%s',
  (offset) => {
    const points: Point[] = cameraProfiles.flatMap((profile) =>
      Array.from({ length: 32 }, (_, i) => {
        const sample = sampleProfile(profile, i / 32, offset);
        expect(Math.hypot(...sample.tangent)).toBeGreaterThan(0.1);
        return sample.point;
      }),
    );
    const half = offset ? 0 : 0.875;
    expect(Math.min(...points.map((p) => p[0])) - half).toBeCloseTo(2, 6);
    expect(Math.max(...points.map((p) => p[0])) + half).toBeCloseTo(22, 6);
    expect(Math.min(...points.map((p) => p[1])) - half).toBeCloseTo(3.625, 6);
    expect(Math.max(...points.map((p) => p[1])) + half).toBeCloseTo(20.375, 6);
    const cross = (a: Point, b: Point, c: Point) =>
      (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
    for (let i = 0; i < points.length; i++)
      for (let j = i + 2; j < points.length; j++) {
        if (i === 0 && j === points.length - 1) continue;
        const a = points[i],
          b = points[(i + 1) % points.length],
          c = points[j],
          d = points[(j + 1) % points.length];
        expect(
          cross(a, b, c) * cross(a, b, d) < -1e-12 && cross(c, d, a) * cross(c, d, b) < -1e-12,
        ).toBe(false);
      }
  },
);
