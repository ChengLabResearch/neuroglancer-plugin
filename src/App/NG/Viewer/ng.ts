// @ts-nocheck

export type LayerManager = {
  managedLayers?: any;
  layers?: any;
  getLayerByName?: (name: string) => any;
  atomic?: boolean;
  layersChanged?: { add: (cb: (...args: any[]) => void) => void };
};

export type NeuroglancerViewer = {
  layerManager?: LayerManager;
  selectedLayer?: any;
};

function toArray(collection: any): any[] {
  if (!collection) return [];
  if (Array.isArray(collection)) return collection;
  if (typeof collection.values === 'function') {
    try {
      return Array.from(collection.values());
    } catch (_) {
      return [];
    }
  }
  if (typeof collection[Symbol.iterator] === 'function') {
    try {
      return Array.from(collection as Iterable<any>);
    } catch (_) {
      return [];
    }
  }
  return [];
}

export function listManagedLayers(manager?: LayerManager | null): any[] {
  if (!manager) return [];
  const entries: any[] = [];
  entries.push(...toArray(manager.managedLayers));
  entries.push(...toArray(manager.layers));
  return entries;
}

export function ensureLayerLookup(viewer?: NeuroglancerViewer | null): void {
  const manager = viewer?.layerManager;
  if (!manager || typeof manager.getLayerByName === 'function') {
    return;
  }

  manager.getLayerByName = function getLayerByName(name: string): any {
    const entries = listManagedLayers(manager);
    for (const entry of entries) {
      const candidate = entry?.layer ?? entry;
      const candidateName = candidate?.name ?? candidate?.displayState?.name;
      if (candidateName === name) {
        return entry;
      }
    }
    return null;
  };
}

export function getLayerByName(viewer: NeuroglancerViewer | null | undefined, name: string): any {
  if (!viewer) return null;
  ensureLayerLookup(viewer);
  return viewer.layerManager?.getLayerByName?.(name) ?? null;
}

export function getDisplayState(managedLayer: any): any {
  if (!managedLayer) return null;
  return managedLayer.displayState || managedLayer.layer?.displayState || null;
}

export function getSegmentationState(managedLayer: any): any {
  const displayState = getDisplayState(managedLayer);
  return displayState?.segmentationGroupState?.value || null;
}

export function getVisibleSegments(managedLayer: any): any {
  return getSegmentationState(managedLayer)?.visibleSegments || null;
}

export function mutateVisibleSegments(managedLayer: any, mutator: (segments: any) => void): void {
  const segState = getSegmentationState(managedLayer);
  const target = segState?.visibleSegments;
  if (!target) return;
  mutator(target);
  target.changed?.dispatch?.();
}

export function dispatchVisibleSegmentsChanged(managedLayer: any): void {
  const segmentationState = getSegmentationState(managedLayer);
  segmentationState?.visibleSegments?.changed?.dispatch?.();
}

export function setVisibleSegments(managedLayer: any, segments: Iterable<any>): void {
  const segState = getSegmentationState(managedLayer);
  if (!segState?.visibleSegments) return;
  const target = segState.visibleSegments;
  if (typeof target.clear === 'function') {
    target.clear();
  }
  for (const value of segments) {
    try {
      target.add?.(value);
    } catch (_) {
      target.add?.(String(value));
    }
  }
  dispatchVisibleSegmentsChanged(managedLayer);
}

export function getLayerManager(viewer?: NeuroglancerViewer | null): LayerManager | null {
  return viewer?.layerManager ?? null;
}

export function forEachLayer(viewer: NeuroglancerViewer | null | undefined, callback: (entry: any) => void): void {
  const manager = getLayerManager(viewer);
  if (!manager) return;
  listManagedLayers(manager).forEach((entry) => {
    try {
      callback(entry);
    } catch (error) {
      console.warn('[viewer/ng] Layer callback failed', error);
    }
  });
}
