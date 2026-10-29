/** Internal build contract; not a stable public API. */
export type CoreIcon = {
  name: string;
  label: string;
  group: string;
  baseStroke: number;
  adjustableStroke: boolean;
  figma: { outline: string; filled: string };
  metadata: {
    name: string;
    description: string;
    tags: string[];
    authorship: string;
    construction: string;
    supportsBold?: boolean;
    filledTreatment?: 'boxed-cutout' | 'bold-stroke' | 'solid-head';
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
  filled?: {
    metadata: CoreIcon['metadata'];
    root: CoreIcon['root'];
    parts: string[];
  };
};
