// @ts-nocheck

import { CSV_URL, DEFAULT_STATE_URL, TARGET_LAYER_NAME, NEUROGLANCER_SCRIPT_URLS } from '../config';
import { setUrlUpdatesEnabled } from '../Utils/url';
import { buildOntologyFromCSV, Ontology, parseSegmentIdString } from '../Ontology/core';
import type {
  OntologyDict,
  OntologyTree,
  SegmentColorMap,
  SegmentPropertyMap,
} from '../Ontology/types';
import { OntologyUI } from '../Ontology/ui';
import { createDynamicToolIcon } from '../Tools/dynamicMenu';
import { toggleMuteNonImageLayers } from '../Tools/muteLayers';
import { setInitialViewState } from '../Tools/home';
import { OctoEnhancements } from '../Enhancements';
import { initializeSidePanelControls, getStoredSidePanelPreference } from '../Tools/sidePanels';
import { setLayerPanelHidden } from '../Tools/layerPanel';
import { installDevChunkLogging } from './devChunkLogs';
import { ensureLayerLookup, listManagedLayers } from './ng';
import { registerOntologyUI } from '../Ontology/hoverBridge';

type NeuroglancerJsonState = Record<string, any>;

type OntologyArtifacts = {
  tree: OntologyTree;
  dict: OntologyDict;
  segmentColors: SegmentColorMap;
  segmentProperties: SegmentPropertyMap;
};

type NeuroglancerViewer = {
  state: {
    restoreState: (state: NeuroglancerJsonState) => void;
    toJSON: () => NeuroglancerJsonState;
  };
  layerManager?: {
    atomic?: boolean;
    layers?: any;
    managedLayers?: any;
    layersChanged?: {
      add: (cb: (...args: any[]) => void) => void;
    };
    getLayerByName?: (name: string) => any;
  };
  navigationState?: any;
  perspectiveNavigationState?: any;
  selectedLayer?: any;
};

declare global {
  interface Window {
    viewer?: NeuroglancerViewer;
    ontologyUI?: OntologyUI;
    OctoEnhancements?: typeof OctoEnhancements;
  }
}

let hotkeysAttached = false;

if (import.meta.env.DEV) {
  installDevChunkLogging();
}

let neuroglancerLoadPromise: Promise<void> | null = null;

const SIDE_PANEL_MOBILE_BREAKPOINT = 900;

type RuntimeSegmentPropertyMap = Map<bigint, { label: string; description?: string }>;

function loadScript(url: string): Promise<void> {
  const absolute = new URL(url, window.location.href).href;
  return new Promise((resolve, reject) => {
    const existing = Array.from(document.getElementsByTagName('script')).find((script) => script.src === absolute);
    if (existing && existing.hasAttribute('data-octo-loader')) {
      if ((existing as HTMLScriptElement).dataset.loaded === 'true') {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error(`Failed to load script ${url}`)), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = absolute;
    script.async = false;
    script.defer = false;
    script.dataset.octoLoader = 'true';
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      resolve();
    }, { once: true });
    script.addEventListener('error', () => reject(new Error(`Failed to load script ${url}`)), { once: true });
    document.head.appendChild(script);
  });
}

function ensureNeuroglancerScriptsLoaded(): Promise<void> {
  if (!neuroglancerLoadPromise) {
    neuroglancerLoadPromise = NEUROGLANCER_SCRIPT_URLS.reduce<Promise<void>>(
      (chain, url) => chain.then(() => loadScript(url)),
      Promise.resolve()
    );
  }
  return neuroglancerLoadPromise;
}

async function fetchJson(url: string): Promise<NeuroglancerJsonState> {
  const response = await fetch(url, { cache: 'no-cache' });
  if (!response.ok) {
    throw new Error(`Failed to fetch JSON state at ${url}: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, { cache: 'no-cache' });
  if (!response.ok) {
    throw new Error(`Failed to fetch text at ${url}: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

function waitForViewer(timeoutMs = 6000, intervalMs = 100): Promise<NeuroglancerViewer> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = window.setInterval(() => {
      const instance = window.viewer;
      if (instance?.state) {
        window.clearInterval(interval);
        resolve(instance);
        return;
      }
      if (Date.now() - start > timeoutMs) {
        window.clearInterval(interval);
        reject(new Error('Neuroglancer viewer unavailable after timeout. Ensure upstream bundles are loaded.'));
      }
    }, intervalMs);
  });
}

function applyOntologyArtifactsToState(
  stateConfig: NeuroglancerJsonState,
  artifacts: OntologyArtifacts | null,
  targetLayerName: string
): Set<string> {
  const initialVisible = new Set<string>();
  const layers = Array.isArray(stateConfig?.layers) ? stateConfig.layers : [];

  for (const layerConfig of layers) {
    if (!layerConfig || layerConfig.type !== 'segmentation') continue;
    const layerName = layerConfig.name ?? layerConfig.layer?.name;
    if (layerName !== targetLayerName) continue;

    if (artifacts) {
      if (artifacts.segmentColors && Object.keys(artifacts.segmentColors).length > 0) {
        layerConfig.segmentColors = artifacts.segmentColors;
      }
      if (artifacts.segmentProperties?.inline?.ids?.length) {
        layerConfig.segmentProperties = artifacts.segmentProperties;
      }
    }

    if (Array.isArray(layerConfig.segments)) {
      layerConfig.segments.forEach((segment: unknown) => {
        if (segment === null || segment === undefined) return;
        const normalized = String(segment).replace(/,/g, '').trim();
        if (normalized) initialVisible.add(normalized);
      });
    }
  }

  return initialVisible;
}

function buildRuntimeSegmentPropertyMap(inline: any): RuntimeSegmentPropertyMap | null {
  if (!inline || !Array.isArray(inline.ids) || !Array.isArray(inline.properties)) return null;

  const labelProp = inline.properties.find((p: any) => p?.type === 'label');
  const descProp = inline.properties.find((p: any) => p?.type === 'description');

  const labels: string[] = Array.isArray(labelProp?.values) ? labelProp.values : [];
  const descriptions: string[] = Array.isArray(descProp?.values) ? descProp.values : [];

  const map: RuntimeSegmentPropertyMap = new Map();

  inline.ids.forEach((rawId: any, idx: number) => {
    try {
      const key = parseSegmentIdString(rawId);
      map.set(key, {
        label: labels[idx] ?? String(rawId),
        description: descriptions[idx] ?? '',
      });
    } catch (err) {
      console.warn('[SegmentProperties] Failed to parse segment id for inline entry', rawId, err);
    }
  });

  console.log('[SegmentProperties] Built runtime property map from CSV inline:', {
    size: map.size,
    sample: Array.from(map.entries()).slice(0, 5).map(([k, v]) => [String(k), v]),
  });

  return map;
}

function injectSegmentPropertyMap(
  viewer: NeuroglancerViewer | null | undefined,
  map: RuntimeSegmentPropertyMap | null,
  targetLayerName: string
): void {
  if (!viewer || !map) {
    console.warn('[SegmentProperties] injectSegmentPropertyMap skipped: missing viewer or map', {
      hasViewer: !!viewer,
      hasMap: !!map,
      mapSize: map?.size,
    });
    return;
  }

  const manager = viewer.layerManager;
  const managedEntries = manager ? listManagedLayers(manager) : [];
  console.log('[SegmentProperties] injectSegmentPropertyMap start', {
    targetLayerName,
    mapSize: map.size,
    managedEntries: managedEntries.length,
  });

  const extractGroupNames = (layer: any, segState: any): string[] => {
    const names: string[] = [];
    const push = (val: any) => {
      if (!val) return;
      if (typeof val === 'string' || typeof val === 'number' || typeof val === 'bigint') {
        names.push(String(val));
        return;
      }
      if (typeof val === 'object') {
        if (val.name && (typeof val.name === 'string' || typeof val.name === 'number' || typeof val.name === 'bigint')) {
          names.push(String(val.name));
        }
        if (val.value && (typeof val.value === 'string' || typeof val.value === 'number' || typeof val.value === 'bigint')) {
          names.push(String(val.value));
        }
      }
    };
    push(layer?.linkedSegmentationGroup);
    push(layer?.displayState?.linkedSegmentationGroup);
    push(layer?.layer?.linkedSegmentationGroup);
    push(layer?.layer?.displayState?.linkedSegmentationGroup);
    push(segState?.linkedSegmentationGroup);
    push(segState?.name);
    return names;
  };

  const normalizeLayer = (entry: any) => {
    const managedEntry = Array.isArray(entry) ? entry[1] || entry[0] : entry;
    return managedEntry?.layer ?? managedEntry ?? null;
  };

  const findSegmentationGroup = () => {
    const candidates: any[] = [];
    if (targetLayerName && manager?.getLayerByName) {
      const primary = manager.getLayerByName(targetLayerName);
      if (primary) candidates.push(primary);
    }
    candidates.push(...managedEntries);

    for (const entry of candidates) {
      const layer = normalizeLayer(entry);
      if (!layer) continue;

      const name =
        layer?.name ??
        layer?.displayState?.name ??
        layer?.layer?.name ??
        layer?.layer?.displayState?.name;

      if (targetLayerName && name && name !== targetLayerName) continue;

      const segState =
        layer.displayState?.segmentationGroupState?.value ??
        layer.layer?.displayState?.segmentationGroupState?.value ??
        null;

      if (segState?.visibleSegments) {
        const groupName = segState?.name || targetLayerName || name || null;
        return { segState, segLayer: layer, groupName };
      }
    }
    return { segState: null, segLayer: null, groupName: targetLayerName || null };
  };

  const {
    segState: targetSegState,
    segLayer: targetSegLayer,
    groupName: targetGroupNameRaw,
  } = findSegmentationGroup();
  const targetGroupName = targetGroupNameRaw || targetLayerName || null;

  const candidateGroupNames = new Set<string>();
  if (targetLayerName) candidateGroupNames.add(targetLayerName);
  if (typeof targetGroupName === 'string' && targetGroupName) candidateGroupNames.add(targetGroupName);
  if (targetSegState?.name) candidateGroupNames.add(String(targetSegState.name));
  if (targetSegState?.linkedSegmentationGroup) {
    candidateGroupNames.add(String(targetSegState.linkedSegmentationGroup));
  }
  if (targetSegLayer?.linkedSegmentationGroup) {
    candidateGroupNames.add(String(targetSegLayer.linkedSegmentationGroup));
  }
  if (targetSegLayer?.displayState?.linkedSegmentationGroup) {
    candidateGroupNames.add(String(targetSegLayer.displayState.linkedSegmentationGroup));
  }

  let appliedCount = 0;

  const applyToEntry = (entry: any) => {
    const layer = normalizeLayer(entry);
    if (!layer) return;

    const name =
      layer?.name ??
      layer?.displayState?.name ??
      layer?.layer?.name ??
      layer?.layer?.displayState?.name;

    const segState =
      layer.displayState?.segmentationGroupState?.value ??
      layer.layer?.displayState?.segmentationGroupState?.value ??
      null;

    const linkedGroup =
      layer.linkedSegmentationGroup ??
      layer.displayState?.linkedSegmentationGroup ??
      segState?.linkedSegmentationGroup ??
      layer.layer?.linkedSegmentationGroup ??
      layer.layer?.displayState?.linkedSegmentationGroup ??
      layer.layer?.displayState?.segmentationGroupState?.value?.linkedSegmentationGroup ??
      segState?.name;
    const layerGroupNames = extractGroupNames(layer, segState);

    const sharesSegState = targetSegState && segState && segState === targetSegState;
    const segStateName = segState?.name ? String(segState.name) : null;
    const sharesGroupName =
      (segStateName && candidateGroupNames.has(segStateName)) ||
      (linkedGroup && candidateGroupNames.has(String(linkedGroup))) ||
      layerGroupNames.some((g) => candidateGroupNames.has(String(g)));
    const isTargetLayer = targetSegLayer ? layer === targetSegLayer : false;
    const isTargetName = targetLayerName ? name === targetLayerName : false;

    if (!(sharesSegState || sharesGroupName || isTargetLayer || isTargetName)) {
      return;
    }

    try {
      (layer as any).segmentPropertyMap = map;
    } catch (_) {}

    try {
      if (layer.layer) {
        (layer.layer as any).segmentPropertyMap = map;
      }
    } catch (_) {}

    try {
      if (segState) {
        (segState as any).segmentPropertyMap = map;
      }
    } catch (_) {}

    appliedCount += 1;
    console.log('[SegmentProperties] Injected runtime map into layer', name || '(unnamed)', {
      mapSize: map.size,
      linkedGroup,
      sharesSegState,
      sharesGroupName,
      isTargetLayer,
      isTargetName,
      targetGroupName,
      candidateGroupNames: Array.from(candidateGroupNames),
      layerGroupNames,
    });
  };

  managedEntries.forEach(applyToEntry);

  console.log('[SegmentProperties] Injection summary', {
    appliedCount,
    targetGroupName,
    hasTargetSegState: !!targetSegState,
    hasTargetSegLayer: !!targetSegLayer,
    managedEntries: managedEntries.length,
  });
}

function applyUIPanelDefaults(stateConfig: NeuroglancerJsonState, hidePanels: boolean): void {
  if (!stateConfig || typeof stateConfig !== 'object') return;

  const targetVisibility = hidePanels ? false : true;

  const ensurePanelVisibility = (key: string) => {
    const panel = stateConfig[key];
    if (panel && typeof panel === 'object') {
      stateConfig[key] = { ...panel, visible: targetVisibility };
      return;
    }
    stateConfig[key] = { visible: targetVisibility };
  };

  ensurePanelVisibility('settingsPanel');
  ensurePanelVisibility('layerListPanel');

  const selected = stateConfig.selectedLayer;
  if (selected && typeof selected === 'object') {
    stateConfig.selectedLayer = { ...selected, visible: targetVisibility };
  } else if (typeof selected === 'string') {
    stateConfig.selectedLayer = { layer: selected, visible: targetVisibility };
  } else {
    stateConfig.selectedLayer = { visible: targetVisibility };
  }
}

function shouldHidePanelsByDefault(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (window.matchMedia && window.matchMedia(`(max-width: ${SIDE_PANEL_MOBILE_BREAKPOINT}px)`).matches) {
      return true;
    }
  } catch (_) {}
  const width = Math.min(window.innerWidth || 0, document.documentElement?.clientWidth || 0) || window.innerWidth || 0;
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const isMobileUA = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(ua);
  return width > 0 ? width <= SIDE_PANEL_MOBILE_BREAKPOINT : isMobileUA;
}

function initializeOntologyDrawer(): void {
  const quickToggle = document.getElementById('ontologyQuickToggle') as HTMLButtonElement | null;
  const drawer = document.getElementById('ontologyDrawer') as HTMLElement | null;
  const closeButton = document.getElementById('ontologyDrawerClose') as HTMLButtonElement | null;
  if (!quickToggle || !drawer) return;

  const setOpen = (open: boolean) => {
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    quickToggle.setAttribute('aria-expanded', String(open));
    quickToggle.textContent = open ? 'Ontology ▾' : 'Ontology ▸';
  };

  setOpen(false);
  quickToggle.classList.remove('hidden');
  quickToggle.addEventListener('click', () => {
    setOpen(!drawer.classList.contains('is-open'));
  });
  closeButton?.addEventListener('click', () => setOpen(false));
}

function populateOntologyFallback(viewer: NeuroglancerViewer, targetLayerName: string): void {
  try {
    const stateJson = viewer.state?.toJSON?.();
    const layers = Array.isArray(stateJson?.layers) ? stateJson.layers : [];
    const segmentationLayer = layers.find((layer) =>
      layer?.type === 'segmentation' &&
      (layer.name === targetLayerName || layer.segmentProperties?.inline)
    );

    if (!segmentationLayer?.segmentProperties?.inline) {
      console.warn('[Ontology Fallback] Segment properties unavailable for fallback render.');
      return;
    }

    const ids: string[] = segmentationLayer.segmentProperties.inline.ids || [];
    const properties = segmentationLayer.segmentProperties.inline.properties || [];
    const labelProp = properties.find((prop: any) => prop?.type === 'label');
    const descProp = properties.find((prop: any) => prop?.type === 'description');
    const labels: string[] = labelProp?.values || [];
    const descriptions: string[] = descProp?.values || [];
    const colorMap = segmentationLayer.segmentColors || {};

    const container = document.getElementById('ontologyContainer');
    if (!container) return;

    container.innerHTML = '<input id="searchInput" type="text" placeholder="Search...">';
    ids.forEach((rawId, index) => {
      const id = String(rawId);
      const label = labels[index] || id;
      const desc = descriptions[index] ? ` — ${descriptions[index]}` : '';
      const color = colorMap[id] || '#444';

      const row = document.createElement('div');
      row.className = 'ontology-entry';
      row.style.display = 'flex';
      row.style.alignItems = 'center';
      row.style.gap = '6px';

      const swatch = document.createElement('span');
      swatch.style.display = 'inline-block';
      swatch.style.width = '12px';
      swatch.style.height = '12px';
      swatch.style.border = '1px solid rgba(0, 0, 0, 0.2)';
      swatch.style.background = color;
      swatch.title = id;

      const labelNode = document.createElement('span');
      labelNode.textContent = `${label}${desc}`;

      row.appendChild(swatch);
      row.appendChild(labelNode);
      container.appendChild(row);
    });

    console.warn(`[Ontology Fallback] Rendered ${ids.length} entries from inline segment properties.`);
  } catch (error) {
    console.error('[Ontology Fallback] Failed to populate fallback list:', error);
  }
}

function captureInitialViewState(viewer: NeuroglancerViewer, retryDelay = 500): void {
  try {
    const nav = viewer.navigationState;
    const perspective = viewer.perspectiveNavigationState;
    const ready = nav?.position?.value &&
      nav?.pose?.orientation?.orientation &&
      nav?.zoomFactor?.value &&
      perspective?.pose?.orientation?.orientation &&
      perspective?.zoomFactor?.value;

    if (!ready) {
      window.setTimeout(() => captureInitialViewState(viewer, retryDelay), retryDelay);
      return;
    }

    const captured = {
      position: new Float64Array(nav.position.value),
      projectionOrientation: new Float32Array(perspective.pose.orientation.orientation),
      projectionScale: perspective.zoomFactor.value,
      crossSectionOrientation: new Float32Array(nav.pose.orientation.orientation),
      crossSectionScale: nav.zoomFactor.value,
    };

    setInitialViewState(captured);
  } catch (error) {
    console.error('[Initial State] Failed to capture initial view state:', error);
  }
}

function attachHotkeys(): void {
  if (hotkeysAttached) return;
  hotkeysAttached = true;

  window.addEventListener('keydown', (event) => {
    if (!event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) return;
    if (event.code !== 'Space') return;

    const target = event.target as HTMLElement | null;
    const tagName = target?.tagName.toLowerCase();
    if (tagName === 'input' || tagName === 'textarea' || target?.isContentEditable) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    toggleMuteNonImageLayers();
  });
}

function deriveStateUrl(stateOverride?: string | null): string {
  return stateOverride || DEFAULT_STATE_URL;
}

export interface BootOptions {
  stateUrl?: string;
  csvUrl?: string;
}

export interface BootResult {
  viewer: NeuroglancerViewer;
  ontology?: Ontology;
  ontologyUI?: OntologyUI;
  initialVisibleSegments: Set<string>;
}

export async function bootApp(options: BootOptions = {}): Promise<BootResult> {
  setUrlUpdatesEnabled(false);

  const stateUrl = deriveStateUrl(options.stateUrl ?? null);
  const csvUrl = options.csvUrl ?? CSV_URL;

  await ensureNeuroglancerScriptsLoaded();

  const viewerPromise = waitForViewer();
  const statePromise = fetchJson(stateUrl);
  const csvPromise = csvUrl
    ? fetchText(csvUrl).catch((error) => {
        console.warn('[Ontology] CSV fetch failed, running without ontology data:', error);
        return null;
      })
    : Promise.resolve<string | null>(null);

  const viewer = await viewerPromise;
  window.viewer = viewer;

  const [stateConfig, csvContent] = await Promise.all([statePromise, csvPromise]);

  const storedSidePanelPreference = getStoredSidePanelPreference();
  const deviceWantsSidePanelsHidden = shouldHidePanelsByDefault();
  const hidePanelsByDefault = deviceWantsSidePanelsHidden
    ? true
    : (storedSidePanelPreference ?? false);
  applyUIPanelDefaults(stateConfig, hidePanelsByDefault);
  let artifacts: OntologyArtifacts | null = null;
  if (typeof csvContent === 'string') {
    try {
      const [tree, dict, segmentColors, segmentProperties] = await buildOntologyFromCSV(csvContent);
      artifacts = { tree, dict, segmentColors, segmentProperties };
    } catch (error) {
      console.error('[Ontology] Failed to build ontology from CSV:', error);
    }
  }

  const initialVisibleSegments = applyOntologyArtifactsToState(stateConfig, artifacts, TARGET_LAYER_NAME);

  viewer.state.restoreState(stateConfig);
  ensureLayerLookup(viewer);
  try {
    const inline = artifacts?.segmentProperties && (artifacts.segmentProperties as any).inline;
    const runtimeMap = inline ? buildRuntimeSegmentPropertyMap(inline) : null;
    if (runtimeMap) {
      injectSegmentPropertyMap(viewer, runtimeMap, TARGET_LAYER_NAME);
    } else {
      console.warn('[SegmentProperties] No inline segment properties available; runtime map not built.');
    }
  } catch (error) {
    console.warn('[SegmentProperties] Failed to build or inject runtime segment property map:', error);
  }

  initializeSidePanelControls({
    defaultHidden: hidePanelsByDefault,
    honorStoredPreference: !deviceWantsSidePanelsHidden,
  });
  try {
    setLayerPanelHidden(true, { persist: false });
  } catch (error) {
    console.warn('[Bootstrap] Failed to hide layer panel by default:', error);
  }

  attachHotkeys();
  captureInitialViewState(viewer);

  let ontology: Ontology | undefined;
  let ontologyUI: OntologyUI | undefined;

  if (artifacts) {
    ontology = new Ontology(artifacts.tree, artifacts.dict, artifacts.segmentColors, artifacts.segmentProperties);
    try {
      const ontologyContainer = document.getElementById('ontologyContainer');
      if (ontologyContainer) {
        ontology.render(ontologyContainer);
      }
    } catch (error) {
      console.warn('[Ontology] Failed to render ontology tree:', error);
    }
    try {
      ontologyUI = new OntologyUI(ontology, viewer, TARGET_LAYER_NAME, {
        initialSegments: initialVisibleSegments,
      });
      registerOntologyUI(ontologyUI);
      window.ontologyUI = ontologyUI;
    } catch (error) {
      console.error('[OntologyUI] Failed to initialise ontology UI, falling back to inline list:', error);
      ontologyUI = undefined;
      registerOntologyUI(null);
      populateOntologyFallback(viewer, TARGET_LAYER_NAME);
    }

    if (ontologyUI) {
      try {
        OctoEnhancements?.enhanceOntology?.({
          ontologyUI,
          ontology,
          ontologyDict: artifacts.dict,
          viewer,
          targetLayerName: TARGET_LAYER_NAME,
          focusEnabled: true,
          focusHoverEnabled: false,
        });
      } catch (error) {
        console.warn('[OctoEnhancements] Failed to enhance ontology:', error);
      }
    }
  } else {
    populateOntologyFallback(viewer, TARGET_LAYER_NAME);
    registerOntologyUI(null);
  }

  createDynamicToolIcon({
    viewer,
    ontologyUI: ontologyUI ?? null,
    targetLayerName: TARGET_LAYER_NAME,
  });
  initializeOntologyDrawer();

  return { viewer, ontology, ontologyUI, initialVisibleSegments };
}

export type { NeuroglancerViewer };
