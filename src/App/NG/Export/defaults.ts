// Utilities for reading/persisting export defaults with safe fallbacks.

export interface AtlasExportDefaults {
  imageLayerName?: string;
  segmentationLayerName?: string;
  readMipImage?: number;
  readMipSeg?: number;
  marginVoxSeg?: [number, number, number];
  saveImage?: boolean;
  saveSeg?: boolean;
  saveMask?: boolean;
  maskAs1Bit?: boolean;
  maskPerSlice?: boolean;
  saveCsv?: boolean;
  csvMaxRows?: number | null;
  segZeroNonSelected?: boolean;
  segArrayDtype?: 'uint16' | 'uint32' | 'source';
  transposeXY?: boolean;
  compression?: 'none' | 'zlib' | 'lzw' | 'zstd' | 'packbits';
  predictor2?: boolean;
  memoryBudgetGB?: number;
  wholeSaveStack?: boolean;
  wholeCastDtype?: 'uint16' | 'source';
}

declare global {
  interface Window {
    __atlasExportDefaults?: AtlasExportDefaults;
  }
}

const STORAGE_KEY = 'atlas.export.v1';

export const FALLBACKS: Required<AtlasExportDefaults> = {
  imageLayerName: '',
  segmentationLayerName: '',
  readMipImage: 0,
  readMipSeg: 0,
  marginVoxSeg: [16, 16, 8],
  saveImage: true,
  saveSeg: true,
  saveMask: false,
  maskAs1Bit: false,
  maskPerSlice: false,
  saveCsv: false,
  csvMaxRows: null,
  segZeroNonSelected: true,
  segArrayDtype: 'uint16',
  transposeXY: true,
  compression: 'zlib',
  predictor2: true,
  memoryBudgetGB: 3,
  wholeSaveStack: true,
  wholeCastDtype: 'source',
};

export function loadDefaults(): Required<AtlasExportDefaults> {
  const persisted = readPersisted();
  const provided = typeof window !== 'undefined' ? window.__atlasExportDefaults || {} : {};
  return {
    ...FALLBACKS,
    ...provided,
    ...persisted,
  } as Required<AtlasExportDefaults>;
}

export function persistDefaults(update: Partial<AtlasExportDefaults>) {
  if (typeof window === 'undefined') return;
  const current = loadDefaults();
  const next = { ...current, ...update } as AtlasExportDefaults;
  try {
    window.localStorage?.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (error) {
    console.warn('[atlas-export] Failed to persist defaults', error);
  }
}

function readPersisted(): Partial<AtlasExportDefaults> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage?.getItem(STORAGE_KEY);
    if (!raw) return {};
    return safelyParse(raw) as Partial<AtlasExportDefaults>;
  } catch (error) {
    console.warn('[atlas-export] Failed to read persisted defaults', error);
    return {};
  }
}

function safelyParse(value: string) {
  try {
    return JSON.parse(value);
  } catch (_) {
    return {};
  }
}
