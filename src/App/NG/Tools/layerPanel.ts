import { getStorageItem, setStorageItem } from '../Utils/storage';

const STORAGE_KEY = 'layer_panel_hidden';
const LEGACY_KEYS = ['octo_layer_panel_hidden'];

let isHidden = readStoredPreference();
let controlsInitialised = false;
let observer: MutationObserver | null = null;
const listeners = new Set<(hidden: boolean) => void>();

function readStoredPreference(): boolean {
  try {
    const stored = getStorageItem(STORAGE_KEY, { legacyKeys: LEGACY_KEYS });
    if (stored === null || stored === undefined) {
      return true;
    }
    return stored === 'true';
  } catch (error) {
    console.warn('[Layer Panel] Unable to read stored preference:', error);
    return true;
  }
}

function persistHiddenState(hidden: boolean): void {
  try {
    setStorageItem(STORAGE_KEY, hidden ? 'true' : 'false', { legacyKeys: LEGACY_KEYS });
  } catch (error) {
    console.warn('[Layer Panel] Unable to persist preference:', error);
  }
}

function getLayerPanels(): HTMLElement[] {
  return Array.from(document.getElementsByClassName('neuroglancer-layer-panel')) as HTMLElement[];
}

function applyVisibility(hidden: boolean): void {
  const panels = getLayerPanels();
  panels.forEach((panel) => {
    panel.style.display = hidden ? 'none' : '';
    if (hidden) {
      panel.dataset.layerPanelHidden = 'true';
    } else {
      delete panel.dataset.layerPanelHidden;
    }
  });
}

function ensureObserver(): void {
  if (observer || typeof MutationObserver !== 'function') return;
  try {
    observer = new MutationObserver((mutations) => {
      if (!isHidden) return;
      for (const mutation of mutations) {
        if (mutation.type !== 'childList') continue;
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.classList.contains('neuroglancer-layer-panel') || node.querySelector?.('.neuroglancer-layer-panel')) {
            applyVisibility(true);
          }
        });
      }
    });
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      document.addEventListener(
        'DOMContentLoaded',
        () => {
          if (!observer && typeof MutationObserver === 'function') {
            ensureObserver();
          }
        },
        { once: true }
      );
    }
  } catch (error) {
    console.warn('[Layer Panel] Failed to initialise MutationObserver:', error);
  }
}

function notifyListeners(hidden: boolean): void {
  listeners.forEach((listener) => {
    try {
      listener(hidden);
    } catch (error) {
      console.warn('[Layer Panel] Listener failed:', error);
    }
  });

  try {
    document.dispatchEvent(new CustomEvent('octo:layer-panel-visibility', { detail: { hidden } }));
  } catch (error) {
    console.warn('[Layer Panel] Failed to dispatch visibility event:', error);
  }
}

function scheduleVisibilityApply(hidden: boolean): void {
  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      () => applyVisibility(hidden),
      { once: true }
    );
  } else {
    applyVisibility(hidden);
  }
}

export function isLayerPanelHidden(): boolean {
  return isHidden;
}

export function setLayerPanelHidden(hidden: boolean, { persist = false }: { persist?: boolean } = {}): void {
  isHidden = hidden;
  scheduleVisibilityApply(hidden);
  notifyListeners(hidden);
  if (persist) {
    persistHiddenState(hidden);
  }
}

export function toggleLayerPanelVisibility(): void {
  setLayerPanelHidden(!isHidden, { persist: true });
}

export function onLayerPanelVisibilityChange(listener: (hidden: boolean) => void): () => void {
  listeners.add(listener);
  try {
    listener(isHidden);
  } catch (error) {
    console.warn('[Layer Panel] Listener threw during initial sync:', error);
  }
  return () => {
    listeners.delete(listener);
  };
}

export function initializeLayerPanelControls(): void {
  if (controlsInitialised) return;
  controlsInitialised = true;

  ensureObserver();
  scheduleVisibilityApply(isHidden);
  notifyListeners(isHidden);
}
