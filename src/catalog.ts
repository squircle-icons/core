import type { MotionRecipe } from './types.js';
/** Internal build contract; not a stable public API. */
export type CoreIcon = {
  name: string;
  metadata: {
    name: string;
    description: string;
    tags: string[];
    authorship: string;
    construction: string;
    review?: {
      status: 'approved' | 'draft';
      reviewedBy: string;
      date: string;
      style: string;
      preview: { x: number; y: number; strokeWidth: number };
      note: string;
    };
  };
  root: { tag: string; attrs: Record<string, string>; children: CoreIcon['root'][] };
  parts: string[];
  motion?: MotionRecipe;
  filled?: {
    metadata: CoreIcon['metadata'];
    root: CoreIcon['root'];
    parts: string[];
    cutout?: {
      part: string;
      outerPath: string;
      left: number;
      right: number;
      centerY: number;
      defaultWidth: number;
      minWidth: number;
      maxWidth: number;
    };
  };
};
