/** Internal build contract; not a stable public API. */
export type CoreIcon = {
  name: string;
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
  frames?: Partial<Record<'square' | 'circle', CoreFrame>>;
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

export type CoreFrame = {
  metadata: CoreIcon['metadata'];
  root: CoreIcon['root'];
  parts: string[];
  filled: { metadata: CoreIcon['metadata']; root: CoreIcon['root']; parts: string[] };
};
