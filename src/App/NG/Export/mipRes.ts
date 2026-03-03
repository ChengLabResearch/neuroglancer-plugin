export type PrecomputedScale = {
  size?: number[];
  resolution?: number[];
  voxel_size?: number[];
  voxel_offset?: number[];
  key?: string;
};

export type PrecomputedInfo = {
  type?: 'image' | 'segmentation';
  data_type?: string;
  num_channels?: number;
  scales: PrecomputedScale[];
};

type MipOption = { value: number; label: string };

type MaybeLayer = {
  source?: unknown;
};

export function extractPrecomputedUrl(source: unknown): string | null {
  if (!source) return null;

  const visit = (input: unknown): string | null => {
    if (!input) return null;
    if (typeof input === 'string') {
      return sanitiseUrl(input);
    }
    if (Array.isArray(input)) {
      for (const entry of input) {
        const resolved = visit(entry);
        if (resolved) return resolved;
      }
      return null;
    }
    if (typeof input === 'object') {
      const obj = input as Record<string, unknown>;
      if (obj.url) {
        const resolved = visit(obj.url);
        if (resolved) return resolved;
      }
      if (obj.source) {
        const resolved = visit(obj.source);
        if (resolved) return resolved;
      }
    }
    return null;
  };

  return visit(source);
}

function sanitiseUrl(url: string): string {
  const match = url.match(/^precomputed:\/\/(.+)$/i);
  const raw = match ? match[1] : url;
  const hashSplit = raw.split('#')[0];
  const querySplit = hashSplit.split('?')[0];
  return querySplit;
}

const infoCache = new Map<string, PrecomputedInfo | null>();

export async function fetchPrecomputedInfo(rawUrl: string): Promise<PrecomputedInfo | null> {
  if (!rawUrl) return null;
  if (infoCache.has(rawUrl)) {
    return infoCache.get(rawUrl) ?? null;
  }

  const base = rawUrl.endsWith('/') ? rawUrl : `${rawUrl}/`;
  const infoUrl = `${base}info`;
  try {
    const response = await fetch(infoUrl, { mode: 'cors' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const json = (await response.json()) as PrecomputedInfo;
    if (!json || !Array.isArray(json.scales)) {
      throw new Error('Missing scales array');
    }
    infoCache.set(rawUrl, json);
    return json;
  } catch (error) {
    console.warn('[MIP labels] info fetch failed:', infoUrl, error);
    infoCache.set(rawUrl, null);
    return null;
  }
}

function nmToUm(nm: number): number {
  return nm / 1000;
}

export function labelForScale(scale: PrecomputedScale, mipIndex: number): string {
  const resolution = Array.isArray(scale.voxel_size) ? scale.voxel_size : scale.resolution;
  if (Array.isArray(resolution) && Number.isFinite(resolution[0])) {
    const microns = nmToUm(Number(resolution[0]));
    const text = microns >= 0.1 ? microns.toFixed(1) : microns.toPrecision(2);
    return `MIP ${mipIndex} — ${text} µm`;
  }
  return `MIP ${mipIndex} — ?`;
}

export function mipOptionsFromInfo(info: PrecomputedInfo): MipOption[] {
  return info.scales.map((scale, index) => ({
    value: index,
    label: labelForScale(scale, index),
  }));
}

export function mipOptionsFromStateTransform(layer: MaybeLayer | undefined, maxMips = 8): MipOption[] {
  const baseMeters = resolveBaseMeters(layer);
  if (!Number.isFinite(baseMeters ?? NaN)) {
    return Array.from({ length: maxMips }, (_, index) => ({ value: index, label: `MIP ${index} — ?` }));
  }
  const baseMicrons = (baseMeters as number) * 1e6;
  return Array.from({ length: maxMips }, (_, index) => {
    const microns = baseMicrons * Math.pow(2, index);
    const text = microns >= 0.1 ? microns.toFixed(1) : microns.toPrecision(2);
    return { value: index, label: `MIP ${index} — ${text} µm` };
  });
}

function resolveBaseMeters(layer: MaybeLayer | undefined): number | null {
  if (!layer) return null;
  const candidates: unknown[] = [];
  if (layer.source) candidates.push(layer.source);
  const transform = (layer as any)?.source?.transform || (layer as any)?.transform;
  if (transform) candidates.push(transform);

  while (candidates.length) {
    const current = candidates.shift();
    if (!current) continue;
    if (typeof current === 'object') {
      const obj = current as Record<string, unknown>;
      if (obj.outputDimensions || obj.inputDimensions) {
        const dims = (obj.outputDimensions || obj.inputDimensions) as Record<string, unknown>;
        const axis = dims.x ?? dims.X;
        const meters = metersFromAxis(axis);
        if (Number.isFinite(meters)) return meters as number;
      }
      if (obj.url) candidates.push(obj.url);
      if (obj.source) candidates.push(obj.source);
    }
  }
  return null;
}

function metersFromAxis(axis: unknown): number | null {
  if (Array.isArray(axis) && axis.length > 0) {
    const numeric = Number(axis[0]);
    if (!Number.isFinite(numeric)) return null;
    const unit = typeof axis[1] === 'string' ? axis[1].toLowerCase() : 'm';
    return numeric * unitToMeters(unit);
  }
  if (typeof axis === 'number' && Number.isFinite(axis)) {
    return axis;
  }
  return null;
}

function unitToMeters(unit: string | undefined): number {
  if (!unit) return 1;
  switch (unit) {
    case 'm':
    case 'meter':
    case 'meters':
      return 1;
    case 'mm':
    case 'millimeter':
    case 'millimeters':
      return 1e-3;
    case 'µm':
    case 'um':
    case 'micrometer':
    case 'micrometers':
    case 'micron':
    case 'microns':
      return 1e-6;
    case 'nm':
    case 'nanometer':
    case 'nanometers':
      return 1e-9;
    default:
      return 1;
  }
}
