// @ts-nocheck

function distanceSq(p1: number[], p2: number[]): number {
  const dx = p1[0] - p2[0];
  const dy = p1[1] - p2[1];
  const dz = p1[2] - p2[2];
  return dx * dx + dy * dy + dz * dz;
}

function sortPointsByProximity(points: number[][]): number[][] {
  if (points.length < 2) return points;

  const remaining = [...points];
  const sorted = [] as number[][];

  let current = remaining.shift()!;
  sorted.push(current);

  while (remaining.length) {
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < remaining.length; i += 1) {
      const distance = distanceSq(current, remaining[i]);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = i;
      }
    }

    current = remaining.splice(nearestIndex, 1)[0];
    sorted.push(current);
  }

  return sorted;
}

interface LineToggleState {
  active: boolean;
  originalName: string | null;
  lineLayerName: string | null;
}

declare global {
  interface Window {
    __lineToggle?: LineToggleState;
  }
}

function ensureToggleState(): LineToggleState {
  if (!window.__lineToggle) {
    window.__lineToggle = { active: false, originalName: null, lineLayerName: null };
  }
  return window.__lineToggle;
}

export async function toggleLineMode(): Promise<void> {
  try {
    const viewer = window.viewer;
    if (!viewer) {
      alert('Neuroglancer viewer not ready yet.');
      return;
    }

    const selectedManagedLayer = viewer.selectedLayer;
    if (!selectedManagedLayer?.layer) {
      alert('Select an annotation layer first (right-click the tab).');
      return;
    }

    const layerName = selectedManagedLayer.layer.name;
    const config = viewer.state.toJSON();
    const layers = Array.isArray(config.layers) ? config.layers : [];
    const layerSpec = layers.find((layer) => layer?.name === layerName);

    if (!layerSpec) {
      alert(`Layer specification for "${layerName}" not found in the current state.`);
      return;
    }

    if (layerSpec.type !== 'annotation') {
      alert(`Selected layer "${layerName}" is type "${layerSpec.type}", not "annotation".`);
      return;
    }

    const toggleState = ensureToggleState();

    if (toggleState.active && toggleState.originalName === layerName) {
      const updatedState = viewer.state.toJSON();
      updatedState.layers = (updatedState.layers || []).filter((layer: any) => layer?.name !== toggleState.lineLayerName);
      for (const layer of updatedState.layers || []) {
        if (layer?.name === layerName) {
          layer.visible = true;
          break;
        }
      }
      viewer.state.restoreState(updatedState);
      toggleState.active = false;
      toggleState.originalName = null;
      toggleState.lineLayerName = null;
      const button = document.getElementById('toggleLineModeButton');
      if (button) button.textContent = 'Points → Lines';
      return;
    }

    const annotations = Array.isArray(layerSpec?.source?.annotations)
      ? layerSpec.source.annotations
      : Array.isArray(layerSpec?.annotations)
        ? layerSpec.annotations
        : [];

    if (!annotations.length) {
      alert(`No annotations found on layer "${layerName}".`);
      return;
    }

    const points = annotations
      .map((annotation: any) => {
        if (annotation?.type === 'point' && Array.isArray(annotation.point) && annotation.point.length === 3) {
          return annotation.point;
        }
        if (!annotation?.type && Array.isArray(annotation?.point) && annotation.point.length === 3) {
          return annotation.point;
        }
        return null;
      })
      .filter((value): value is number[] => Array.isArray(value));

    if (points.length < 2) {
      alert('Need at least 2 point annotations to form line segments.');
      return;
    }

    const sortedPoints = sortPointsByProximity(points);
    const lineAnnotations = [] as any[];
    for (let index = 1; index < sortedPoints.length; index += 1) {
      const createId = () => (
        typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : `${Math.random().toString(36).slice(2)}${Date.now()}`
      );
      lineAnnotations.push({
        type: 'line',
        pointA: sortedPoints[index - 1],
        pointB: sortedPoints[index],
        id: createId(),
      });
    }

    const updatedState = viewer.state.toJSON();
    const newLayerName = `${layerName} — Lines`;
    updatedState.layers = (updatedState.layers || []).filter((layer: any) => layer?.name !== newLayerName);

    const clone = (value: unknown) => {
      if (!value || typeof value !== 'object') return undefined;
      try {
        return JSON.parse(JSON.stringify(value));
      } catch (error) {
        console.warn('[Line Mode] Failed to clone source transform:', error);
        return undefined;
      }
    };

    const newLayerSpec: any = {
      type: 'annotation',
      name: newLayerName,
      visible: true,
      tab: 'annotations',
      tool: 'annotateLine',
      annotations: lineAnnotations,
      source: (() => {
        const source = layerSpec.source;
        if (source && typeof source === 'object') {
          const cloned = clone(source);
          if (cloned) return cloned;
        }
        const fallback: any = { url: 'local://annotations' };
        try {
          const reference = (updatedState.layers || []).find((layer: any) =>
            layer?.source?.transform?.outputDimensions
          );
          if (reference) {
            fallback.transform = clone(reference.source.transform);
          }
        } catch (error) {
          console.warn('[Line Mode] Failed to copy transform from reference layer:', error);
        }
        return fallback;
      })(),
    };

    if (Array.isArray(layerSpec.voxelSize)) {
      newLayerSpec.voxelSize = layerSpec.voxelSize;
    }

    for (const layer of updatedState.layers || []) {
      if (layer?.name === layerName) {
        layer.visible = false;
        break;
      }
    }

    updatedState.layers.push(newLayerSpec);
    viewer.state.restoreState(updatedState);

    toggleState.active = true;
    toggleState.originalName = layerName;
    toggleState.lineLayerName = newLayerName;

    const button = document.getElementById('toggleLineModeButton');
    if (button) button.textContent = 'Lines → Points';
  } catch (error) {
    console.error('toggleLineMode error:', error);
    alert('Toggle failed. See console for details.');
  }
}

