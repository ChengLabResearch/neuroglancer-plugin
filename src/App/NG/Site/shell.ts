// @ts-nocheck
import { getParam, setParam } from '../Utils/url';
import { downloadTextFile, downloadCurrentState, copyCurrentState } from './download';
import { FIGURE_PANEL_CATALOG, FigurePanelEntry, getFigureLabel } from './figureCatalog';
import { PreviewPane } from '../Overlay/PreviewPane';
import {
  getStorageItem,
  setStorageItem,
  getJSONStorageItem,
  setJSONStorageItem,
} from '../Utils/storage';

const ONTOLOGY_DRAWER_STORAGE_KEY = 'ontology_drawer_open';
const ONTOLOGY_DRAWER_LEGACY_KEYS = ['octo_ontology_drawer_open'];
const ONTOLOGY_EXPANSION_STORAGE_KEY = 'ontology_expansion_v1';
const ONTOLOGY_EXPANSION_LEGACY_KEYS = ['octo_ontology_expansion_v1'];
const SHELL_HIDDEN_KEY = 'shell_hidden';
const SHELL_HIDDEN_LEGACY_KEYS = ['octo_shell_hidden'];

function getNextOverlayZ(): number {
  const win = window as any;
  const next = typeof win.__octoOverlayZ === 'number' ? win.__octoOverlayZ + 1 : 5000;
  win.__octoOverlayZ = next;
  return next;
}

function bringOverlayToFront(element: HTMLElement | null): void {
  if (!element) return;
  element.style.zIndex = String(getNextOverlayZ());
}

let ontologyDrawer: HTMLElement | null = null;
let ontologyQuickToggleButton: HTMLElement | null = null;
let ontologyDrawerCloseButton: HTMLElement | null = null;
let ontologyDrawerIsOpen = false;
let cachedOntologyExpansionState: { expanded: Set<string>; userPreference: boolean } | null = null;
let ontologyExpansionApplyTimer: ReturnType<typeof setTimeout> | null = null;
let previewPane: PreviewPane | null = null;

const escapeOntologySelectorId =
  typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
    ? (value: string | number) => CSS.escape(String(value))
    : (value: string | number) => String(value).replace(/["\\]/g, '\\$&');

export function scrollCard(id: string): void {
  const shell = document.getElementById('siteShell') as HTMLElement | null;
  const reopen = document.getElementById('openOverlayBtn');
  if (shell && shell.style.display === 'none') {
    shell.style.display = 'grid';
    reopen?.classList.add('hidden');
  }
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function loadOntologyExpansionState(): { expanded: Set<string>; userPreference: boolean } {
  if (cachedOntologyExpansionState) {
    return cachedOntologyExpansionState;
  }
  cachedOntologyExpansionState = { expanded: new Set<string>(), userPreference: false };
  const stored = getJSONStorageItem<any>(ONTOLOGY_EXPANSION_STORAGE_KEY, {
    legacyKeys: ONTOLOGY_EXPANSION_LEGACY_KEYS,
  });
  if (stored) {
    let expandedIds: string[] = [];
    let userPref = false;
    if (Array.isArray(stored)) {
      expandedIds = stored;
    } else if (typeof stored === 'object') {
      if (Array.isArray(stored.expanded)) {
        expandedIds = stored.expanded;
      }
      if (stored.userPreference === true) {
        userPref = true;
      }
    }
    expandedIds.forEach((id) => {
      if (typeof id === 'string' && id) {
        cachedOntologyExpansionState?.expanded.add(id);
      }
    });
    if (userPref || expandedIds.length > 0) {
      cachedOntologyExpansionState.userPreference = true;
    }
  }
  return cachedOntologyExpansionState;
}

function persistOntologyExpansionState(): void {
  if (!cachedOntologyExpansionState) return;
  const payload = {
    expanded: Array.from(cachedOntologyExpansionState.expanded || []),
    userPreference: !!cachedOntologyExpansionState.userPreference,
    v: 1,
  };
  setJSONStorageItem(ONTOLOGY_EXPANSION_STORAGE_KEY, payload, {
    legacyKeys: ONTOLOGY_EXPANSION_LEGACY_KEYS,
  });
}

function captureOntologyExpandedEntries(): string[] | null {
  const container = document.getElementById('ontologyContainer');
  if (!container) return null;
  const expandedIds: string[] = [];
  const entries = container.querySelectorAll('.ontology-entry[id]');
  entries.forEach((entry) => {
    const child = entry.querySelector<HTMLElement>(':scope > .ontology-child-container');
    if (!child || !child.children.length) return;
    const inlineDisplay = child.style.display;
    if (inlineDisplay && inlineDisplay !== 'none') {
      expandedIds.push(entry.id);
      return;
    }
    if (!inlineDisplay && typeof window !== 'undefined' && window.getComputedStyle) {
      const computed = window.getComputedStyle(child);
      if (computed && computed.display !== 'none') {
        expandedIds.push(entry.id);
      }
    }
  });
  return expandedIds;
}

export function setStoredOntologyExpansion(entryId: string, expanded: boolean): void {
  if (!entryId) return;
  const state = loadOntologyExpansionState();
  let changed = false;
  if (!state.userPreference) {
    state.userPreference = true;
    changed = true;
  }
  const snapshot = captureOntologyExpandedEntries();
  if (Array.isArray(snapshot)) {
    const nextExpanded = new Set<string>();
    snapshot.forEach((id) => {
      if (id !== undefined && id !== null && String(id)) {
        nextExpanded.add(String(id));
      }
    });
    const current = state.expanded || new Set<string>();
    if (current.size !== nextExpanded.size) {
      changed = true;
    } else {
      for (const id of nextExpanded) {
        if (!current.has(id)) {
          changed = true;
          break;
        }
      }
    }
    if (changed) {
      state.expanded = nextExpanded;
    }
  } else {
    const normalizedId = String(entryId);
    if (expanded && !state.expanded.has(normalizedId)) {
      state.expanded.add(normalizedId);
      changed = true;
    } else if (!expanded && state.expanded.has(normalizedId)) {
      state.expanded.delete(normalizedId);
      changed = true;
    }
  }
  if (changed) {
    persistOntologyExpansionState();
  }
}

function getOntologyEntryDepth(entry: Element | null): number {
  let depth = 0;
  let current = entry?.parentElement?.closest?.('.ontology-entry[id]') || null;
  while (current) {
    depth += 1;
    current = current.parentElement?.closest?.('.ontology-entry[id]') || null;
  }
  return depth;
}

function applyStoredOntologyExpansionState({ fallbackToDefault = true } = {}): boolean {
  const container = document.getElementById('ontologyContainer');
  if (!container) return false;

  const allEntries = container.querySelectorAll('.ontology-entry[id]');
  if (!allEntries.length) return false;

  const searchInput = document.getElementById('searchInput') as HTMLInputElement | null;
  if (searchInput && searchInput.value && searchInput.value.trim() !== '') {
    return true;
  }

  allEntries.forEach((entry) => {
    const child = entry.querySelector<HTMLElement>(':scope > .ontology-child-container');
    if (!child) return;
    child.style.display = 'none';
    const toggle = entry.querySelector<HTMLElement>(':scope > .toggle-icon');
    if (toggle && child.children.length > 0) {
      toggle.innerHTML = '▶';
    }
  });

  const state = loadOntologyExpansionState();
  const expandedIds = Array.from(state.expanded || []);
  const hasUserPreference = state.userPreference === true;
  let applied = false;

  if (expandedIds.length) {
    const expansions: Array<{ entry: Element; depth: number }> = [];
    expandedIds.forEach((id) => {
      const safeId = escapeOntologySelectorId(id);
      const entry = container.querySelector(`.ontology-entry[id="${safeId}"]`);
      if (entry) {
        expansions.push({ entry, depth: getOntologyEntryDepth(entry) });
      }
    });
    expansions.sort((a, b) => a.depth - b.depth);
    expansions.forEach(({ entry }) => {
      const child = entry.querySelector<HTMLElement>(':scope > .ontology-child-container');
      if (!child || !child.children.length) return;
      child.style.display = 'block';
      const toggle = entry.querySelector<HTMLElement>(':scope > .toggle-icon');
      if (toggle) toggle.innerHTML = '▼';
      applied = true;
    });
  }

  if (!applied && !hasUserPreference && fallbackToDefault) {
    const treeRoot = container.querySelector(':scope > div:last-child');
    if (treeRoot) {
      const topLevelEntries = Array.from(treeRoot.querySelectorAll(':scope > .ontology-entry[id]'));
      topLevelEntries.forEach((entry) => {
        const child = entry.querySelector<HTMLElement>(':scope > .ontology-child-container');
        if (!child || !child.children.length) return;
        child.style.display = 'block';
        const toggle = entry.querySelector<HTMLElement>(':scope > .toggle-icon');
        if (toggle) toggle.innerHTML = '▼';
      });
      applied = topLevelEntries.length > 0;
    }
  }

  return applied;
}

function cancelPendingOntologyExpansionApply(): void {
  if (ontologyExpansionApplyTimer) {
    clearTimeout(ontologyExpansionApplyTimer);
    ontologyExpansionApplyTimer = null;
  }
}

function scheduleOntologyExpansionApply({ immediate = false } = {}): void {
  cancelPendingOntologyExpansionApply();
  const attempt = () => {
    if (!ontologyDrawerIsOpen) {
      ontologyExpansionApplyTimer = null;
      return;
    }
    const applied = applyStoredOntologyExpansionState({ fallbackToDefault: true });
    if (!applied) {
      ontologyExpansionApplyTimer = setTimeout(attempt, 150);
    } else {
      ontologyExpansionApplyTimer = null;
    }
  };
  if (immediate) {
    attempt();
  } else {
    ontologyExpansionApplyTimer = setTimeout(attempt, 0);
  }
}

function readOntologyDrawerPreference(): boolean {
  const stored = getStorageItem(ONTOLOGY_DRAWER_STORAGE_KEY, {
    legacyKeys: ONTOLOGY_DRAWER_LEGACY_KEYS,
  });
  if (stored === '1') return true;
  if (stored === '0') return false;
  return false;
}

function updateOntologyDrawerToggleUI(open: boolean): void {
  if (!ontologyQuickToggleButton) return;
  ontologyQuickToggleButton.textContent = open ? 'Ontology ▾' : 'Ontology ▸';
  ontologyQuickToggleButton.setAttribute('aria-expanded', String(open));
  ontologyQuickToggleButton.setAttribute(
    'aria-label',
    open ? 'Hide ontology panel' : 'Show ontology panel'
  );
}

function setOntologyDrawerState(
  open: boolean,
  { persist = true, silent = false }: { persist?: boolean; silent?: boolean } = {}
): void {
  if (!ontologyDrawer) return;
  ontologyDrawerIsOpen = !!open;
  ontologyDrawer.classList.toggle('is-open', ontologyDrawerIsOpen);
  document.body.classList.toggle('ontology-drawer-open', ontologyDrawerIsOpen);
  ontologyDrawer.setAttribute('aria-hidden', String(!ontologyDrawerIsOpen));
  updateOntologyDrawerToggleUI(ontologyDrawerIsOpen);
  if (ontologyDrawerIsOpen) {
    bringOverlayToFront(ontologyDrawer);
    scheduleOntologyExpansionApply({ immediate: true });
  } else {
    cancelPendingOntologyExpansionApply();
  }
  if (persist) {
    setStorageItem(ONTOLOGY_DRAWER_STORAGE_KEY, ontologyDrawerIsOpen ? '1' : '0', {
      legacyKeys: ONTOLOGY_DRAWER_LEGACY_KEYS,
    });
  }
  if (!silent) {
    try {
      document.dispatchEvent(
        new CustomEvent('ontology-drawer-change', {
          detail: { open: ontologyDrawerIsOpen }
        })
      );
    } catch (_) {
      /* ignore */
    }
  }
}

function configureOntologyDrawer(options: {
  drawer: HTMLElement | null;
  toggle: HTMLElement | null;
  closeBtn: HTMLElement | null;
}): void {
  ontologyDrawer = options.drawer;
  ontologyQuickToggleButton = options.toggle;
  ontologyDrawerCloseButton = options.closeBtn;
  const desiredOpen = readOntologyDrawerPreference();
  setOntologyDrawerState(desiredOpen, { persist: false });

  ontologyQuickToggleButton?.addEventListener('click', () => {
    setOntologyDrawerState(!ontologyDrawerIsOpen);
  });
  ontologyDrawerCloseButton?.addEventListener('click', () => setOntologyDrawerState(false));
}

function initFigureBrowser(initialPreset: string | null): void {
  const figureSelect = document.getElementById('figureSelect') as HTMLSelectElement | null;
  const panelList = document.getElementById('fig-gallery') as HTMLUListElement | null;
  if (!figureSelect || !panelList) return;

  const grouped = new Map<string, FigurePanelEntry[]>();
  FIGURE_PANEL_CATALOG.forEach((entry) => {
    const list = grouped.get(entry.figure) ?? [];
    list.push(entry);
    grouped.set(entry.figure, list);
  });

  figureSelect.innerHTML = '';
  grouped.forEach((_entries, figure) => {
    const option = document.createElement('option');
    option.value = figure;
    option.textContent = getFigureLabel(figure);
    figureSelect.appendChild(option);
  });

  const renderPanels = (figure: string, activeStateId: string | null) => {
    panelList.innerHTML = '';
    const entries = grouped.get(figure) ?? [];
    if (previewPane) {
      previewPane.disable();
    }

    if (!entries.length) {
      const empty = document.createElement('li');
      empty.className = 'preset-card';
      empty.textContent = 'No panels recorded for this figure yet.';
      panelList.appendChild(empty);
      return;
    }

    let hasInteractiveState = false;
    const figureLabel = getFigureLabel(figure);

    entries.forEach((entry) => {
      const item = document.createElement('li');
      item.className = 'preset-card';
      item.dataset.kind = entry.kind;
      item.tabIndex = 0;

      if (entry.kind === 'state' && entry.stateId && activeStateId && entry.stateId === activeStateId) {
        item.dataset.active = '1';
      }

      const rawPreviewPath = entry.preview ?? entry.thumbnail;
      const previewImgPath = rawPreviewPath ? (rawPreviewPath.startsWith('.') ? rawPreviewPath : `./${rawPreviewPath}`) : null;
      const previewKey = entry.stateId || `${entry.figure}_${entry.panel}`;
      item.dataset.previewKey = previewKey;
      if (previewImgPath) {
        item.dataset.previewImg = previewImgPath;
      }

      const content = document.createElement('div');
      content.className = 'preset-card-content';

      if (entry.thumbnail || previewImgPath) {
        const thumbWrapper = document.createElement('div');
        thumbWrapper.className = 'preset-card-thumb';
        const thumb = document.createElement('img');
        thumb.src = entry.thumbnail ? (entry.thumbnail.startsWith('.') ? entry.thumbnail : `./${entry.thumbnail}`) : previewImgPath!;
        thumb.alt = `${figureLabel} panel ${entry.panel} thumbnail`;
        thumb.loading = 'lazy';
        thumb.decoding = 'async';
        thumbWrapper.appendChild(thumb);
        content.appendChild(thumbWrapper);
      }

      const meta = document.createElement('div');
      meta.className = 'figure-panel-meta';

      const title = document.createElement('div');
      title.className = 'figure-panel-title';
      title.textContent = `Panel ${entry.panel}`;
      meta.appendChild(title);

      const description = document.createElement('div');
      description.className = 'figure-panel-description';
      if (entry.kind === 'state' && entry.stateId) {
        description.textContent = `${entry.description} (ID: ${entry.stateId})`;
      } else {
        description.textContent = entry.description;
      }
      meta.appendChild(description);

      if (entry.kind === 'external') {
        const tag = document.createElement('span');
        tag.className = 'figure-panel-tag';
        tag.textContent = 'External asset';
        meta.appendChild(tag);
      }

      content.appendChild(meta);

      const body = document.createElement('div');
      body.className = 'figure-panel-body';
      body.appendChild(content);

      let actions: HTMLDivElement | null = null;
      const ensureActions = () => {
        if (!actions) {
          actions = document.createElement('div');
          actions.className = 'figure-panel-actions';
        }
        return actions;
      };

      if (entry.kind === 'state' && entry.stateId) {
        hasInteractiveState = true;
        const loadButton = document.createElement('button');
        loadButton.className = 'btn small';
        loadButton.type = 'button';
        loadButton.textContent = 'Load preset';
        loadButton.addEventListener('click', () => {
          setParam('j', entry.stateId || '', { replace: false });
        });
        ensureActions().appendChild(loadButton);

        if (entry.externalUrl) {
          const link = document.createElement('a');
          link.className = 'btn small ghost';
          link.href = entry.externalUrl;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = 'Open published link';
          ensureActions().appendChild(link);
        }
      }

      if (actions && actions.childElementCount > 0) {
        body.appendChild(actions);
      }

      item.appendChild(body);
      panelList.appendChild(item);
    });

    previewPane?.refresh();

    if (!hasInteractiveState) {
      const note = document.createElement('li');
      note.className = 'preset-card';
      note.textContent = 'This figure references external imagery; no Neuroglancer preset is linked.';
      panelList.appendChild(note);
    }
  };

  const initialMatch = initialPreset
    ? FIGURE_PANEL_CATALOG.find((entry) => entry.kind === 'state' && entry.stateId === initialPreset)
    : undefined;
  const firstFigure = initialMatch?.figure ?? figureSelect.options[0]?.value ?? null;

  if (firstFigure) {
    figureSelect.value = firstFigure;
    renderPanels(firstFigure, initialPreset);
  }

  figureSelect.addEventListener('change', () => {
    renderPanels(figureSelect.value, getParam('j'));
  });
}

export function initSiteShell(): void {
  const shell = document.getElementById('siteShell') as HTMLElement | null;
  const launchBtn = document.getElementById('launchBtn');
  const openOverlayBtn = document.getElementById('openOverlayBtn');
  const quickToggle = document.getElementById('ontologyQuickToggle');
  const ontologyDrawerElement = document.getElementById('ontologyDrawer') as HTMLElement | null;
  const ontologyDrawerClose = document.getElementById('ontologyDrawerClose') as HTMLElement | null;
  configureOntologyDrawer({ drawer: ontologyDrawerElement, toggle: quickToggle, closeBtn: ontologyDrawerClose });

  let drawerWasOpen = ontologyDrawerIsOpen;
  quickToggle?.classList.add('hidden');
  setOntologyDrawerState(false, { persist: false, silent: true });

  document.addEventListener('ontology-drawer-change', (event: Event) => {
    const detail = (event as CustomEvent).detail;
    drawerWasOpen = !!(detail?.open);
  });

  const openPresetBtn = document.getElementById('openPresetBtn');
  const presetInput = document.getElementById('presetInput') as HTMLInputElement | null;
  const copyBibBtn = document.getElementById('copyBibBtn');
  const downloadBibBtn = document.getElementById('downloadBibBtn');
  const downloadStateBtn = document.getElementById('downloadStateBtn');
  const copyStateBtn = document.getElementById('copyStateBtn');
  const hiddenKey = SHELL_HIDDEN_KEY;

  const initialPreset = getParam('j');
  if (presetInput && initialPreset) {
    presetInput.value = initialPreset;
  }

  initFigureBrowser(initialPreset);

  if (!previewPane) {
    try {
      previewPane = new PreviewPane({
        listSelector: '#fig-gallery',
        paneSelector: '#fig-preview-pane',
        imgSelector: '#fig-preview-img',
        captionSelector: '#fig-preview-caption',
        quickStartSelector: '#quick-start',
      });
      previewPane.refresh();
    } catch (error) {
      console.warn('[PreviewPane] Failed to initialise hover preview:', error);
      previewPane = null;
    }
  }

  const showShell = (persist = false) => {
    if (!shell) return;
    shell.style.display = 'grid';
    shell.setAttribute('aria-hidden', 'false');
    openOverlayBtn?.classList.add('hidden');
    quickToggle?.classList.add('hidden');
    drawerWasOpen = ontologyDrawerIsOpen;
    setOntologyDrawerState(false, { persist: false, silent: true });
    if (persist) {
      setStorageItem(hiddenKey, null, { legacyKeys: SHELL_HIDDEN_LEGACY_KEYS });
    }
  };

  const hideShell = (persist = true) => {
    if (!shell) return;
    shell.style.display = 'none';
    shell.setAttribute('aria-hidden', 'true');
    openOverlayBtn?.classList.remove('hidden');
    quickToggle?.classList.remove('hidden');
    const previousPreference = drawerWasOpen ?? readOntologyDrawerPreference();
    setOntologyDrawerState(false, { persist: false, silent: true });
    drawerWasOpen = previousPreference;
    if (persist) {
      setStorageItem(hiddenKey, '1', { legacyKeys: SHELL_HIDDEN_LEGACY_KEYS });
    }
    previewPane?.disable();
  };

  const restorePreference = () => {
    try {
      if (getStorageItem(hiddenKey, { legacyKeys: SHELL_HIDDEN_LEGACY_KEYS }) === '1') {
        hideShell(false);
      } else {
        showShell(false);
      }
    } catch (_) {
      showShell(false);
    }
  };

  launchBtn?.addEventListener('click', () => hideShell());
  openOverlayBtn?.addEventListener('click', () => showShell(true));

  openPresetBtn?.addEventListener('click', () => {
    const value = (presetInput?.value || '').trim();
    setParam('j', value ? value : 'landing_v4', { replace: false });
  });

  copyBibBtn?.addEventListener('click', async () => {
    const bib = document.getElementById('bibtex')?.textContent || '';
    try {
      await navigator.clipboard.writeText(bib || '');
      if (copyBibBtn) {
        const original = copyBibBtn.textContent;
        copyBibBtn.textContent = 'Copied!';
        setTimeout(() => {
          if (copyBibBtn) copyBibBtn.textContent = original || 'Copy BibTeX';
        }, 1200);
      }
    } catch (error) {
      console.error('Copy BibTeX failed', error);
    }
  });

  downloadBibBtn?.addEventListener('click', () => {
    const bib = document.getElementById('bibtex')?.textContent || '';
    downloadTextFile('octopus.bib', bib || '', 'application/x-bibtex');
  });

  downloadStateBtn?.addEventListener('click', () => downloadCurrentState());

  copyStateBtn?.addEventListener('click', async () => {
    if (await copyCurrentState()) {
      if (copyStateBtn) {
        const original = copyStateBtn.textContent;
        copyStateBtn.textContent = 'Copied!';
        setTimeout(() => {
          if (copyStateBtn) copyStateBtn.textContent = original || 'Copy current state';
        }, 1200);
      }
    }
  });

  restorePreference();
}
