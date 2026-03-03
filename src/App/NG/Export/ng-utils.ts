// Helpers to introspect the Neuroglancer viewer without mutating state.

type NGState = any;

type Vector3 = [number, number, number];

const SEG_LAYER_HINTS = ['segmentation', 'labels'];

export function getStateJSON(): NGState {
  try {
    return (window as any)?.viewer?.state?.toJSON?.() ?? {};
  } catch (error) {
    console.warn('[atlas-export] Unable to read viewer state JSON', error);
    return {};
  }
}


function normalizeUnit(value: string | undefined | null): number {
  if (!value) return 1;
  const unit = value.toLowerCase().replace(/\u00b5/g, 'u');
  switch (unit) {
    case 'm':
    case 'meter':
    case 'meters':
      return 1;
    case 'mm':
    case 'millimeter':
    case 'millimeters':
      return 1e-3;
    case 'um':
    case '\u00b5m':
    case 'micrometer':
    case 'micrometers':
    case 'micron':
    case 'microns':
      return 1e-6;
    case 'nm':
    case 'nanometer':
    case 'nanometers':
      return 1e-9;
    case 'angstrom':
    case 'angstroem':
    case 'angstroms':
      return 1e-10;
    default:
      return 1;
  }
}

function toMeters(value: any): number | null {
  if (Array.isArray(value)) {
    const numeric = Number(value[0]);
    if (!Number.isFinite(numeric)) return null;
    const unitScale = normalizeUnit(typeof value[1] === 'string' ? value[1] : undefined);
    return numeric * unitScale;
  }
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function resolveOutputDimensions(layer: any): any | null {
  const queue: any[] = [];
  const seen = new Set<any>();
  queue.push(layer);
  while (queue.length) {
    const current = queue.shift();
    if (!current || seen.has(current)) continue;
    seen.add(current);
    const transform = current?.transform || current?.source?.transform;
    const dims = transform?.outputDimensions || transform?.inputDimensions;
    if (dims) return dims;
    const specDims = current?.spec?.voxelSize || current?.spec?.resolution || current?.voxelSize || current?.resolution;
    if (specDims) {
      if (Array.isArray(specDims)) {
        if (specDims.length >= 3) return specDims;
        return specDims.map((value) => toMeters(value));
      }
      if (typeof specDims === 'object') {
        return specDims;
      }
      return { x: specDims, y: specDims, z: specDims };
    }
    if (Array.isArray(current)) {
      queue.push(...current);
    } else {
      if (current.source) queue.push(current.source);
      if (current.layer) queue.push(current.layer);
      if (current.baseLayer) queue.push(current.baseLayer);
    }
  }
  return null;
}
export function getBaseResolutionMeters(layer: any): Vector3 | null {
  const dims = resolveOutputDimensions(layer);
  if (!dims) return null;
  const extractAxis = (axis: 'x' | 'y' | 'z', index: number): number | null => {
    if (Array.isArray(dims)) {
      return toMeters(dims[index]);
    }
    if (typeof dims === 'object' && dims !== null) {
      if (axis in dims) {
        return toMeters((dims as any)[axis]);
      }
      if (Array.isArray((dims as any).voxelSize)) {
        return toMeters((dims as any).voxelSize[index]);
      }
      if (Array.isArray((dims as any).resolution)) {
        return toMeters((dims as any).resolution[index]);
      }
    }
    return null;
  };
  const x = extractAxis('x', 0);
  const y = extractAxis('y', 1);
  const z = extractAxis('z', 2);
  const axes = [x, y, z];
  const fallback = axes.find((value) => Number.isFinite((value ?? NaN)));
  if (!Number.isFinite((fallback ?? NaN))) return null;
  const resolved = axes.map((value) => (Number.isFinite((value ?? NaN)) ? (value as number) : (fallback as number)));
  return resolved as Vector3;
}

export function resolutionAtMip(mip: number, base: Vector3 | null): Vector3 | null {
  if (!base) return null;
  const factor = Math.pow(2, mip);
  return [base[0] * factor, base[1] * factor, base[2] * factor];
}

export function findLayersByType(state: NGState, type: 'image' | 'segmentation'): any[] {
  const desired = type.toLowerCase();
  const layers = Array.isArray(state?.layers) ? state.layers : [];
  return layers.filter((layer: any) => {
    const kind = String(layer?.type || '').toLowerCase();
    if (!kind) return false;
    if (desired === 'segmentation') {
      return SEG_LAYER_HINTS.some((hint) => kind.includes(hint));
    }
    return kind.includes(desired);
  });
}

export function getSelectedSegmentIds(): Array<number | string> {
  const anyWin = window as any;
  const ontologyCandidate = anyWin?.ontologyUI || anyWin?.__ontology;
  const methodNames = ['getCheckedSegmentIds', 'getCheckedIds', 'getSelectedSegmentIds', 'getVisibleSegmentIds'];
  for (const name of methodNames) {
    const method = ontologyCandidate?.[name];
    if (typeof method === 'function') {
      try {
        const result = method.call(ontologyCandidate);
        if (Array.isArray(result) && result.length) {
          return normalizeIds(result);
        }
      } catch (error) {
        console.warn(`[atlas-export] Failed to read segment ids via ${name}`, error);
      }
    }
  }

  const state = getStateJSON();
  const segLayer = findLayersByType(state, 'segmentation')[0] || {};
  const candidates = segLayer.selectedSegmentIds || segLayer.visibleSegments || segLayer.segments || [];
  if (!candidates || !Array.isArray(candidates)) return [];
  return normalizeIds(candidates);
}

export function extractPrecomputedUrl(layer: any): string | null {
  if (!layer) return null;
  const src = layer.source ?? layer.url ?? layer.layerSource;
  if (Array.isArray(src)) {
    const first = src.find((entry) => typeof entry === 'string');
    if (typeof first === 'string') return first;
  }
  if (typeof src === 'string') return src;
  if (src && typeof src === 'object') {
    if (typeof src.url === 'string') return src.url;
    if (src.url && typeof src.url === 'object') {
      if (typeof src.url.url === 'string') return src.url.url;
      if (typeof src.url.path === 'string') return src.url.path;
    }
  }
  return null;
}

export function mToMicronsStr(valueMeters: number | null | undefined): string {
  if (!Number.isFinite(valueMeters || 0)) return '?';
  const microns = (valueMeters as number) * 1e6;
  if (!Number.isFinite(microns)) return '?';
  if (Math.abs(microns) >= 0.1) {
    return `${microns.toFixed(1)} μm`;
  }
  return `${microns.toExponential(1)} μm`;
}

function normalizeIds(ids: any[]): Array<number | string> {
  const seen = new Set<string>();
  const out: Array<number | string> = [];
  ids.forEach((value) => {
    if (value === null || value === undefined) return;
    const str = String(value).replace(/,/g, '').trim();
    if (!str) return;
    if (str.startsWith('!')) return;
    if (seen.has(str)) return;
    seen.add(str);
    const num = Number(str);
    if (Number.isSafeInteger(num)) {
      out.push(num);
    } else {
      out.push(str);
    }
  });
  return out;
}
