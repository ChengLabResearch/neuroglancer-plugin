// @ts-nocheck

import { getStorageItem, setStorageItem } from '../Utils/storage';

const STORAGE_KEY = 'side_panels_hidden';
let initialized = false;
let hidden = false;
let updatingViewerPanels = false;
let pendingViewerPanelValue: boolean | null = null;
// Defer side-panel visibility updates until the Neuroglancer viewer API is ready.
let viewerSyncTimer: number | null = null;
const listeners = new Set<(value: boolean) => void>();

function readStoredPreference(defaultHidden: boolean): boolean {
  try {
    const stored = getStorageItem(STORAGE_KEY);
    if (stored === null || stored === undefined) {
      return defaultHidden;
    }
    return stored === 'true';
  } catch (error) {
    console.warn('[Side Panels] Unable to read stored preference:', error);
    return defaultHidden;
  }
}

function scheduleViewerSync(): void {
  if (viewerSyncTimer !== null) return;
  const attempt = () => {
    viewerSyncTimer = null;
    if (pendingViewerPanelValue === null) return;
    const value = pendingViewerPanelValue;
    pendingViewerPanelValue = null;
    syncViewerPanels(value);
  };
  viewerSyncTimer = window.setTimeout(attempt, 60);
}

function syncViewerPanels(value: boolean): void {
  if (updatingViewerPanels) return;
  const viewer = (window as any)?.viewer;
  const stateApi = viewer?.state;
  if (!stateApi?.toJSON || !stateApi.restoreState) {
    pendingViewerPanelValue = value;
    if (typeof window !== 'undefined' && window.setTimeout) {
      scheduleViewerSync();
    }
    return;
  }

  try {
    updatingViewerPanels = true;
    const stateConfig = stateApi.toJSON();
    if (!stateConfig || typeof stateConfig !== 'object') return;

    const targetVisible = value ? false : true;
    let changed = false;

    const ensurePanelVisibility = (key: string) => {
      const panel = stateConfig[key];
      if (panel && typeof panel === 'object') {
        if (panel.visible !== targetVisible) {
          stateConfig[key] = { ...panel, visible: targetVisible };
          changed = true;
        }
      } else {
        stateConfig[key] = { visible: targetVisible };
        changed = true;
      }
    };

    ensurePanelVisibility('settingsPanel');
    ensurePanelVisibility('layerListPanel');

    const selected = stateConfig.selectedLayer;
    if (selected && typeof selected === 'object') {
      if (selected.visible !== targetVisible) {
        stateConfig.selectedLayer = { ...selected, visible: targetVisible };
        changed = true;
      }
    } else if (typeof selected === 'string') {
      stateConfig.selectedLayer = { layer: selected, visible: targetVisible };
      changed = true;
    } else if (!selected || typeof selected !== 'object') {
      stateConfig.selectedLayer = { visible: targetVisible };
      changed = true;
    }

    if (changed) {
      stateApi.restoreState(stateConfig);
    }
  } catch (error) {
    console.warn('[Side Panels] Failed to sync viewer panel visibility:', error);
  } finally {
    updatingViewerPanels = false;
  }
}

function applyHiddenState(value: boolean): void {
  if (typeof document !== 'undefined' && document.body) {
    document.body.dataset.octoSidePanelsHidden = value ? '1' : '0';
  }
  syncViewerPanels(value);
}

function notifyListeners(value: boolean): void {
  listeners.forEach((listener) => {
    try {
      listener(value);
    } catch (error) {
      console.warn('[Side Panels] Listener failed:', error);
    }
  });
}

export function isSidePanelsHidden(): boolean {
  return hidden;
}

export function setSidePanelsHidden(value: boolean, { persist = true }: { persist?: boolean } = {}): void {
  hidden = value;
  applyHiddenState(hidden);
  if (persist) {
    try {
      setStorageItem(STORAGE_KEY, hidden ? 'true' : 'false');
    } catch (error) {
      console.warn('[Side Panels] Failed to persist preference:', error);
    }
  }
  notifyListeners(hidden);
}

export function toggleSidePanelsHidden(): void {
  setSidePanelsHidden(!hidden);
}

export function onSidePanelsHiddenChange(listener: (value: boolean) => void): () => void {
  listeners.add(listener);
  try {
    listener(hidden);
  } catch (error) {
    console.warn('[Side Panels] Listener threw during initial sync:', error);
  }
  return () => listeners.delete(listener);
}

export function initializeSidePanelControls({ defaultHidden = false, honorStoredPreference = true } = {}): void {
  if (initialized) return;
  initialized = true;
  hidden = honorStoredPreference ? readStoredPreference(defaultHidden) : defaultHidden;

  const runApply = () => {
    applyHiddenState(hidden);
    notifyListeners(hidden);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runApply, { once: true });
  } else {
    runApply();
  }
}

export function getStoredSidePanelPreference(): boolean | null {
  try {
    const stored = getStorageItem(STORAGE_KEY);
    if (stored === null || stored === undefined) return null;
    return stored === 'true';
  } catch (error) {
    console.warn('[Side Panels] Unable to read stored preference:', error);
    return null;
  }
}
