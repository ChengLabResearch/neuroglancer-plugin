// @ts-nocheck

import type { Ontology } from '../Ontology/core';
import type { OntologyUI } from '../Ontology/ui';
import {
  listManagedLayers,
  getLayerByName,
  getVisibleSegments,
  mutateVisibleSegments,
} from '../Viewer/ng';
import { showInfoForHoveredSegment } from '../Ontology/hoverBridge';

const enhancements: Record<string, any> = {};

  const statusState = {
    viewer: null,
    targetLayerName: null,
    getMuteState: () => false,
    hudEl: null,
    pendingUpdate: false,
    segmentationVisibleSegments: null,
    segmentationListener: null,
    listenersBound: false,
    enabled: false,
    storageKey: 'octo_hud_enabled',
    initialised: false,
  };

  const soloState = {
    viewer: null,
    ontology: null,
    ontologyUI: null,
    targetLayerName: null,
    previousSegments: null,
    activeId: null,
    activeEntry: null,
    skipNextChange: false,
    mutationObserver: null,
    decorateScheduled: false,
    restoreBanner: null,
    restoreLabelEl: null,
    restoreButton: null,
    legacyCleanupObserver: null,
    legacyCleanupTimer: null,
    legacyCleanupAttempts: 0,
  };

  const focusState = {
    viewer: null,
    ontology: null,
    ontologyUI: null,
    ontologyDict: null,
    targetLayerName: null,
    enabled: false,
    hoverEnabled: false,
    storageKey: 'octo_focus_enabled',
    hoverStorageKey: 'octo_focus_hover_enabled',
    initialised: false,
    viewerElement: null,
    clickHandler: null,
    lastEntry: null,
    lastId: null,
    selectionListener: null,
    selectionSource: null,
    expandedEntries: new Set(),
    pendingSelectionUntil: 0,
  };

  const numberFormatter = typeof Intl !== 'undefined' ? new Intl.NumberFormat('en-US') : null;

  function collectManagerEntries(manager) {
    return listManagedLayers(manager);
  }

  function getSoloEntryLabel(entry) {
    if (!entry) return '';
    const directLabel = entry.querySelector(':scope > span:not(.toggle-icon):not(.ontology-checkbox)');
    const text = directLabel?.textContent?.trim() || entry.getAttribute('data-label') || entry.id;
    return text || '';
  }

  function getOntologyContainer() {
    return soloState.ontologyUI?.container || document.getElementById('ontologyContainer');
  }

  function getSoloEntryElement(entryId) {
    const container = getOntologyContainer();
    if (!container || !entryId) return null;
    return container.querySelector(`.ontology-entry[id="${entryId}"]`);
  }

  function resolveOntologyDict() {
    return (
      focusState.ontologyDict
      || focusState.ontology?.dict
      || focusState.ontologyUI?.ontology?.dict
      || soloState.ontology?.dict
      || soloState.ontologyUI?.ontology?.dict
      || null
    );
  }

  function ensureSoloRestoreBanner() {
    return null;
  }

  function syncSoloEntryState() {
    const activeId = soloState.activeId;
    if (!activeId) {
      if (soloState.activeEntry) {
        markSoloEntry(soloState.activeEntry, false);
        soloState.activeEntry = null;
      }
      return;
    }
    const entry = getSoloEntryElement(activeId);
    if (!entry) return;
    if (soloState.activeEntry !== entry) {
      soloState.activeEntry = entry;
    }
    markSoloEntry(entry, true);
  }

  function updateSoloRestoreBanner() {
    // Banner removed; nothing to update.
  }

  function shouldRemoveLegacySoloElement(node) {
    if (!node) return false;
    if (node.dataset?.octoLegacyRemoved === '1') return false;
    const text = node.textContent ? node.textContent.replace(/\s+/g, ' ').trim().toLowerCase() : '';
    if (!text) return false;
    return text === 'clear solo' || text === 'clear solo mode' || text.includes('clear solo');
  }

  function cleanupLegacySoloInTree(root) {
    if (!root) return false;
    const stack = [root];
    let removed = false;
    while (stack.length) {
      const node = stack.pop();
      if (!node) continue;
      if (node instanceof Element) {
        if (node.classList?.contains('ontology-solo-btn') || shouldRemoveLegacySoloElement(node)) {
          node.dataset.octoLegacyRemoved = '1';
          try { node.remove(); } catch (_) { node.style.display = 'none'; }
          removed = true;
          continue;
        }
        if (node.shadowRoot) {
          stack.push(node.shadowRoot);
        }
      }
      const childNodes = node.childNodes;
      if (childNodes && childNodes.length) {
        for (let i = childNodes.length - 1; i >= 0; i -= 1) {
          stack.push(childNodes[i]);
        }
      }
    }
    return removed;
  }

  function removeLegacySoloButtons(root = document) {
    if (!root) return false;
    let removed = false;
    if (root instanceof Document) {
      removed = cleanupLegacySoloInTree(root.documentElement) || removed;
    } else {
      removed = cleanupLegacySoloInTree(root) || removed;
    }
    return removed;
  }

  function scheduleLegacySoloCleanup({ attempts = 20, delay = 350 } = {}) {
    if (soloState.legacyCleanupTimer) return;
    soloState.legacyCleanupAttempts = 0;
    const attemptCleanup = () => {
      removeLegacySoloButtons(document);
      soloState.legacyCleanupAttempts += 1;
      if (soloState.legacyCleanupAttempts >= attempts) {
        soloState.legacyCleanupTimer = null;
        return;
      }
      soloState.legacyCleanupTimer = setTimeout(attemptCleanup, delay);
    };
    attemptCleanup();
  }

  function ensureLegacySoloCleanupObserver() {
    if (soloState.legacyCleanupObserver || typeof MutationObserver !== 'function') return;
    try {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (!mutation.addedNodes || mutation.addedNodes.length === 0) continue;
          let needsCleanup = false;
          for (const node of mutation.addedNodes) {
            if (!(node instanceof Element)) continue;
            if (node.matches && node.matches('.ontology-solo-btn')) { needsCleanup = true; break; }
            if (shouldRemoveLegacySoloElement(node)) { needsCleanup = true; break; }
            if (typeof node.querySelectorAll === 'function') {
              const inner = node.querySelectorAll('.ontology-solo-btn, button, a, div, span');
              for (const candidate of inner) {
                if (candidate.matches && candidate.matches('.ontology-solo-btn')) {
                  needsCleanup = true;
                  break;
                }
                if (shouldRemoveLegacySoloElement(candidate)) {
                  needsCleanup = true;
                  break;
                }
              }
              if (needsCleanup) break;
            }
          }
          if (needsCleanup) {
            cleanupLegacySoloInTree(mutation.target || document);
            break;
          }
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      soloState.legacyCleanupObserver = observer;
    } catch (err) {
      console.warn('[OctoEnhancements] Failed to observe legacy solo buttons:', err);
    }
  }

  function parseSegmentId(id) {
    const cleaned = String(id).replace(/,/g, '').trim();
    if (!cleaned) return null;
    if (typeof window.parseSegmentIdString === 'function') {
      try { return window.parseSegmentIdString(cleaned); } catch (err) { /* fallback below */ }
    }
    if (typeof BigInt !== 'undefined') {
      try { return BigInt(cleaned); } catch (err) { return null; }
    }
    const numeric = Number(cleaned);
    return Number.isNaN(numeric) ? null : numeric;
  }

  function convertVisibleSegmentsToStrings(visibleSegments) {
    const result = new Set();
    if (!visibleSegments) return result;
    try {
      if (typeof visibleSegments.forEach === 'function') {
        visibleSegments.forEach((value) => {
          if (value !== undefined && value !== null) {
            result.add(String(value).replace(/,/g, ''));
          }
        });
        return result;
      }
    } catch (err) {
      console.warn('[OctoEnhancements] Failed iterating visibleSegments via forEach:', err);
    }
    try {
      if (typeof visibleSegments[Symbol.iterator] === 'function') {
        for (const value of visibleSegments) {
          if (value !== undefined && value !== null) {
            result.add(String(value).replace(/,/g, ''));
          }
        }
      }
    } catch (err) {
      console.warn('[OctoEnhancements] Failed iterating visibleSegments via iterator:', err);
    }
    return result;
  }

  function uint64ToString(value) {
    if (value === undefined || value === null) return null;
    if (typeof value === 'string') return value;
    if (typeof value === 'bigint') return value.toString();
    try {
      if (typeof value.toString === 'function') {
        const stringified = value.toString();
        if (stringified && stringified !== '[object Object]') {
          return stringified;
        }
      }
    } catch (_) {
      /* ignore */
    }
    try {
      if (typeof value.toJSON === 'function') {
        const json = value.toJSON();
        if (typeof json === 'string') return json;
        if (Array.isArray(json) && json.length > 0) {
          const candidate = json[0];
          if (typeof candidate === 'string') return candidate;
          if (typeof candidate === 'number' || typeof candidate === 'bigint') return String(candidate);
        }
      }
    } catch (_) {
      /* ignore */
    }
    const low = value.low ?? value.lowBits ?? value.low_;
    const high = value.high ?? value.highBits ?? value.high_;
    if (low !== undefined) {
      try {
        const lowBig = typeof low === 'bigint' ? (low & 0xffffffffn) : BigInt(Number(low) >>> 0);
        const highBig = high !== undefined
          ? (typeof high === 'bigint' ? (high & 0xffffffffn) : BigInt(Number(high) >>> 0))
          : 0n;
        return ((highBig << 32n) | lowBig).toString();
      } catch (_) {
        /* ignore */
      }
    }
    if (value.value !== undefined) {
      const val = value.value;
      if (typeof val === 'string') return val;
      if (typeof val === 'number' || typeof val === 'bigint') return String(val);
    }
    return null;
  }

  function countVisibleSegments(visibleSegments) {
    if (!visibleSegments) return 0;
    if (typeof visibleSegments.size === 'number') {
      return visibleSegments.size;
    }
    let count = 0;
    try {
      if (typeof visibleSegments.forEach === 'function') {
        visibleSegments.forEach(() => { count += 1; });
        return count;
      }
    } catch (err) {
      console.warn('[OctoEnhancements] Failed counting visibleSegments via forEach:', err);
    }
    try {
      if (typeof visibleSegments[Symbol.iterator] === 'function') {
        for (const _ of visibleSegments) { count += 1; }
      }
    } catch (err) {
      console.warn('[OctoEnhancements] Failed counting visibleSegments via iterator:', err);
    }
    return count;
  }

  function getSegmentationLayerInfo() {
    const viewer = focusState.viewer || soloState.viewer || statusState.viewer;
    const targetName = focusState.targetLayerName || soloState.targetLayerName || statusState.targetLayerName;
    if (!viewer?.layerManager) return null;

    const entries = targetName
      ? (() => {
          const layerEntry = getLayerByName(viewer, targetName);
          return layerEntry ? [layerEntry] : listManagedLayers(viewer.layerManager);
        })()
      : listManagedLayers(viewer.layerManager);

    for (const rawEntry of entries) {
      const managedEntry = Array.isArray(rawEntry) ? rawEntry[1] || rawEntry[0] : rawEntry;
      const candidate = managedEntry?.layer || managedEntry;
      const name = candidate?.name || candidate?.displayState?.name;
      if (targetName && name !== targetName) continue;
      const segState = candidate?.displayState?.segmentationGroupState?.value;
      const visibleSegments = getVisibleSegments(candidate);
      if (visibleSegments) {
        const selectionState = candidate?.layer?.displayState?.segmentSelectionState
          || candidate?.displayState?.segmentSelectionState;
        return {
          layer: candidate,
          segmentationState: segState,
          visibleSegments,
          selectionState,
          viewer,
        };
      }
    }
    return null;
  }

  // ---------- Status HUD ----------

  function ensureHudElement() {
    if (statusState.hudEl) return statusState.hudEl;
    const hud = document.createElement('div');
    hud.id = 'viewerStatusHud';
    hud.innerHTML = [
      '<div class="hud-line"><span class="hud-label">Segments</span><span class="hud-value" data-field="segments">—</span></div>',
      '<div class="hud-line"><span class="hud-label">Meshes</span><span class="hud-value" data-field="meshes">—</span></div>',
      '<div class="hud-line"><span class="hud-label">Zoom (2D/3D)</span><span class="hud-value" data-field="zoom">—</span></div>',
      '<div class="hud-line"><span class="hud-label">Non-image mute</span><span class="hud-value" data-field="mute">—</span></div>'
    ].join('');
    document.body.appendChild(hud);
    hud.style.display = statusState.enabled ? '' : 'none';
    statusState.hudEl = hud;
    return hud;
  }

  function scheduleHudUpdate() {
    if (!statusState.hudEl) return;
    if (statusState.pendingUpdate) return;
    statusState.pendingUpdate = true;
    requestAnimationFrame(() => {
      statusState.pendingUpdate = false;
      updateHud();
    });
  }

  function setHudEnabled(enabled, { persist = true } = {}) {
    statusState.enabled = !!enabled;
    if (persist) {
      try {
        window.localStorage?.setItem(statusState.storageKey, statusState.enabled ? '1' : '0');
      } catch (_) {
        /* ignore storage errors */
      }
    }
    const hud = ensureHudElement();
    if (hud) {
      hud.style.display = statusState.enabled ? '' : 'none';
    }
    if (statusState.enabled) {
      attachStatusListeners();
    }
    scheduleHudUpdate();
    try {
      window.dispatchEvent(new CustomEvent('octo:hud-toggle', { detail: { enabled: statusState.enabled } }));
    } catch (_) {
      /* ignore dispatch errors */
    }
  }

  function collectMeshStats(viewer) {
    const stats = { total: 0, visible: 0 };
    if (!viewer?.layerManager) return stats;
    const entries = collectManagerEntries(viewer.layerManager);
    for (const entry of entries) {
      const managedLayer = entry?.layer || entry;
      const displayState = managedLayer?.displayState || managedLayer?.layer?.displayState;
      if (!displayState) continue;
      const type = managedLayer?.layer?.type || managedLayer?.type;
      const isMesh = displayState.objectAlpha && displayState.silhouetteRendering;
      if (!isMesh && type !== 'mesh') continue;
      stats.total += 1;
      const visibleFlag = managedLayer?.visible !== false && displayState.visible !== false;
      if (visibleFlag) stats.visible += 1;
    }
    return stats;
  }

  function formatNumber(value) {
    if (value === null || value === undefined || Number.isNaN(value)) return '—';
    if (numberFormatter) {
      try { return numberFormatter.format(value); } catch (_) { /* ignore */ }
    }
    return String(value);
  }

  function formatZoom(value) {
    if (value === null || value === undefined || Number.isNaN(value)) return '—';
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return '—';
    return numeric.toFixed(2);
  }

  function updateHud() {
    const hud = statusState.hudEl || ensureHudElement();
    if (!hud) return;
    const viewer = statusState.viewer;
    const segmentsField = hud.querySelector('[data-field="segments"]');
    const meshesField = hud.querySelector('[data-field="meshes"]');
    const zoomField = hud.querySelector('[data-field="zoom"]');
    const muteField = hud.querySelector('[data-field="mute"]');

    if (!viewer) {
      if (segmentsField) segmentsField.textContent = '—';
      if (meshesField) meshesField.textContent = '—';
      if (zoomField) zoomField.textContent = '—';
      if (muteField) muteField.textContent = '—';
      return;
    }

    const segInfo = statusState.segmentationVisibleSegments ?
      { visibleSegments: statusState.segmentationVisibleSegments } : getSegmentationLayerInfo();
    if (!statusState.segmentationVisibleSegments && segInfo?.visibleSegments) {
      statusState.segmentationVisibleSegments = segInfo.visibleSegments;
    }

    const visibleCount = countVisibleSegments(segInfo?.visibleSegments);
    if (segmentsField) segmentsField.textContent = formatNumber(visibleCount);

    const meshStats = collectMeshStats(viewer);
    if (meshesField) {
      const totalStr = formatNumber(meshStats.total);
      const visibleStr = formatNumber(meshStats.visible);
      meshesField.textContent = `${visibleStr}/${totalStr}`;
    }

    const zoom2D = viewer?.navigationState?.zoomFactor?.value;
    const zoom3D = viewer?.perspectiveNavigationState?.zoomFactor?.value;
    if (zoomField) {
      const formatted2D = formatZoom(zoom2D);
      const formatted3D = formatZoom(zoom3D);
      zoomField.textContent = `${formatted2D} / ${formatted3D}`;
    }

    const muteState = !!statusState.getMuteState();
    if (muteField) muteField.textContent = muteState ? 'On' : 'Off';
    hud.classList.toggle('muted-active', muteState);
  }

  function attachSegmentationListener() {
    const segInfo = getSegmentationLayerInfo();
    const visibleSegments = segInfo?.visibleSegments;
    if (!visibleSegments) return;

    if (statusState.segmentationVisibleSegments === visibleSegments) return;

    if (statusState.segmentationVisibleSegments && statusState.segmentationListener) {
      try {
        statusState.segmentationVisibleSegments.changed?.remove(statusState.segmentationListener);
      } catch (_) {
        /* ignore */
      }
    }

    statusState.segmentationVisibleSegments = visibleSegments;
    const handler = () => {
      if (soloState.skipNextChange) {
        soloState.skipNextChange = false;
      } else if (soloState.activeId) {
        clearSolo({ restore: false, external: true });
      }
      scheduleHudUpdate();
    };
    try {
      visibleSegments.changed?.add(handler);
    } catch (err) {
      console.warn('[OctoEnhancements] Failed attaching visibleSegments listener:', err);
    }
    statusState.segmentationListener = handler;
    scheduleHudUpdate();
  }

  function attachStatusListeners() {
    const viewer = statusState.viewer;
    if (!viewer) return;
    if (!statusState.listenersBound) {
      try { viewer.layerManager?.layersChanged?.add(scheduleHudUpdate); } catch (_) { /* ignore */ }
      try { viewer.navigationState?.zoomFactor?.changed?.add(scheduleHudUpdate); } catch (_) { /* ignore */ }
      try { viewer.perspectiveNavigationState?.zoomFactor?.changed?.add(scheduleHudUpdate); } catch (_) { /* ignore */ }
      statusState.listenersBound = true;
    }
    attachSegmentationListener();
  }

  // ---------- Ontology Solo Controls ----------

  function markSoloEntry(entry, active) {
    if (!entry) return;
    entry.classList.toggle('solo-active', active);
  }

  function collectBranchIds(entryId) {
    const ids = new Set();
    if (!entryId) return ids;
    ids.add(String(entryId));
    const ontology = soloState.ontology;
    if (ontology?.findAllChildren && ontology.data) {
      try {
        ontology.findAllChildren(String(entryId), ontology.data, ids);
      } catch (err) {
        console.warn('[OctoEnhancements] Failed collecting branch IDs:', err);
      }
    }
    return ids;
  }

  function normalizeSegmentIdString(id) {
    if (id === undefined || id === null) return null;
    return String(id).replace(/,/g, '');
  }

  function isKnownOntologyId(segmentId) {
    const dict = resolveOntologyDict();
    if (!dict) return true;
    const normalized = normalizeSegmentIdString(segmentId);
    return !!(normalized && dict[normalized]);
  }

  function getAncestorChain(segmentId) {
    const dict = focusState.ontologyDict;
    if (!dict) return [];
    const chain = [];
    let current = normalizeSegmentIdString(segmentId);
    const visited = new Set();
    while (current) {
      const record = dict[current];
      if (!record) break;
      let parent = record['Parent ID'];
      if (parent === undefined || parent === null || parent === '' || parent === '[]') break;
      if (Array.isArray(parent)) parent = parent[0];
      parent = normalizeSegmentIdString(parent);
      if (!parent || visited.has(parent)) break;
      chain.push(parent);
      visited.add(parent);
      current = parent;
    }
    return chain;
  }

  function openOntologyEntry(entry) {
    if (!entry) return;
    entry.style.display = 'block';
    const childContainer = entry.querySelector(':scope > .ontology-child-container');
    if (childContainer) {
      childContainer.style.display = 'block';
    }
    const toggleIcon = entry.querySelector(':scope > .toggle-icon');
    if (toggleIcon) toggleIcon.innerHTML = '▼';
  }

  function getEntryDepth(entry) {
    let depth = 0;
    let current = entry?.parentElement?.closest?.('.ontology-entry[id]');
    while (current) {
      depth += 1;
      current = current.parentElement?.closest?.('.ontology-entry[id]');
    }
    return depth;
  }

  function collapseOntologyForFocus(container, nextEntriesSet = new Set()) {
    if (!focusState.expandedEntries) {
      focusState.expandedEntries = new Set();
    }
    focusState.expandedEntries.forEach((entry) => {
      if (!entry || !entry.isConnected) return;
      if (nextEntriesSet.has(entry)) return;
      const depth = getEntryDepth(entry);
      if (depth <= 0) return;
      const childContainer = entry.querySelector<HTMLElement>(':scope > .ontology-child-container');
      if (childContainer) {
        childContainer.style.display = 'none';
        if (childContainer.children.length > 0) {
          const toggleIcon = entry.querySelector<HTMLElement>(':scope > .toggle-icon');
          if (toggleIcon) toggleIcon.innerHTML = '▶';
        }
      }
    });
    focusState.expandedEntries = nextEntriesSet;
  }

  function expandOntologyPath(segmentId, containerOverride?) {
    const container = containerOverride || focusState.ontologyUI?.container || document.getElementById('ontologyContainer');
    if (!container) return { entry: null, path: [] };
    const idStr = normalizeSegmentIdString(segmentId);
    if (!idStr) return { entry: null, path: [] };

    const path: HTMLElement[] = [];
    const ancestors = getAncestorChain(idStr);
    for (let i = ancestors.length - 1; i >= 0; i--) {
      const ancestorId = ancestors[i];
      const ancestorEntry = container.querySelector(`.ontology-entry[id="${ancestorId}"]`);
      if (ancestorEntry) {
        openOntologyEntry(ancestorEntry);
        path.push(ancestorEntry);
      }
    }

    const entry = container.querySelector(`.ontology-entry[id="${idStr}"]`);
    if (entry) {
      entry.style.display = 'block';
      const parent = entry.parentElement?.closest?.('.ontology-entry[id]');
      if (parent) openOntologyEntry(parent);
      const childContainer = entry.querySelector(':scope > .ontology-child-container');
      if (childContainer && childContainer.children.length > 0) {
        // Leave child container collapsed by default; do nothing.
      }
      path.push(entry);
    }
    return { entry, path };
  }

  function clearFocusHighlight(force = false) {
    if (!force) return;
    if (focusState.lastEntry) {
      focusState.lastEntry.classList.remove('auto-focus-match');
    }
    focusState.lastEntry = null;
    focusState.lastId = null;
    if (focusState.expandedEntries?.clear) {
      focusState.expandedEntries.clear();
    }
  }

  function focusSegmentInOntology(segmentId, { smooth = true, scroll = true, force = false } = {}) {
    if (!focusState.enabled) return;
    const container = focusState.ontologyUI?.container || document.getElementById('ontologyContainer');
    if (!container) return;
    const normalizedId = normalizeSegmentIdString(segmentId);
    if (!normalizedId) return;
    if (!force && normalizedId === focusState.lastId) {
      console.debug('[ViewerFocus] Skipping redundant focus on', normalizedId);
      return;
    }

    const { entry, path } = expandOntologyPath(normalizedId, container);
    if (!entry) return;
    const nextSet = new Set(path.filter((node) => node && node.isConnected));
    collapseOntologyForFocus(container, nextSet);
    console.debug('[ViewerFocus] Focused', normalizedId, 'expanded entries', nextSet.size);
    if (focusState.lastEntry && focusState.lastEntry !== entry) {
      focusState.lastEntry.classList.remove('auto-focus-match');
    }
    entry.classList.add('auto-focus-match');
    focusState.lastEntry = entry;
  focusState.lastId = normalizedId;
  if (scroll) {
    try {
      entry.scrollIntoView({ block: 'center', behavior: smooth ? 'smooth' : 'auto' });
    } catch (_) {
      entry.scrollIntoView(true);
    }
  }
}

  function describeSegmentationGroup(layerName) {
    const viewer = focusState.viewer || soloState.viewer || statusState.viewer;
    if (!viewer || !layerName) return { layer: null, segState: null, groupNames: [] };
    const entry = getLayerByName(viewer, layerName);
    const layer = entry?.layer ?? entry ?? null;
    const segState =
      layer?.displayState?.segmentationGroupState?.value ??
      layer?.layer?.displayState?.segmentationGroupState?.value ??
      null;
    const names = new Set();
    const add = (val) => {
      if (val === undefined || val === null) return;
      const str = String(val).trim();
      if (str) names.add(str);
    };
    add(segState?.name);
    add(segState?.linkedSegmentationGroup);
    add(layer?.linkedSegmentationGroup);
    add(layer?.displayState?.linkedSegmentationGroup);
    add(layer?.layer?.linkedSegmentationGroup);
    add(layer?.layer?.displayState?.linkedSegmentationGroup);
    return { layer, segState, groupNames: Array.from(names) };
  }

  function sharesTargetSegmentation(layerName, targetDescriptor) {
    if (!layerName || !targetDescriptor) return false;
    const candidate = describeSegmentationGroup(layerName);
    if (!candidate.layer) return false;
    if (targetDescriptor.segState && candidate.segState && targetDescriptor.segState === candidate.segState) {
      return true;
    }
    if (targetDescriptor.groupNames?.length && candidate.groupNames?.length) {
      return candidate.groupNames.some((name) => targetDescriptor.groupNames.includes(name));
    }
    return false;
  }

  function readLayerSelectedId(layerValue) {
    let candidate =
      layerValue?.value?.key ??
      layerValue?.value ??
      layerValue?.selectedValue ??
      layerValue?.key ??
      layerValue;
    if (candidate === undefined || candidate === null) return null;
    if (typeof candidate === 'object') {
      const nested =
        candidate?.key ??
        candidate?.value ??
        candidate?.id ??
        candidate?.segment ??
        null;
      if (nested !== null && nested !== undefined) {
        candidate = nested;
      } else if (typeof candidate.toString === 'function') {
        const text = candidate.toString();
        if (!text || text === '[object Object]') return null;
        candidate = text;
      } else {
        return null;
      }
    }
    const parsed = parseSegmentId(candidate);
    if (parsed === null || parsed === undefined) return null;
    const normalized = normalizeSegmentIdString(parsed);
    return normalized && normalized !== '0' ? normalized : null;
  }

  function readActiveSegmentId() {
    const viewer = focusState.viewer || soloState.viewer || statusState.viewer;
    if (!viewer) return null;

    try {
      const info = getSegmentationLayerInfo();
      const selectionState = info?.selectionState;
      if (selectionState) {
        try {
          const hasSelected = selectionState.hasSelectedSegment === undefined
            ? selectionState.selectedSegment !== undefined && selectionState.selectedSegment !== null
            : !!selectionState.hasSelectedSegment;
          if (hasSelected) {
            const rawSegment = selectionState.selectedSegment || selectionState.value || selectionState.segment;
            const clone = rawSegment && typeof rawSegment.clone === 'function' ? rawSegment.clone() : rawSegment;
            const fromSelection = uint64ToString(clone);
            if (fromSelection) {
              const normalized = normalizeSegmentIdString(fromSelection);
              if (normalized && normalized !== '0') {
                if (isKnownOntologyId(normalized)) {
                  return normalized;
                }
                console.debug('[ViewerFocus] Ignoring selectionState id not in ontology', normalized);
              }
            }
          }
        } catch (selectionReadError) {
          console.warn('[OctoEnhancements] Unable to read segmentSelectionState:', selectionReadError);
        }
      }
    } catch (infoError) {
      console.warn('[OctoEnhancements] Failed retrieving segmentation layer info:', infoError);
    }

    if (!viewer?.layerSelectedValues) return null;
    try {
    const state = typeof viewer.layerSelectedValues.toJSON === 'function'
      ? viewer.layerSelectedValues.toJSON()
      : viewer.layerSelectedValues;
    const tryKeys = [];
    const targetLayer = focusState.targetLayerName || soloState.targetLayerName || statusState.targetLayerName;
    if (targetLayer) tryKeys.push(targetLayer);
    const targetDescriptor = targetLayer ? describeSegmentationGroup(targetLayer) : null;
    if (state) {
      for (const key of Object.keys(state)) {
        if (!tryKeys.includes(key)) tryKeys.push(key);
      }
    }
    console.debug('[ViewerFocus] layerSelectedValues keys', tryKeys, 'stateKeys', state ? Object.keys(state) : 'none');
    for (const key of tryKeys) {
      const value = state?.[key];
      if (!value) continue;
      if (key !== targetLayer && !sharesTargetSegmentation(key, targetDescriptor)) {
        continue;
      }
      const normalized = readLayerSelectedId(value);
      if (!normalized) continue;
      if (!isKnownOntologyId(normalized)) {
        console.debug('[ViewerFocus] ignoring layerSelectedValues candidate', key, value, '->', normalized);
        continue;
      }
      console.debug('[ViewerFocus] layerSelectedValues hit', key, value, '->', normalized);
      return normalized;
    }
    const hoverId = focusState.ontologyUI?.neuroglancerHoverId || window.ontologyUI?.neuroglancerHoverId;
    if (focusState.hoverEnabled && hoverId) {
      const normalizedHover = normalizeSegmentIdString(hoverId);
      if (normalizedHover && normalizedHover !== '0') {
        if (isKnownOntologyId(normalizedHover)) {
          console.debug('[ViewerFocus] fallback to hover id', hoverId, '->', normalizedHover);
          return normalizedHover;
        }
        console.debug('[ViewerFocus] ignoring hover id not in ontology', hoverId, '->', normalizedHover);
      }
    }
    } catch (err) {
      console.warn('[OctoEnhancements] Failed reading active segment id:', err);
    }
    return null;
  }

  function attachFocusListener() {
    if (!focusState.enabled) return;
    const container = document.getElementById('neuroglancer-container');
    if (!container) {
      setTimeout(() => {
        if (focusState.enabled) attachFocusListener();
      }, 400);
      return;
    }
    if (focusState.viewerElement === container && focusState.clickHandler) {
      return;
    }
    detachFocusListener();
    const handler = (event) => {
      if (!focusState.enabled) return;
      if (event.button !== 0) return;
      if (!container.contains(event.target)) return;
      console.debug('[ViewerFocus] Mouseup detected; scheduling focus read');
      focusState.pendingSelectionUntil = Date.now() + 750;
      const attemptRead = (triesRemaining: number) => {
        const segmentId = readActiveSegmentId();
        if (segmentId) {
          focusSegmentInOntology(segmentId, { force: true });
          focusState.pendingSelectionUntil = 0;
          console.debug('[ViewerFocus] Mouse-driven focus applied for', segmentId);
          return;
        }
        if (triesRemaining > 0) {
          setTimeout(() => attemptRead(triesRemaining - 1), 90);
        } else {
          focusState.pendingSelectionUntil = 0;
        }
      };
      setTimeout(() => attemptRead(2), 40);
    };
    container.addEventListener('mouseup', handler, true);
    focusState.viewerElement = container;
    focusState.clickHandler = handler;
  }

  function detachFocusListener() {
    if (focusState.viewerElement && focusState.clickHandler) {
      try {
        focusState.viewerElement.removeEventListener('mouseup', focusState.clickHandler, true);
      } catch (_) {
        /* ignore */
      }
    }
    focusState.viewerElement = null;
    focusState.clickHandler = null;
  }

  function detachSelectionListener() {
    if (focusState.selectionListener) {
      const source = focusState.selectionSource;
      if (source?.changed && typeof source.changed.remove === 'function') {
        try {
          source.changed.remove(focusState.selectionListener);
        } catch (err) {
          console.warn('[OctoEnhancements] Failed removing selection listener:', err);
        }
      }
    }
    focusState.selectionListener = null;
    focusState.selectionSource = null;
  }

  function attachSelectionListener() {
    if (!focusState.enabled) return;
    const info = getSegmentationLayerInfo();
    const selectionState = info?.selectionState;
    if (selectionState?.changed) {
      if (focusState.selectionListener && focusState.selectionSource === selectionState) return;
      detachSelectionListener();
      const handler = () => {
        if (!focusState.enabled) return;
        const now = Date.now();
        const allowHover = !!focusState.hoverEnabled;
        const hasPendingClick = !!(focusState.pendingSelectionUntil && now <= focusState.pendingSelectionUntil);

        const segmentId = readActiveSegmentId();
        if (!segmentId) {
          if (allowHover) {
            clearFocusHighlight();
          }
          return;
        }

        const sourceLayerName =
          info?.layer?.name ||
          info?.segmentationState?.name ||
          focusState.targetLayerName ||
          soloState.targetLayerName ||
          statusState.targetLayerName ||
          undefined;

        showInfoForHoveredSegment(segmentId, sourceLayerName);

        if (!allowHover && !hasPendingClick) return;

        if (!allowHover && hasPendingClick) {
          focusState.pendingSelectionUntil = 0;
        }
        focusSegmentInOntology(segmentId, { smooth: false, scroll: false });
      };
      try {
        selectionState.changed.add(handler);
        focusState.selectionListener = handler;
        focusState.selectionSource = selectionState;
      } catch (err) {
        console.warn('[OctoEnhancements] Failed attaching segmentSelectionState listener:', err);
      }
      return;
    }

    const viewer = info?.viewer || focusState.viewer || soloState.viewer || statusState.viewer;
    const layerSelectedSignal = viewer?.layerSelectedValues?.changed;
    if (!layerSelectedSignal) {
      detachSelectionListener();
      return;
    }
    if (focusState.selectionListener && focusState.selectionSource === viewer?.layerSelectedValues) return;

    detachSelectionListener();

    const handler = () => {
      if (!focusState.enabled) return;
      const now = Date.now();
      const allowHover = !!focusState.hoverEnabled;
      const hasPendingClick = !!(focusState.pendingSelectionUntil && now <= focusState.pendingSelectionUntil);
      const segmentId = readActiveSegmentId();
      if (!segmentId) {
        if (allowHover) {
          clearFocusHighlight();
        }
        return;
      }
      const sourceLayerName =
        info?.layer?.name ||
        info?.segmentationState?.name ||
        focusState.targetLayerName ||
        soloState.targetLayerName ||
        statusState.targetLayerName ||
        undefined;

      showInfoForHoveredSegment(segmentId, sourceLayerName);

      if (!allowHover && !hasPendingClick) return;

      if (!allowHover && hasPendingClick) {
        focusState.pendingSelectionUntil = 0;
      }
      focusSegmentInOntology(segmentId, { smooth: false, scroll: false });
    };

    try {
      layerSelectedSignal.add(handler);
      focusState.selectionListener = handler;
      focusState.selectionSource = viewer.layerSelectedValues;
    } catch (err) {
      console.warn('[OctoEnhancements] Failed attaching layerSelectedValues listener:', err);
    }
  }

  function setViewerFocusEnabled(enabled, { persist = true, smooth = true } = {}) {
    const next = !!enabled;
    const changed = focusState.enabled !== next;
    focusState.enabled = next;
    if (persist) {
      try {
        window.localStorage?.setItem(focusState.storageKey, focusState.enabled ? '1' : '0');
      } catch (_) {
        /* ignore storage errors */
      }
    }
    detachSelectionListener();
    if (focusState.enabled) {
      attachFocusListener();
      attachSelectionListener();
      const activeId = readActiveSegmentId() || focusState.lastId;
      if (activeId && (changed || smooth)) {
        focusSegmentInOntology(activeId, { smooth });
      }
    } else {
      detachFocusListener();
      focusState.pendingSelectionUntil = 0;
      clearFocusHighlight(true);
    }
    try {
      window.dispatchEvent(new CustomEvent('octo:focus-toggle', { detail: { enabled: focusState.enabled } }));
    } catch (_) {
      /* ignore dispatch errors */
    }
  }

  function setViewerFocusHoverEnabled(enabled, { persist = true } = {}) {
    const next = !!enabled;
    const changed = focusState.hoverEnabled !== next;
    focusState.hoverEnabled = next;
    if (persist) {
      try {
        window.localStorage?.setItem(focusState.hoverStorageKey, focusState.hoverEnabled ? '1' : '0');
      } catch (_) {
        /* ignore storage errors */
      }
    }
    if (focusState.enabled && focusState.hoverEnabled && changed) {
      const candidate = readActiveSegmentId();
      if (candidate) {
        focusSegmentInOntology(candidate, { smooth: false, scroll: false, force: true });
      }
    }
    if (changed || !persist) {
      try {
        window.dispatchEvent(new CustomEvent('octo:focus-hover-toggle', { detail: { enabled: focusState.hoverEnabled } }));
      } catch (_) {
        /* ignore dispatch errors */
      }
    }
  }

  function setVisibleSegmentsFromStrings(stringIds) {
    const segInfo = getSegmentationLayerInfo();
    if (!segInfo?.layer) {
      console.warn('[OctoEnhancements] Segmentation visibleSegments not ready for solo toggle.');
      return false;
    }
    soloState.skipNextChange = true;
    mutateVisibleSegments(segInfo.layer, (segments) => {
      try {
        segments.clear?.();
        stringIds.forEach((idStr) => {
          const parsed = parseSegmentId(idStr);
          if (parsed !== null && parsed !== undefined) {
            try { segments.add(parsed); } catch (_) { /* ignore individual errors */ }
          }
        });
      } catch (err) {
        console.error('[OctoEnhancements] Failed applying solo segments:', err);
      }
    });
    if (soloState.ontologyUI?.updateCheckboxes) {
      setTimeout(() => {
        try { soloState.ontologyUI.updateCheckboxes(); } catch (err) { console.warn('[OctoEnhancements] updateCheckboxes failed:', err); }
        syncSoloEntryState();
      }, 35);
    }
    scheduleHudUpdate();
    return true;
  }

  function clearSolo(options = {}) {
    const { restore = true, external = false, silent = false } = options;
    if (!soloState.activeId) {
      if (external) soloState.previousSegments = null;
      updateSoloRestoreBanner();
      return false;
    }

    let currentEntry = soloState.activeEntry;
    if (!currentEntry || !currentEntry.isConnected) {
      currentEntry = getSoloEntryElement(soloState.activeId);
    }
    markSoloEntry(currentEntry, false);

    const previous = soloState.previousSegments;
    if (restore && previous && previous.size) {
      setVisibleSegmentsFromStrings(previous);
      soloState.previousSegments = null;
    } else if (external) {
      soloState.previousSegments = null;
    }

    soloState.activeId = null;
    soloState.activeEntry = null;
    updateSoloRestoreBanner();
    syncSoloEntryState();

    if (!silent) scheduleHudUpdate();
    try { currentEntry?.blur?.(); } catch (_) { /* ignore */ }
    return true;
  }

  function applySolo(entryId, entryDiv) {
    if (!entryId || !entryDiv) return;

    const currentSegInfo = getSegmentationLayerInfo();
    const visibleSegments = currentSegInfo?.visibleSegments;
    if (!visibleSegments) {
      console.warn('[OctoEnhancements] Segmentation state unavailable for solo action.');
      return;
    }

    const branchIds = collectBranchIds(entryId);
    if (!branchIds.size) {
      console.warn('[OctoEnhancements] No segments found for solo action on ID', entryId);
      return;
    }

    if (soloState.activeId === entryId) {
      clearSolo({ restore: true });
      return;
    }

    const currentVisible = convertVisibleSegmentsToStrings(visibleSegments);
    if (!soloState.activeId || !soloState.previousSegments || soloState.previousSegments.size === 0) {
      soloState.previousSegments = currentVisible;
    }

    if (soloState.activeId) {
      clearSolo({ restore: false, silent: true });
    }

    soloState.activeId = entryId;
    soloState.activeEntry = entryDiv;
    markSoloEntry(entryDiv, true);
    updateSoloRestoreBanner();
    if (focusState.enabled) {
      focusSegmentInOntology(entryId, { smooth: false });
    }

    setVisibleSegmentsFromStrings(branchIds);
  }

  function handleSoloTrigger(entryId, entry) {
    if (!entryId) return;
    const target = entry && entry.isConnected ? entry : getSoloEntryElement(entryId);
    if (soloState.activeId === entryId) {
      clearSolo({ restore: true });
    } else {
      applySolo(entryId, target || entry);
    }
  }

  function decorateOntologyEntries(container) {
    const entries = container.querySelectorAll('.ontology-entry[id]');
    entries.forEach((entry) => {
      if (entry.dataset.octoSoloBound === '1') return;
      entry.dataset.octoSoloBound = '1';

      const labelSpan = entry.querySelector(':scope > span:not(.toggle-icon):not(.ontology-checkbox)');
      const contextHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleSoloTrigger(entry.id, entry);
      };
      const middleClickHandler = (event) => {
        if (event.button !== 1) return;
        event.preventDefault();
        event.stopPropagation();
        handleSoloTrigger(entry.id, entry);
      };

    const targets = [labelSpan, entry];
    targets.forEach((target) => {
      if (!target) return;
      target.addEventListener('contextmenu', contextHandler);
      target.addEventListener('auxclick', middleClickHandler);
    });

    if (labelSpan && !labelSpan.dataset.octoSoloHint) {
      labelSpan.dataset.octoSoloHint = '1';
      const existingTitle = labelSpan.getAttribute('title');
      const hint = 'Right-click or middle-click to solo this branch';
      labelSpan.setAttribute('title', existingTitle ? `${existingTitle} • ${hint}` : hint);
    }
  });
    updateSoloRestoreBanner();
    syncSoloEntryState();
    removeLegacySoloButtons(container.ownerDocument || document);
  }

  function scheduleDecorate(container) {
    if (soloState.decorateScheduled) return;
    soloState.decorateScheduled = true;
    requestAnimationFrame(() => {
      soloState.decorateScheduled = false;
      decorateOntologyEntries(container);
    });
  }

  function observeOntology(container) {
    if (soloState.mutationObserver) return;
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (!mutation.addedNodes || mutation.addedNodes.length === 0) continue;
        scheduleDecorate(container);
        break;
      }
    });
    observer.observe(container, { childList: true, subtree: true });
    soloState.mutationObserver = observer;
  }

  enhancements.initStatusHud = function initStatusHud(options = {}) {
    statusState.viewer = options.viewer || statusState.viewer;
    statusState.targetLayerName = options.targetLayerName || statusState.targetLayerName;
    statusState.getMuteState = typeof options.getMuteState === 'function' ? options.getMuteState : statusState.getMuteState;

    if (!statusState.initialised) {
      let storedValue = null;
      try {
        storedValue = window.localStorage?.getItem(statusState.storageKey);
      } catch (_) {
        /* ignore storage errors */
      }
      if (storedValue === '1' || storedValue === '0') {
        statusState.enabled = storedValue === '1';
      } else if (typeof options.enabled === 'boolean') {
        statusState.enabled = options.enabled;
      }
      statusState.initialised = true;
    } else if (typeof options.enabled === 'boolean') {
      statusState.enabled = options.enabled;
    }

    ensureHudElement();
    attachStatusListeners();
    setHudEnabled(statusState.enabled, { persist: false });
    scheduleHudUpdate();
  };

  enhancements.refreshStatusHud = function refreshStatusHud() {
    if (!statusState.hudEl) return;
    scheduleHudUpdate();
  };

  enhancements.setHudEnabled = function setHudEnabledPublic(enabled) {
    setHudEnabled(enabled);
  };

  enhancements.isHudEnabled = function isHudEnabled() {
    return !!statusState.enabled;
  };

  enhancements.setViewerFocusEnabled = function setViewerFocusEnabledPublic(enabled, options) {
    setViewerFocusEnabled(enabled, options);
  };

  enhancements.isViewerFocusEnabled = function isViewerFocusEnabled() {
    return !!focusState.enabled;
  };

  enhancements.setViewerFocusHoverEnabled = function setViewerFocusHoverEnabledPublic(enabled, options) {
    setViewerFocusHoverEnabled(enabled, options);
  };

  enhancements.isViewerFocusHoverEnabled = function isViewerFocusHoverEnabled() {
    return !!focusState.hoverEnabled;
  };

  enhancements.clearSolo = function clearSoloPublic(options) {
    return clearSolo(options);
  };

  enhancements.applySolo = function applySoloPublic(entryId, entryEl) {
    return applySolo(entryId, entryEl);
  };

  enhancements.isSoloActive = function isSoloActive() {
    return !!soloState.activeId;
  };

  enhancements.getSoloState = function getSoloState() {
    return {
      activeId: soloState.activeId,
      previousSegments: soloState.previousSegments ? Array.from(soloState.previousSegments) : null,
    };
  };

  enhancements.enhanceOntology = function enhanceOntology(options = {}) {
    soloState.viewer = options.viewer || soloState.viewer;
    soloState.ontology = options.ontology || soloState.ontology;
    soloState.ontologyUI = options.ontologyUI || soloState.ontologyUI;
    soloState.targetLayerName = options.targetLayerName || soloState.targetLayerName || statusState.targetLayerName;

    focusState.viewer = options.viewer || focusState.viewer || soloState.viewer || statusState.viewer;
    focusState.ontology = options.ontology || focusState.ontology;
    focusState.ontologyUI = options.ontologyUI || focusState.ontologyUI;
    focusState.ontologyDict = options.ontologyDict || focusState.ontologyDict;
    focusState.targetLayerName = options.targetLayerName || focusState.targetLayerName || soloState.targetLayerName || statusState.targetLayerName;

    if (!focusState.initialised) {
      let storedFocus = null;
      let storedHover = null;
      try {
        storedFocus = window.localStorage?.getItem(focusState.storageKey);
      } catch (_) {
        /* ignore storage errors */
      }
      try {
        storedHover = window.localStorage?.getItem(focusState.hoverStorageKey);
      } catch (_) {
        /* ignore storage errors */
      }
      if (storedFocus === '1' || storedFocus === '0') {
        focusState.enabled = storedFocus === '1';
      }
      if (storedHover === '1' || storedHover === '0') {
        focusState.hoverEnabled = storedHover === '1';
      }
      focusState.initialised = true;
    }

    if (typeof options.focusHoverEnabled === 'boolean') {
      focusState.hoverEnabled = options.focusHoverEnabled;
    }

    if (typeof options.focusEnabled === 'boolean') {
      focusState.enabled = options.focusEnabled;
    }

    const container = soloState.ontologyUI?.container || document.getElementById('ontologyContainer');
    if (!container) {
      console.warn('[OctoEnhancements] Ontology container not found for solo controls.');
      return;
    }

    removeLegacySoloButtons(document);
    ensureLegacySoloCleanupObserver();
    scheduleLegacySoloCleanup();
    decorateOntologyEntries(container);
    observeOntology(container);
    attachSegmentationListener();
    scheduleHudUpdate();

    if (focusState.enabled) {
      setViewerFocusEnabled(true, { persist: false, smooth: false });
    } else {
      detachFocusListener();
      clearFocusHighlight(true);
    }
  };

declare global {
  interface Window {
    OctoEnhancements?: typeof enhancements;
  }
}

if (typeof window !== 'undefined') {
  window.OctoEnhancements = enhancements;
}

export default enhancements;
