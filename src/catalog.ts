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
  };
  root: { tag: string; attrs: Record<string, string>; children: CoreIcon['root'][] };
  parts: string[];
  motion?: MotionRecipe;
  filled?: { metadata: CoreIcon['metadata']; root: CoreIcon['root']; parts: string[] };
};
