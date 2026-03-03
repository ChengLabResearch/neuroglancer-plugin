export type FigurePanelKind = 'state' | 'external';

export interface FigurePanelEntry {
  figure: string;
  panel: string;
  description: string;
  kind: FigurePanelKind;
  stateId?: string;
  externalUrl?: string;
  thumbnail?: string;
  preview?: string;
}

const BASE_VIEWER_URL = 'https://cephalopod.team/histotomography/Octo9/Neuroglancer/?j=';
const THUMB_ROOT = 'figure-thumbs/';
const PREVIEW_ROOT = 'figure-previews/';

function buildStateEntry(
  figure: string,
  panel: string,
  stateId: string,
  description = 'Neuroglancer preset',
  overrides: Partial<FigurePanelEntry> = {}
): FigurePanelEntry {
  return {
    figure,
    panel,
    description,
    kind: 'state',
    stateId,
    externalUrl: `${BASE_VIEWER_URL}${encodeURIComponent(stateId)}`,
    ...overrides,
  };
}

function buildExternalEntry(
  figure: string,
  panel: string,
  description: string,
  overrides: Partial<FigurePanelEntry> = {}
): FigurePanelEntry {
  return {
    figure,
    panel,
    description,
    kind: 'external',
    ...overrides,
  };
}

export const FIGURE_PANEL_CATALOG: FigurePanelEntry[] = [
  // Figure 1
  buildExternalEntry('1', 'A', 'Blender render', {
    thumbnail: `${THUMB_ROOT}Figure_1A.jpg`,
    preview: `${PREVIEW_ROOT}Figure_1A.jpg`,
  }),
  buildStateEntry('1', 'B_v2025', '1B_v2025', 'Neuroglancer preset', {
    thumbnail: `${THUMB_ROOT}Figure_1B.jpg`,
    preview: `${PREVIEW_ROOT}Figure_1B.jpg`,
  }),
  buildStateEntry('1', 'C_v2025', '1C_v2025', 'Neuroglancer preset', {
    thumbnail: `${THUMB_ROOT}Figure_1C.jpg`,
    preview: `${PREVIEW_ROOT}Figure_1C.jpg`,
  }),
  buildStateEntry('1', 'D_v2025', '1D_v2025', 'Neuroglancer preset', {
    thumbnail: `${THUMB_ROOT}Figure_1D.jpg`,
    preview: `${PREVIEW_ROOT}Figure_1D.jpg`,
  }),
  buildStateEntry('1', 'E_v2025', '1E_v2025', 'Neuroglancer preset', {
    thumbnail: `${THUMB_ROOT}Figure_1E.jpg`,
    preview: `${PREVIEW_ROOT}Figure_1E.jpg`,
  }),

  // Figure 2
  buildExternalEntry('2', 'A', 'Dragonfly render', {
    thumbnail: `${THUMB_ROOT}Figure_2A.jpg`,
    preview: `${PREVIEW_ROOT}Figure_2A.jpg`,
  }),
  buildStateEntry('2', 'B_v2025', '2B_v2025', 'Neuroglancer preset', {
    thumbnail: `${THUMB_ROOT}Figure_2B.jpg`,
    preview: `${PREVIEW_ROOT}Figure_2B.jpg`,
  }),
  buildStateEntry('2', 'B_inset', '2B_inset', 'Neuroglancer preset', {
    thumbnail: `${THUMB_ROOT}Figure_2B_inset.jpg`,
    preview: `${PREVIEW_ROOT}Figure_2B_inset.jpg`,
  }),

  // Figure 3
  buildStateEntry('3', 'A_v2025', '3A_v2025', 'Neuroglancer preset', {
    thumbnail: `${THUMB_ROOT}Figure_3A.jpg`,
    preview: `${PREVIEW_ROOT}Figure_3A.jpg`,
  }),
  buildStateEntry('3', 'B_v2025', '3B_v2025', 'Neuroglancer preset', {
    thumbnail: `${THUMB_ROOT}Figure_3B.jpg`,
    preview: `${PREVIEW_ROOT}Figure_3B.jpg`,
  }),
  buildStateEntry('3', 'C_v2025', '3C_v2025', 'Neuroglancer preset', {
    thumbnail: `${THUMB_ROOT}Figure_3C.jpg`,
    preview: `${PREVIEW_ROOT}Figure_3C.jpg`,
  }),
  buildExternalEntry('3', 'D', 'Dragonfly render', {
    thumbnail: `${THUMB_ROOT}Figure_3D.jpg`,
    preview: `${PREVIEW_ROOT}Figure_3D.jpg`,
  }),
  buildExternalEntry('3', 'E', 'Dragonfly render', {
    thumbnail: `${THUMB_ROOT}Figure_3E.jpg`,
    preview: `${PREVIEW_ROOT}Figure_3E.jpg`,
  }),

  // Figure 4
  buildExternalEntry('4', 'A', 'Dragonfly render', {
    thumbnail: `${THUMB_ROOT}Figure_4A.jpg`,
    preview: `${PREVIEW_ROOT}Figure_4A.jpg`,
  }),
  buildExternalEntry('4', 'B', 'Dragonfly render', {
    thumbnail: `${THUMB_ROOT}Figure_4B.jpg`,
    preview: `${PREVIEW_ROOT}Figure_4B.jpg`,
  }),

  // Supplementary Figure S1
  buildExternalEntry('S1', 'Top Left', 'Photograph'),
  buildExternalEntry('S1', 'Top Right', 'Photograph'),
  buildExternalEntry('S1', 'Bottom Left', 'Photograph'),
  buildExternalEntry('S1', 'Bottom Right', 'Photograph'),

  // Supplementary Figure S2
  buildExternalEntry('S2', 'A', 'Graph (PowerPoint)'),
  buildExternalEntry('S2', 'B', 'Table (PowerPoint)'),
  buildExternalEntry('S2', 'C', 'X-ray projection composite (FIJI / ImageJ2 / PowerPoint)'),

  // Supplementary Figure S3
  buildExternalEntry('S3', 'A', '3D render'),
  buildExternalEntry('S3', 'B', 'X-ray projection'),
  buildExternalEntry('S3', "B'", 'Reconstructed slice (off-axis)'),
  buildExternalEntry('S3', 'C', 'Reconstructed slice crop (off-axis)'),
  buildExternalEntry('S3', 'D', 'Reconstructed slice crop (off-axis)'),
  buildExternalEntry('S3', 'E', 'Graph (Python)'),
  buildExternalEntry('S3', 'A-G', 'Screen capture of Neuroglancer'),

  // Supplementary Figure S4
  buildStateEntry('S4', 'A', 'S4A'),
  buildStateEntry('S4', 'B', 'S4B'),
  buildStateEntry('S4', 'C', 'S4C'),
  buildStateEntry('S4', 'D', 'S4D'),
  buildStateEntry('S4', 'E', 'S4E'),

  // Supplementary Figure S5
  buildStateEntry('S5', 'A', 'S5A'),
  buildExternalEntry('S5', 'B', 'Confocal image'),
  buildExternalEntry('S5', 'C', 'H&E digital scan'),
  buildStateEntry('S5', 'L1R1', 'L1R1'),
  buildStateEntry('S5', 'L2L1', 'L2L1'),
  buildStateEntry('S5', 'L3L2', 'L3L2'),
  buildStateEntry('S5', 'L4L3', 'L4L3'),
  buildStateEntry('S5', 'R1R2', 'R1R2'),
  buildStateEntry('S5', 'R2R3', 'R2R3'),
];

export function getFigureLabel(figure: string): string {
  return /^S/i.test(figure) ? `Supplement ${figure.toUpperCase()}` : `Figure ${figure}`;
}
