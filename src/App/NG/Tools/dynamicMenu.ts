// @ts-nocheck

import {
  initializeLayerPanelControls,
  toggleLayerPanelVisibility,
  onLayerPanelVisibilityChange,
  isLayerPanelHidden,
} from './layerPanel';
import type { OntologyUI } from '../Ontology/ui';
import { styleButton, initialiseMuteButton, toggleMuteNonImageLayers } from '../Layers/mute';
import {
  initializeSidePanelControls,
  toggleSidePanelsHidden,
  onSidePanelsHiddenChange,
  isSidePanelsHidden,
} from './sidePanels';
import { loadDefaults, persistDefaults } from '../Export/defaults';
import {
  getStateJSON,
  findLayersByType,
  getSelectedSegmentIds,
  extractPrecomputedUrl as extractLayerPrecomputedUrl,
} from '../Export/ng-utils';
import {
  extractPrecomputedUrl as extractRawPrecomputedUrl,
  fetchPrecomputedInfo,
  mipOptionsFromInfo,
  mipOptionsFromStateTransform,
} from '../Export/mipRes';
import { scriptByLabelMeshBBox, scriptWholeImageDump } from '../Export/scriptTemplates';
import { downloadTextAsFile, copyToClipboard } from '../Export/download';
import { createPlaneAlignmentControls } from './alignPlane';
import { createPlaneTiltControls } from './planeTilt';

const toolIconSVG = `
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rainbow-stroke-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"    style="stop-color:var(--rainbow-c1); stop-opacity:1" />
      <stop offset="16.66%" style="stop-color:var(--rainbow-c2); stop-opacity:1" />
      <stop offset="33.33%" style="stop-color:var(--rainbow-c3); stop-opacity:1" />
      <stop offset="50%"    style="stop-color:var(--rainbow-c4); stop-opacity:1" />
      <stop offset="66.66%" style="stop-color:var(--rainbow-c5); stop-opacity:1" />
      <stop offset="83.33%" style="stop-color:var(--rainbow-c6); stop-opacity:1" />
      <stop offset="100%"   style="stop-color:var(--rainbow-c7); stop-opacity:1" />
    </linearGradient>
  </defs>
  <path class="rainbow-gear-stroke" stroke="url(#rainbow-stroke-gradient)" fill="none" stroke-width="1.5"
    d="M19.4302 12.9805C19.4702 12.6605 19.5002 12.3405 19.5002 12.0005C19.5002 11.6605 19.4702 11.3405 19.4302 11.0205L21.5402 9.37047C21.7302 9.22047 21.7802 8.95047 21.6602 8.73047L19.6602 5.27047C19.5402 5.05047 19.2702 4.96047 19.0502 5.04047L16.5602 6.04047C16.0402 5.64047 15.4802 5.31047 14.8702 5.07047L14.4902 2.42047C14.4602 2.18047 14.2502 2.00047 14.0002 2.00047H10.0002C9.75018 2.00047 9.54018 2.18047 9.51018 2.42047L9.13018 5.07047C8.52018 5.31047 7.96018 5.64047 7.44018 6.04047L4.95018 5.04047C4.72018 4.96047 4.46018 5.05047 4.34018 5.27047L2.34018 8.73047C2.22018 8.95047 2.27018 9.22047 2.46018 9.37047L4.57018 11.0205C4.53018 11.3405 4.50018 11.6605 4.50018 12.0005C4.50018 12.3405 4.53018 12.6605 4.57018 12.9805L2.46018 14.6305C2.27018 14.7805 2.22018 15.0505 2.34018 15.2705L4.34018 18.7305C4.46018 18.9505 4.73018 19.0405 4.95018 18.9605L7.44018 17.9605C7.96018 18.3605 8.52018 18.6905 9.13018 18.9305L9.51018 21.5805C9.54018 21.8205 9.75018 22.0005 10.0002 22.0005H14.0002C14.2502 22.0005 14.4602 21.8205 14.4902 21.5805L14.8702 18.9305C15.4802 18.6905 16.0402 18.3605 16.5602 17.9605L19.0502 18.9605C19.2802 19.0405 19.5402 18.9505 19.6602 18.7305L21.6602 15.2705C21.7802 15.0505 21.7302 14.7805 21.5402 14.6305L19.4302 12.9805ZM12.0002 15.5005C10.0702 15.5005 8.50018 13.9305 8.50018 12.0005C8.50018 10.0705 10.0702 8.50047 12.0002 8.50047C13.9302 8.50047 15.5002 10.0705 15.5002 12.0005C15.5002 13.9305 13.9302 15.5005 12.0002 15.5005Z"/>
</svg>`;

const DEFAULT_HIDDEN_LAYER_NAMES = ['Ghost octopus 2.8um', 'Glass octopus 5.6um'];

const MIP_MAX = 8;
const LARGE_EXPORT_THRESHOLD_BYTES = 100 * 1024 * 1024 * 1024; // ~100 GB

type LayerEntry = {
  layer: any;
  name: string;
};

function slugFilename(value: string): string {
  return (value || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/gi, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_+|_+$/g, '')
    || 'export';
}

function parseSegmentIds(input: string): Array<number | string> {
  if (!input) return [];
  const parts = input
    .split(/[,\s]+/)
    .map((part) => part.trim())
    .filter(Boolean);
  const result: Array<number | string> = [];
  const seen = new Set<string>();
  for (const part of parts) {
    if (seen.has(part)) continue;
    seen.add(part);
    const numeric = Number(part);
    if (Number.isSafeInteger(numeric)) {
      result.push(numeric);
    } else {
      result.push(part);
    }
  }
  return result;
}

function setSelectOptions(select: HTMLSelectElement, options: Array<{ value: string; label: string }>, selected: string) {
  select.innerHTML = '';
  options.forEach((option) => {
    const opt = document.createElement('option');
    opt.value = option.value;
    opt.textContent = option.label;
    if (option.value === selected) {
      opt.selected = true;
    }
    select.appendChild(opt);
  });
}

function toLayerEntries(layers: any[]): LayerEntry[] {
  return layers
    .map((layer: any) => {
      const name = layer?.name || layer?.layer?.name || layer?.source?.layerName || '';
      return {
        layer,
        name: name || '(untitled layer)',
      } as LayerEntry;
    })
    .filter((entry) => !!entry.layer);
}

function readMarginInputs(inputs: HTMLInputElement[]): [number, number, number] {
  return inputs.map((input) => Number.parseInt(input.value, 10) || 0) as [number, number, number];
}

function findLayerByName(entries: LayerEntry[], name: string): LayerEntry | undefined {
  return entries.find((entry) => entry.name === name) || entries[0];
}

type FeatureModules = {
  rotate: typeof import('./rotate');
  meshControls: typeof import('./meshControls');
  home: typeof import('./home');
  help: typeof import('./helpPopover');
  lineMode: typeof import('../Layers/lineMode');
  pathRide: typeof import('./pathRide');
};

let dynamicToolIcon: HTMLElement | null = null;
let dynamicToolMenu: HTMLElement | null = null;
let isMenuOpen = false;
let menuHoverTimeout: number | null = null;
let menuHideTimeout: number | null = null;
let viewerFocusToggleButton: HTMLButtonElement | null = null;
let viewerFocusHoverButton: HTMLButtonElement | null = null;
let layerPanelToggleButton: HTMLButtonElement | null = null;
let sidePanelsToggleButton: HTMLButtonElement | null = null;
let removeLayerPanelVisibilityListener: (() => void) | null = null;
let focusToggleListenerAttached = false;
let focusHoverListenerAttached = false;

let menuBuilt = false;
let featureModules: FeatureModules | null = null;
let menuBuildPromise: Promise<void> | null = null;
let featureModulesPromise: Promise<FeatureModules> | null = null;

function createCollapsibleSection(title: string, content: HTMLElement, options: { open?: boolean } = {}): HTMLDetailsElement {
  const details = document.createElement('details');
  details.className = 'tool-section';
  if (options.open) details.open = true;

  const summary = document.createElement('summary');
  summary.textContent = title;
  details.appendChild(summary);

  const body = document.createElement('div');
  body.className = 'tool-section-body';
  body.appendChild(content);
  details.appendChild(body);

  details.addEventListener('toggle', () => {
    if (!isMenuOpen) return;
    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(() => calculateAndPositionMenu());
    } else {
      calculateAndPositionMenu();
    }
  });

  return details;
}

function getNextOverlayZ(): number {
  const win = window as any;
  const next = typeof win.__octoOverlayZ === 'number' ? win.__octoOverlayZ + 1 : 5000;
  win.__octoOverlayZ = next;
  return next;
}

function bringOverlayToFront(element: HTMLElement | null): void {
  if (!element) return;
  element.style.zIndex = String(getNextOverlayZ());
  const parent = element.parentElement;
  if (parent && parent.classList.contains('tool-overlay-container')) {
    parent.style.zIndex = element.style.zIndex;
  }
}

function ensureOverlayContainer(): HTMLElement {
  let container = document.getElementById('tool-overlay-container') as HTMLElement | null;
  if (!container) {
    container = document.createElement('div');
    container.id = 'tool-overlay-container';
    document.body.appendChild(container);
  }
  return container;
}

function makeElementDraggable(element: HTMLElement, onDrag?: () => void): void {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const handleMouseDown = (event: MouseEvent) => {
    isDragging = true;
    const rect = element.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    element.classList.add('dragging');
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;
    event.preventDefault();
    clampDynamicToolIconToViewport(element, event.clientX - offsetX, event.clientY - offsetY);
    if (typeof onDrag === 'function') onDrag();
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    isDragging = false;
    element.classList.remove('dragging');
  };

  element.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
}

function clampDynamicToolIconToViewport(element: HTMLElement, x: number, y: number): void {
  const vpWidth = window.innerWidth;
  const vpHeight = window.innerHeight;
  const rect = element.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  const clampedX = Math.min(Math.max(0, x), vpWidth - width);
  const clampedY = Math.min(Math.max(0, y), vpHeight - height);
  element.style.left = `${clampedX}px`;
  element.style.top = `${clampedY}px`;
  element.style.bottom = 'auto';
}

function ensureToolIconInViewport(): void {
  if (!dynamicToolIcon) return;
  const rect = dynamicToolIcon.getBoundingClientRect();
  if (!Number.isFinite(rect.left) || !Number.isFinite(rect.top)) return;
  clampDynamicToolIconToViewport(dynamicToolIcon, rect.left, rect.top);
}

function calculateAndPositionMenu(): void {
  if (!dynamicToolIcon || !dynamicToolMenu) return;
  const iconRect = dynamicToolIcon.getBoundingClientRect();
  let menuRect = dynamicToolMenu.getBoundingClientRect();
  if (!menuRect.height) {
    const previousDisplay = dynamicToolMenu.style.display;
    const previousVisibility = dynamicToolMenu.style.visibility;
    dynamicToolMenu.style.visibility = 'hidden';
    dynamicToolMenu.style.display = 'block';
    menuRect = dynamicToolMenu.getBoundingClientRect();
    dynamicToolMenu.style.display = previousDisplay;
    dynamicToolMenu.style.visibility = previousVisibility;
  }
  const vpWidth = window.innerWidth;
  const vpHeight = window.innerHeight;
  const spacing = 12;
  let left = iconRect.left + (iconRect.width / 2) - (menuRect.width / 2);
  let top = iconRect.top - menuRect.height - spacing;
  let placement: 'top' | 'bottom' = 'top';
  if (top < 12) {
    placement = 'bottom';
    top = iconRect.bottom + spacing;
  }
  if (placement === 'bottom' && top + menuRect.height > vpHeight - 12) {
    top = Math.max(12, vpHeight - menuRect.height - 12);
  }
  if (placement === 'top' && top < 12) {
    top = 12;
  }
  if (left + menuRect.width > vpWidth - 12) left = vpWidth - menuRect.width - 12;
  if (left < 12) left = 12;
  dynamicToolMenu.style.left = `${left}px`;
  dynamicToolMenu.style.top = `${top}px`;
  dynamicToolMenu.dataset.placement = placement;
}

function showMenu(): void {
  if (!dynamicToolMenu) return;
  if (menuHideTimeout) {
    clearTimeout(menuHideTimeout);
    menuHideTimeout = null;
  }
  dynamicToolMenu.style.display = 'block';
  dynamicToolMenu.classList.remove('hidden');
  dynamicToolMenu.setAttribute('aria-hidden', 'false');
  dynamicToolMenu.style.opacity = '0';
  dynamicToolMenu.style.pointerEvents = 'none';
  dynamicToolMenu.style.transform = 'translateY(8px)';
  isMenuOpen = true;

  bringOverlayToFront(dynamicToolMenu);

  const finalize = () => {
    calculateAndPositionMenu();
    dynamicToolMenu.style.transform = 'translateY(0)';
    dynamicToolMenu.style.opacity = '1';
    dynamicToolMenu.style.pointerEvents = 'auto';
    const duration = parseFloat(window.getComputedStyle(dynamicToolMenu).transitionDuration) * 1000 || 180;
    menuHoverTimeout = window.setTimeout(() => {
      menuHoverTimeout = null;
    }, duration);
  };

  if (typeof window.requestAnimationFrame === 'function') {
    window.requestAnimationFrame(finalize);
  } else {
    finalize();
  }
}

function hideMenu(immediate = false): void {
  if (!dynamicToolMenu || !isMenuOpen) return;
  if (menuHoverTimeout) {
    clearTimeout(menuHoverTimeout);
    menuHoverTimeout = null;
  }
  const duration = immediate ? 0 : parseFloat(window.getComputedStyle(dynamicToolMenu).transitionDuration) * 1000 || 180;
  dynamicToolMenu.style.transform = 'translateY(8px)';
  dynamicToolMenu.style.opacity = '0';
  dynamicToolMenu.style.pointerEvents = 'none';
  dynamicToolMenu.setAttribute('aria-hidden', 'true');
  menuHideTimeout = window.setTimeout(() => {
    if (dynamicToolMenu) {
      dynamicToolMenu.classList.add('hidden');
      dynamicToolMenu.style.display = 'none';
    }
    menuHideTimeout = null;
  }, duration);
  isMenuOpen = false;
}

window.addEventListener('octo:mute-toggled', () => {
  hideMenu(true);
});

function expandSecondTier(container: HTMLElement | null): void {
  if (!container) return;
  const treeRootDiv = container.querySelector(':scope > div');
  if (!treeRootDiv) return;
  const entries = Array.from(treeRootDiv.children).filter((el) =>
    (el as HTMLElement).matches('.ontology-entry[id]')
  ) as HTMLElement[];
  entries.forEach((entry) => {
    const child = entry.querySelector(':scope > .ontology-child-container') as HTMLElement | null;
    const toggle = entry.querySelector(':scope > .toggle-icon') as HTMLElement | null;
    if (child && child.children.length > 0 && child.style.display === 'none') {
      child.style.display = 'block';
      if (toggle) toggle.innerHTML = '▼';
    }
  });
}

function expandFirstOntologyNode(container: HTMLElement | null): void {
  if (!container) return;
  const treeRootDiv = container.querySelector(':scope > div:last-child');
  if (!treeRootDiv) return;
  const firstEntry = treeRootDiv.querySelector(':scope > .ontology-entry[id]') as HTMLElement | null;
  if (!firstEntry) return;
  const childDiv = firstEntry.querySelector(':scope > .ontology-child-container') as HTMLElement | null;
  const toggleIcon = firstEntry.querySelector(':scope > .toggle-icon') as HTMLElement | null;
  if (childDiv && childDiv.children.length > 0) {
    childDiv.style.display = 'block';
    if (toggleIcon) toggleIcon.innerHTML = '▼';
  }
}

function createHoverPreviewPanel(ontologyUI: OntologyUI | null): HTMLElement {
  const section = document.createElement('div');
  section.className = 'hover-preview-panel';

  const title = document.createElement('div');
  title.textContent = 'Ontology hover preview';
  title.style.fontWeight = '600';
  title.style.margin = '6px 0 4px';
  title.style.fontSize = '12px';
  section.appendChild(title);

  const roots = ontologyUI?.getHoverPreviewRoots?.() || [];
  if (!roots.length) {
    const hint = document.createElement('div');
    hint.className = 'muted';
    hint.style.fontSize = '12px';
    hint.textContent = 'No ontology roots detected.';
    section.appendChild(hint);
    return section;
  }

  const hint = document.createElement('div');
  hint.className = 'muted';
  hint.style.fontSize = '12px';
  hint.style.marginBottom = '6px';
  hint.textContent = 'Choose whether hovering a root fans out its children.';
  section.appendChild(hint);

  roots.forEach((root) => {
    const row = document.createElement('div');
    row.className = 'hover-preview-row';
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.gap = '6px';
    row.style.marginBottom = '6px';

    const label = document.createElement('span');
    label.textContent = root.name || root.id;
    label.style.flex = '1 1 0';
    label.style.fontSize = '12px';
    label.title = root.id;

    const select = document.createElement('select');
    select.className = 'hover-preview-select';
    select.style.flex = '0 0 140px';
    select.dataset.rootId = root.id;

    const options: Array<{ value: string; label: string }> = [
      { value: 'full', label: 'Show children' },
      { value: 'tipOnly', label: 'Only hovered' },
      { value: 'none', label: 'No preview' },
    ];
    select.innerHTML = options
      .map((opt) => `<option value="${opt.value}">${opt.label}</option>`)
      .join('');
    select.value = root.policy || 'full';
    select.addEventListener('change', () => {
      const value = select.value;
      ontologyUI?.setHoverPreviewPolicy?.(root.id, value);
      if (isMenuOpen) calculateAndPositionMenu();
    });

    row.appendChild(label);
    row.appendChild(select);
    section.appendChild(row);
  });

  return section;
}

function createDownloadsPanel(ontologyUI: OntologyUI | null): HTMLElement {
  const defaults = loadDefaults();
  const state = getStateJSON();
  const imageEntries = toLayerEntries(findLayersByType(state, 'image'));
  const segEntries = toLayerEntries(findLayersByType(state, 'segmentation'));

  const sharedState = {
    compression: defaults.compression,
    transposeXY: defaults.transposeXY,
    predictor2: defaults.predictor2,
    memoryBudget: defaults.memoryBudgetGB,
  };

  const section = document.createElement('details');
  section.className = 'downloads-section';

  const summary = document.createElement('summary');
  summary.className = 'downloads-summary';
  summary.textContent = 'Downloads & Export';
  section.appendChild(summary);

  const container = document.createElement('div');
  container.className = 'downloads-panel';
  section.appendChild(container);

  section.addEventListener('toggle', () => {
    if (!isMenuOpen) return;
    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(() => calculateAndPositionMenu());
    } else {
      calculateAndPositionMenu();
    }
  });

  const tabGroup = document.createElement('div');
  tabGroup.className = 'button-group';
  const labelTabButton = document.createElement('button');
  const wholeTabButton = document.createElement('button');
  [labelTabButton, wholeTabButton].forEach((button) => {
    styleButton(button);
    button.type = 'button';
  });
  labelTabButton.textContent = 'By label';
  wholeTabButton.textContent = 'Whole image';
  tabGroup.appendChild(labelTabButton);
  tabGroup.appendChild(wholeTabButton);
  container.appendChild(tabGroup);

  const formsWrapper = document.createElement('div');
  formsWrapper.className = 'downloads-forms';
  formsWrapper.style.marginTop = '10px';
  container.appendChild(formsWrapper);

  const labelForm = document.createElement('form');
  labelForm.className = 'downloads-form';
  labelForm.addEventListener('submit', (event) => event.preventDefault());
  formsWrapper.appendChild(labelForm);

  const wholeForm = document.createElement('form');
  wholeForm.className = 'downloads-form';
  wholeForm.addEventListener('submit', (event) => event.preventDefault());
  formsWrapper.appendChild(wholeForm);

  let compressionSelectLabel: HTMLSelectElement;
  let compressionSelectWhole: HTMLSelectElement;
  let transposeCheckboxLabel: HTMLInputElement;
  let transposeCheckboxWhole: HTMLInputElement;
  let predictorCheckboxLabel: HTMLInputElement;
  let predictorCheckboxWhole: HTMLInputElement;
  let memoryBudgetInputLabel: HTMLInputElement;
  let memoryBudgetInputWhole: HTMLInputElement;

  const lastGenerated = {
    script: '',
    filename: '',
  };

  const scriptOutput = document.createElement('textarea');
  scriptOutput.readOnly = true;
  scriptOutput.rows = 14;
  scriptOutput.className = 'downloads-script-preview';
  scriptOutput.style.width = '100%';
  scriptOutput.style.marginTop = '12px';
  scriptOutput.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

  const scriptActions = document.createElement('div');
  scriptActions.className = 'downloads-script-actions';
  scriptActions.style.display = 'flex';
  scriptActions.style.gap = '8px';
  scriptActions.style.marginTop = '8px';

  const copyButton = document.createElement('button');
  copyButton.type = 'button';
  copyButton.textContent = 'Copy';
  styleButton(copyButton);
  copyButton.disabled = true;

  const downloadButton = document.createElement('button');
  downloadButton.type = 'button';
  downloadButton.textContent = 'Download .py';
  styleButton(downloadButton);
  downloadButton.disabled = true;

  scriptActions.appendChild(copyButton);
  scriptActions.appendChild(downloadButton);

  container.appendChild(scriptOutput);
  container.appendChild(scriptActions);

  const setScript = (script: string, filename: string) => {
    lastGenerated.script = script;
    lastGenerated.filename = filename;
    scriptOutput.value = script;
    const hasScript = script.trim().length > 0;
    copyButton.disabled = !hasScript;
    downloadButton.disabled = !hasScript;
    if (isMenuOpen) {
      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(() => calculateAndPositionMenu());
      } else {
        calculateAndPositionMenu();
      }
    }
  };

  copyButton.addEventListener('click', async () => {
    if (!lastGenerated.script) return;
    copyToClipboard(lastGenerated.script);
    const original = copyButton.textContent || 'Copy';
    copyButton.textContent = 'Copied!';
    copyButton.disabled = true;
    setTimeout(() => {
      copyButton.textContent = original;
      copyButton.disabled = false;
    }, 1200);
  });

  downloadButton.addEventListener('click', () => {
    if (!lastGenerated.script) return;
    const filename = lastGenerated.filename || `export_${Date.now()}.py`;
    downloadTextAsFile(filename, lastGenerated.script);
  });

  const defaultSegEntry = findLayerByName(segEntries, defaults.segmentationLayerName);
  const defaultImgEntry = findLayerByName(imageEntries, defaults.imageLayerName);

  const segmentIdsPrefill = () => {
    const ids = getSelectedSegmentIds();
    return ids.length ? ids.join(', ') : '';
  };

  const idsRow = document.createElement('div');
  idsRow.style.display = 'flex';
  idsRow.style.flexDirection = 'column';
  const idsLabel = document.createElement('label');
  idsLabel.textContent = 'Segment IDs';
  idsLabel.style.fontSize = '12px';
  idsLabel.style.marginBottom = '4px';
  const segmentIdsInput = document.createElement('textarea');
  segmentIdsInput.rows = 2;
  segmentIdsInput.placeholder = 'e.g. 997, 900, 905';
  segmentIdsInput.value = segmentIdsPrefill();
  segmentIdsInput.style.resize = 'vertical';
  idsRow.appendChild(idsLabel);
  idsRow.appendChild(segmentIdsInput);

  const refreshIdsButton = document.createElement('button');
  refreshIdsButton.type = 'button';
  styleButton(refreshIdsButton);
  refreshIdsButton.textContent = 'Refresh from viewer';
  refreshIdsButton.classList.add('ghost');
  refreshIdsButton.style.alignSelf = 'flex-start';
  refreshIdsButton.style.marginTop = '6px';
  refreshIdsButton.addEventListener('click', () => {
    segmentIdsInput.value = segmentIdsPrefill();
  });
  idsRow.appendChild(refreshIdsButton);
  labelForm.appendChild(idsRow);

  const buildLayerSelectRow = (labelText: string, entries: LayerEntry[], selectedName: string) => {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.flexDirection = 'column';
    row.style.marginTop = '8px';
    const label = document.createElement('label');
    label.textContent = labelText;
    label.style.fontSize = '12px';
    label.style.marginBottom = '4px';
    const select = document.createElement('select');
    select.style.padding = '4px';
    select.style.borderRadius = '6px';
    setSelectOptions(
      select,
      entries.map((entry) => ({ value: entry.name, label: entry.name })),
      selectedName
    );
    row.appendChild(label);
    row.appendChild(select);
    return { row, select };
  };

  const populateMipSelect = async (
    select: HTMLSelectElement,
    layer: any | undefined,
    preferredValue: number
  ): Promise<void> => {
    const ticket = ((select as any).__populateTicket ?? 0) + 1;
    (select as any).__populateTicket = ticket;
    select.innerHTML = '<option value="">Loading ...</option>';
    select.disabled = true;

    let options: Array<{ value: number; label: string }> | null = null;
    const rawUrl = layer ? extractRawPrecomputedUrl((layer.source ?? layer) as unknown) : null;
    if (rawUrl) {
      const info = await fetchPrecomputedInfo(rawUrl);
      if ((select as any).__populateTicket !== ticket) return;
      if (info && Array.isArray(info.scales) && info.scales.length) {
        options = mipOptionsFromInfo(info);
      }
    }

    if (!options) {
      options = mipOptionsFromStateTransform(layer, MIP_MAX + 1);
    }

    if ((select as any).__populateTicket !== ticket) return;

    select.innerHTML = '';
    options.forEach((option) => {
      const opt = document.createElement('option');
      opt.value = String(option.value);
      opt.textContent = option.label;
      select.appendChild(opt);
    });

    const targetValue = options.find((option) => option.value === preferredValue)?.value ?? options[0]?.value;
    if (typeof targetValue !== 'undefined') {
      select.value = String(targetValue);
    }
    select.disabled = false;

    if (isMenuOpen) {
      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(() => calculateAndPositionMenu());
      } else {
        calculateAndPositionMenu();
      }
    }
  };

  const segSelectRow = buildLayerSelectRow('Segmentation layer', segEntries, defaultSegEntry?.name || '');
  labelForm.appendChild(segSelectRow.row);

  const imageSelectRow = buildLayerSelectRow('Image layer', imageEntries, defaultImgEntry?.name || '');
  labelForm.appendChild(imageSelectRow.row);

  const buildMipSelect = (labelText: string, layerEntry: LayerEntry | undefined, defaultMip: number) => {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.flexDirection = 'column';
    row.style.marginTop = '8px';
    const label = document.createElement('label');
    label.textContent = labelText;
    label.style.fontSize = '12px';
    label.style.marginBottom = '4px';
    const select = document.createElement('select');
    select.style.padding = '4px';
    select.style.borderRadius = '6px';
    select.disabled = true;
    select.innerHTML = '<option value="">Loading ...</option>';
    row.appendChild(label);
    row.appendChild(select);
    populateMipSelect(select, layerEntry?.layer, defaultMip).catch((error) => {
      console.warn('[Dynamic Tools] Failed to populate MIP select:', error);
    });
    return { row, select };
  };

  const segMipRow = buildMipSelect('Segmentation MIP', defaultSegEntry, defaults.readMipSeg);
  labelForm.appendChild(segMipRow.row);
  const imageMipRow = buildMipSelect('Image MIP', defaultImgEntry, defaults.readMipImage);
  labelForm.appendChild(imageMipRow.row);

  const marginRow = document.createElement('div');
  marginRow.style.display = 'flex';
  marginRow.style.flexDirection = 'column';
  marginRow.style.marginTop = '8px';
  const marginLabel = document.createElement('label');
  marginLabel.textContent = 'Margin (vox)';
  marginLabel.style.fontSize = '12px';
  marginLabel.style.marginBottom = '4px';
  marginRow.appendChild(marginLabel);
  const marginInputsWrap = document.createElement('div');
  marginInputsWrap.style.display = 'flex';
  marginInputsWrap.style.gap = '6px';
  const marginInputs: HTMLInputElement[] = [];
  ['X', 'Y', 'Z'].forEach((axis, index) => {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.step = '1';
    input.value = String(defaults.marginVoxSeg[index] ?? 0);
    input.style.width = '70px';
    input.setAttribute('aria-label', `Margin ${axis}`);
    marginInputsWrap.appendChild(input);
    marginInputs.push(input);
    input.addEventListener('change', () => {
      persistDefaults({ marginVoxSeg: readMarginInputs(marginInputs) });
    });
  });
  marginRow.appendChild(marginInputsWrap);
  labelForm.appendChild(marginRow);

  const checkRow = (labelText: string, checked: boolean, persistKey: keyof ReturnType<typeof loadDefaults>) => {
    const wrapper = document.createElement('label');
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '6px';
    wrapper.style.marginTop = '6px';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;
    wrapper.appendChild(checkbox);
    const span = document.createElement('span');
    span.textContent = labelText;
    wrapper.appendChild(span);
    checkbox.addEventListener('change', () => {
      persistDefaults({ [persistKey]: checkbox.checked } as any);
    });
    return { wrapper, checkbox };
  };

  const saveImageToggle = checkRow('Save image array', defaults.saveImage, 'saveImage');
  labelForm.appendChild(saveImageToggle.wrapper);
  const saveSegToggle = checkRow('Save segmentation array', defaults.saveSeg, 'saveSeg');
  labelForm.appendChild(saveSegToggle.wrapper);
  const saveMaskToggle = checkRow('Save mask TIFF', defaults.saveMask, 'saveMask');
  labelForm.appendChild(saveMaskToggle.wrapper);
  const maskPerSliceToggle = checkRow('Mask per-slice subfolder', defaults.maskPerSlice, 'maskPerSlice');
  labelForm.appendChild(maskPerSliceToggle.wrapper);
  const zeroToggle = checkRow('Zero non-selected IDs', defaults.segZeroNonSelected, 'segZeroNonSelected');
  labelForm.appendChild(zeroToggle.wrapper);

  const dtypeRow = document.createElement('div');
  dtypeRow.style.display = 'flex';
  dtypeRow.style.flexDirection = 'column';
  dtypeRow.style.marginTop = '8px';
  const dtypeLabel = document.createElement('label');
  dtypeLabel.textContent = 'Segmentation dtype';
  dtypeLabel.style.fontSize = '12px';
  dtypeLabel.style.marginBottom = '4px';
  const dtypeSelect = document.createElement('select');
  dtypeSelect.style.padding = '4px';
  dtypeSelect.style.borderRadius = '6px';
  setSelectOptions(
    dtypeSelect,
    [
      { value: 'source', label: 'Source' },
      { value: 'uint32', label: 'uint32' },
      { value: 'uint16', label: 'uint16' },
    ],
    defaults.segArrayDtype
  );
  dtypeSelect.addEventListener('change', () => {
    persistDefaults({ segArrayDtype: dtypeSelect.value as any });
  });
  dtypeRow.appendChild(dtypeLabel);
  dtypeRow.appendChild(dtypeSelect);
  labelForm.appendChild(dtypeRow);

  const maskDepthRow = document.createElement('div');
  maskDepthRow.style.display = 'flex';
  maskDepthRow.style.flexDirection = 'column';
  maskDepthRow.style.marginTop = '8px';
  const maskDepthLabel = document.createElement('label');
  maskDepthLabel.textContent = 'Mask bit depth';
  maskDepthLabel.style.fontSize = '12px';
  maskDepthLabel.style.marginBottom = '4px';
  const maskDepthSelect = document.createElement('select');
  maskDepthSelect.style.padding = '4px';
  maskDepthSelect.style.borderRadius = '6px';
  setSelectOptions(
    maskDepthSelect,
    [
      { value: 'u8', label: '8-bit (0-255)' },
      { value: '1bit', label: '1-bit (binary)' },
    ],
    defaults.maskAs1Bit ? '1bit' : 'u8'
  );
  maskDepthSelect.addEventListener('change', () => {
    persistDefaults({ maskAs1Bit: maskDepthSelect.value === '1bit' });
  });
  maskDepthRow.appendChild(maskDepthLabel);
  maskDepthRow.appendChild(maskDepthSelect);
  labelForm.appendChild(maskDepthRow);

  const csvToggle = checkRow('Save CSV summary', defaults.saveCsv, 'saveCsv');
  labelForm.appendChild(csvToggle.wrapper);

  const csvCapRow = document.createElement('div');
  csvCapRow.style.display = 'flex';
  csvCapRow.style.flexDirection = 'column';
  csvCapRow.style.marginTop = '8px';
  const csvCapLabel = document.createElement('label');
  csvCapLabel.textContent = 'CSV row cap (optional)';
  csvCapLabel.style.fontSize = '12px';
  csvCapLabel.style.marginBottom = '4px';
  const csvCapInput = document.createElement('input');
  csvCapInput.type = 'number';
  csvCapInput.min = '1';
  csvCapInput.step = '1';
  csvCapInput.value = defaults.csvMaxRows === null ? '' : String(defaults.csvMaxRows);
  csvCapInput.style.width = '120px';
  csvCapInput.addEventListener('change', () => {
    const value = csvCapInput.value.trim();
    persistDefaults({ csvMaxRows: value ? Number.parseInt(value, 10) || null : null });
  });
  csvCapRow.appendChild(csvCapLabel);
  csvCapRow.appendChild(csvCapInput);
  labelForm.appendChild(csvCapRow);

  const sharedControlsRow = document.createElement('div');
  sharedControlsRow.style.display = 'grid';
  sharedControlsRow.style.gridTemplateColumns = 'repeat(auto-fit, minmax(140px, 1fr))';
  sharedControlsRow.style.gap = '6px';
  sharedControlsRow.style.marginTop = '10px';

  const buildCompressionSelect = () => {
    const label = document.createElement('label');
    label.style.display = 'flex';
    label.style.flexDirection = 'column';
    label.style.fontSize = '12px';
    label.textContent = 'Compression';
    const select = document.createElement('select');
    select.style.marginTop = '4px';
    select.style.padding = '4px';
    select.style.borderRadius = '6px';
    setSelectOptions(
      select,
      [
        { value: 'zlib', label: 'zlib' },
        { value: 'lzw', label: 'lzw' },
        { value: 'zstd', label: 'zstd' },
        { value: 'packbits', label: 'packbits' },
        { value: 'none', label: 'none' },
      ],
      sharedState.compression
    );
    label.appendChild(select);
    return { label, select };
  };

  const compressionLabel = buildCompressionSelect();
  sharedControlsRow.appendChild(compressionLabel.label);
  compressionSelectLabel = compressionLabel.select;

  const buildSharedCheckbox = (text: string, checked: boolean) => {
    const wrapper = document.createElement('label');
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '6px';
    wrapper.style.fontSize = '12px';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;
    wrapper.appendChild(checkbox);
    wrapper.appendChild(document.createTextNode(text));
    return { wrapper, checkbox };
  };

  const transposeRow = buildSharedCheckbox('Transpose XY for TIFF', sharedState.transposeXY);
  transposeCheckboxLabel = transposeRow.checkbox;
  sharedControlsRow.appendChild(transposeRow.wrapper);

  const predictorRow = buildSharedCheckbox('TIFF predictor 2', sharedState.predictor2);
  predictorCheckboxLabel = predictorRow.checkbox;
  sharedControlsRow.appendChild(predictorRow.wrapper);

  labelForm.appendChild(sharedControlsRow);

  const memoryRow = document.createElement('div');
  memoryRow.style.display = 'flex';
  memoryRow.style.alignItems = 'center';
  memoryRow.style.gap = '8px';
  memoryRow.style.marginTop = '8px';
  const memoryLabel = document.createElement('label');
  memoryLabel.textContent = 'Memory budget (GB)';
  memoryLabel.style.fontSize = '12px';
  const memoryInput = document.createElement('input');
  memoryInput.type = 'number';
  memoryInput.min = '0.5';
  memoryInput.step = '0.5';
  memoryInput.value = String(sharedState.memoryBudget);
  memoryInput.style.width = '100px';
  memoryRow.appendChild(memoryLabel);
  memoryRow.appendChild(memoryInput);
  labelForm.appendChild(memoryRow);
  memoryBudgetInputLabel = memoryInput;

  const labelHint = document.createElement('div');
  labelHint.className = 'downloads-hint';
  labelHint.style.fontSize = '12px';
  labelHint.style.marginTop = '6px';
  labelForm.appendChild(labelHint);

  const generateLabelButton = document.createElement('button');
  generateLabelButton.type = 'button';
  generateLabelButton.textContent = 'Generate Python';
  styleButton(generateLabelButton);
  generateLabelButton.style.marginTop = '8px';
  labelForm.appendChild(generateLabelButton);

  const generateInfoButton = document.createElement('button');
  generateInfoButton.type = 'button';
  generateInfoButton.textContent = 'Generate info JSON';
  styleButton(generateInfoButton);
  generateInfoButton.style.marginTop = '6px';
  labelForm.appendChild(generateInfoButton);

  // Whole image form controls
  wholeForm.style.marginTop = '8px';
  wholeForm.hidden = true;

  const wholeImageLayerRow = buildLayerSelectRow('Image layer', imageEntries, defaultImgEntry?.name || '');
  wholeForm.appendChild(wholeImageLayerRow.row);
  const wholeMipRow = buildMipSelect('Image MIP', defaultImgEntry, defaults.readMipImage);
  wholeForm.appendChild(wholeMipRow.row);

  const castRow = document.createElement('div');
  castRow.style.display = 'flex';
  castRow.style.flexDirection = 'column';
  castRow.style.marginTop = '8px';
  const castLabel = document.createElement('label');
  castLabel.textContent = 'Cast dtype';
  castLabel.style.fontSize = '12px';
  castLabel.style.marginBottom = '4px';
  const castSelect = document.createElement('select');
  castSelect.style.padding = '4px';
  castSelect.style.borderRadius = '6px';
  setSelectOptions(
    castSelect,
    [
      { value: 'source', label: 'Source' },
      { value: 'uint16', label: 'uint16' },
    ],
    defaults.wholeCastDtype
  );
  castSelect.addEventListener('change', () => {
    persistDefaults({ wholeCastDtype: castSelect.value as any });
  });
  castRow.appendChild(castLabel);
  castRow.appendChild(castSelect);
  wholeForm.appendChild(castRow);

  const saveModeRow = document.createElement('div');
  saveModeRow.style.display = 'flex';
  saveModeRow.style.flexDirection = 'column';
  saveModeRow.style.marginTop = '8px';
  const saveModeLabel = document.createElement('label');
  saveModeLabel.textContent = 'Output format';
  saveModeLabel.style.fontSize = '12px';
  saveModeLabel.style.marginBottom = '4px';
  const saveModeSelect = document.createElement('select');
  saveModeSelect.style.padding = '4px';
  saveModeSelect.style.borderRadius = '6px';
  setSelectOptions(
    saveModeSelect,
    [
      { value: 'stack', label: 'BigTIFF stack' },
      { value: 'slices', label: 'Per-slice TIFFs' },
    ],
    defaults.wholeSaveStack ? 'stack' : 'slices'
  );
  saveModeSelect.addEventListener('change', () => {
    persistDefaults({ wholeSaveStack: saveModeSelect.value === 'stack' });
  });
  saveModeRow.appendChild(saveModeLabel);
  saveModeRow.appendChild(saveModeSelect);
  wholeForm.appendChild(saveModeRow);

  const wholeSharedControls = document.createElement('div');
  wholeSharedControls.style.display = 'grid';
  wholeSharedControls.style.gridTemplateColumns = 'repeat(auto-fit, minmax(140px, 1fr))';
  wholeSharedControls.style.gap = '6px';
  wholeSharedControls.style.marginTop = '10px';

  const compressionWhole = buildCompressionSelect();
  wholeSharedControls.appendChild(compressionWhole.label);
  compressionSelectWhole = compressionWhole.select;

  const transposeWhole = buildSharedCheckbox('Transpose XY for TIFF', sharedState.transposeXY);
  transposeCheckboxWhole = transposeWhole.checkbox;
  wholeSharedControls.appendChild(transposeWhole.wrapper);

  const predictorWhole = buildSharedCheckbox('TIFF predictor 2', sharedState.predictor2);
  predictorCheckboxWhole = predictorWhole.checkbox;
  wholeSharedControls.appendChild(predictorWhole.wrapper);

  wholeForm.appendChild(wholeSharedControls);

  const wholeMemoryRow = document.createElement('div');
  wholeMemoryRow.style.display = 'flex';
  wholeMemoryRow.style.alignItems = 'center';
  wholeMemoryRow.style.gap = '8px';
  wholeMemoryRow.style.marginTop = '8px';
  const wholeMemoryLabel = document.createElement('label');
  wholeMemoryLabel.textContent = 'Memory budget (GB)';
  wholeMemoryLabel.style.fontSize = '12px';
  const wholeMemoryInput = document.createElement('input');
  wholeMemoryInput.type = 'number';
  wholeMemoryInput.min = '0.5';
  wholeMemoryInput.step = '0.5';
  wholeMemoryInput.value = String(sharedState.memoryBudget);
  wholeMemoryInput.style.width = '100px';
  wholeMemoryRow.appendChild(wholeMemoryLabel);
  wholeMemoryRow.appendChild(wholeMemoryInput);
  wholeForm.appendChild(wholeMemoryRow);
  memoryBudgetInputWhole = wholeMemoryInput;

  const wholeWarning = document.createElement('div');
  wholeWarning.style.fontSize = '12px';
  wholeWarning.style.marginTop = '6px';
  wholeWarning.style.color = '#f5d067';
  wholeWarning.hidden = true;
  wholeForm.appendChild(wholeWarning);

  const wholeHint = document.createElement('div');
  wholeHint.className = 'downloads-hint';
  wholeHint.style.fontSize = '12px';
  wholeHint.style.marginTop = '6px';
  wholeForm.appendChild(wholeHint);

  const generateWholeButton = document.createElement('button');
  generateWholeButton.type = 'button';
  generateWholeButton.textContent = 'Generate Python';
  styleButton(generateWholeButton);
  generateWholeButton.style.marginTop = '8px';
  wholeForm.appendChild(generateWholeButton);

  // Synchronise shared controls
  const updateCompression = (value: string) => {
    sharedState.compression = value as any;
    persistDefaults({ compression: value as any });
    compressionSelectLabel.value = value;
    compressionSelectWhole.value = value;
  };
  compressionSelectLabel.addEventListener('change', () => updateCompression(compressionSelectLabel.value));
  compressionSelectWhole.addEventListener('change', () => updateCompression(compressionSelectWhole.value));

  const updateTranspose = (checked: boolean) => {
    sharedState.transposeXY = checked;
    persistDefaults({ transposeXY: checked });
    transposeCheckboxLabel.checked = checked;
    transposeCheckboxWhole.checked = checked;
  };
  transposeCheckboxLabel.addEventListener('change', () => updateTranspose(transposeCheckboxLabel.checked));
  transposeCheckboxWhole.addEventListener('change', () => updateTranspose(transposeCheckboxWhole.checked));

  const updatePredictor = (checked: boolean) => {
    sharedState.predictor2 = checked;
    persistDefaults({ predictor2: checked });
    predictorCheckboxLabel.checked = checked;
    predictorCheckboxWhole.checked = checked;
  };
  predictorCheckboxLabel.addEventListener('change', () => updatePredictor(predictorCheckboxLabel.checked));
  predictorCheckboxWhole.addEventListener('change', () => updatePredictor(predictorCheckboxWhole.checked));

  const updateMemoryBudget = (value: number) => {
    if (!Number.isFinite(value) || value <= 0) return;
    sharedState.memoryBudget = value;
    persistDefaults({ memoryBudgetGB: value });
    memoryBudgetInputLabel.value = String(value);
    memoryBudgetInputWhole.value = String(value);
  };
  memoryBudgetInputLabel.addEventListener('change', () => {
    updateMemoryBudget(Number.parseFloat(memoryBudgetInputLabel.value) || sharedState.memoryBudget);
  });
  memoryBudgetInputWhole.addEventListener('change', () => {
    updateMemoryBudget(Number.parseFloat(memoryBudgetInputWhole.value) || sharedState.memoryBudget);
  });

  const activateTab = (type: 'label' | 'whole') => {
    if (type === 'label') {
      labelTabButton.classList.add('active');
      wholeTabButton.classList.remove('active');
      labelForm.hidden = false;
      wholeForm.hidden = true;
    } else {
      wholeTabButton.classList.add('active');
      labelTabButton.classList.remove('active');
      wholeForm.hidden = false;
      labelForm.hidden = true;
    }
  };

  labelTabButton.addEventListener('click', () => activateTab('label'));
  wholeTabButton.addEventListener('click', () => activateTab('whole'));
  activateTab('label');

  const resolveLayer = (entries: LayerEntry[], name: string) => findLayerByName(entries, name);

  const layerAvailable = (entry: LayerEntry | undefined): boolean => !!entry?.layer;

  const parseMipIndex = (value: string, fallback: number) => {
    const numeric = Number.parseInt(value, 10);
    return Number.isFinite(numeric) ? numeric : fallback;
  };

  const refreshLayerOptions = () => {
    const segEntry = resolveLayer(segEntries, segSelectRow.select.value);
    const imgEntry = resolveLayer(imageEntries, imageSelectRow.select.value);
    const wholeEntry = resolveLayer(imageEntries, wholeImageLayerRow.select.value);

    populateMipSelect(
      segMipRow.select,
      segEntry?.layer,
      parseMipIndex(segMipRow.select.value, defaults.readMipSeg)
    ).catch((error) => {
      console.warn('[Dynamic Tools] Failed to refresh segmentation MIP options:', error);
    });

    populateMipSelect(
      imageMipRow.select,
      imgEntry?.layer,
      parseMipIndex(imageMipRow.select.value, defaults.readMipImage)
    ).catch((error) => {
      console.warn('[Dynamic Tools] Failed to refresh image MIP options:', error);
    });

    populateMipSelect(
      wholeMipRow.select,
      wholeEntry?.layer,
      parseMipIndex(wholeMipRow.select.value, defaults.readMipImage)
    ).catch((error) => {
      console.warn('[Dynamic Tools] Failed to refresh whole-image MIP options:', error);
    });
  };

  segSelectRow.select.addEventListener('change', () => {
    persistDefaults({ segmentationLayerName: segSelectRow.select.value });
    refreshLayerOptions();
  });
  imageSelectRow.select.addEventListener('change', () => {
    persistDefaults({ imageLayerName: imageSelectRow.select.value });
    wholeImageLayerRow.select.value = imageSelectRow.select.value;
    refreshLayerOptions();
  });
  wholeImageLayerRow.select.addEventListener('change', () => {
    persistDefaults({ imageLayerName: wholeImageLayerRow.select.value });
    imageSelectRow.select.value = wholeImageLayerRow.select.value;
    refreshLayerOptions();
  });

  segMipRow.select.addEventListener('change', () => {
    persistDefaults({ readMipSeg: Number.parseInt(segMipRow.select.value, 10) });
  });
  imageMipRow.select.addEventListener('change', () => {
    persistDefaults({ readMipImage: Number.parseInt(imageMipRow.select.value, 10) });
    wholeMipRow.select.value = imageMipRow.select.value;
  });
  wholeMipRow.select.addEventListener('change', () => {
    persistDefaults({ readMipImage: Number.parseInt(wholeMipRow.select.value, 10) });
    imageMipRow.select.value = wholeMipRow.select.value;
  });

  const validateLabelForm = () => {
    const segEntry = resolveLayer(segEntries, segSelectRow.select.value);
    const imgEntry = resolveLayer(imageEntries, imageSelectRow.select.value);
    const ids = parseSegmentIds(segmentIdsInput.value);
    let reason = '';
    if (!segEntries.length) {
      reason = 'No segmentation layers available in the current viewer state.';
    } else if (!layerAvailable(segEntry)) {
      reason = 'Select a segmentation layer to export.';
    } else if (!imageEntries.length && saveImageToggle.checkbox.checked) {
      reason = 'No image layers available for export.';
    } else if (!layerAvailable(imgEntry) && saveImageToggle.checkbox.checked) {
      reason = 'Image layer required to save image array.';
    } else if (!ids.length) {
      reason = 'Add at least one segment ID.';
    }
    generateLabelButton.disabled = reason.length > 0;
    labelHint.textContent = reason;
  };

  [segmentIdsInput, segSelectRow.select, imageSelectRow.select, saveImageToggle.checkbox, saveSegToggle.checkbox, saveMaskToggle.checkbox].forEach((el) => {
    el.addEventListener('input', validateLabelForm);
    el.addEventListener('change', validateLabelForm);
  });
  validateLabelForm();

  const collectLayerFor = (entries: LayerEntry[], name: string) => resolveLayer(entries, name)?.layer;

  generateLabelButton.addEventListener('click', () => {
    const segLayerEntry = resolveLayer(segEntries, segSelectRow.select.value);
    const imageLayerEntry = resolveLayer(imageEntries, imageSelectRow.select.value);
    const segLayer = segLayerEntry?.layer;
    if (!segLayer) {
      validateLabelForm();
      return;
    }
    const ids = parseSegmentIds(segmentIdsInput.value);
    if (!ids.length) {
      validateLabelForm();
      return;
    }
    const segUrl = extractLayerPrecomputedUrl(segLayer) || '';
    const imgUrl = imageLayerEntry?.layer ? extractLayerPrecomputedUrl(imageLayerEntry.layer) || '' : '';
    const segLabel = segLayerEntry?.name || 'segments';
    const script = scriptByLabelMeshBBox({
      cloudpathImg: imgUrl,
      cloudpathSeg: segUrl,
      segIds: ids,
      segLabel,
      readMipImg: Number.parseInt(imageMipRow.select.value, 10) || 0,
      readMipSeg: Number.parseInt(segMipRow.select.value, 10) || 0,
      marginVoxSeg: readMarginInputs(marginInputs),
      saveImage: saveImageToggle.checkbox.checked,
      saveSeg: saveSegToggle.checkbox.checked,
      saveMask: saveMaskToggle.checkbox.checked,
      saveMaskPerSlice: maskPerSliceToggle.checkbox.checked,
      maskAs1Bit: maskDepthSelect.value === '1bit',
      saveCsv: csvToggle.checkbox.checked,
      csvMaxRows: csvCapInput.value ? Number.parseInt(csvCapInput.value, 10) || null : null,
      segZeroNonSelected: zeroToggle.checkbox.checked,
      segArrayDtype: dtypeSelect.value as any,
      transposeXY: transposeCheckboxLabel.checked,
      compression: compressionSelectLabel.value as any,
      predictor2: predictorCheckboxLabel.checked,
      memoryBudgetGB: Number.parseFloat(memoryBudgetInputLabel.value) || sharedState.memoryBudget,
    });
    const idSlug = ids.slice(0, 3).join('-');
    const filename = `download_by_label_${slugFilename(segLabel)}_ids${slugFilename(idSlug)}_mipI${imageMipRow.select.value}_mipS${segMipRow.select.value}.py`;
    setScript(script, filename);
  });

  generateInfoButton.addEventListener('click', () => {
    const segmentProps = ontologyUI?.ontology?.segmentProperties;
    if (!segmentProps) {
      setScript('// Ontology segment properties unavailable.', 'segment_properties.json');
      return;
    }
    try {
      const json = JSON.stringify(segmentProps, null, 2);
      setScript(json, 'segment_properties.json');
      labelHint.textContent = 'Segment properties copied to the output below.';
    } catch (error) {
      setScript(`// Failed to serialize segment properties: ${String(error)}`, 'segment_properties.json');
    }
  });

  const estimateWholeSize = () => {
    const imageLayer = collectLayerFor(imageEntries, wholeImageLayerRow.select.value);
    if (!imageLayer) {
      wholeWarning.hidden = true;
      return;
    }
    const size = imageLayer?.transform?.inputDimensions?.size || imageLayer?.size || imageLayer?.volumeSize;
    const scale = imageLayer?.source?.transform?.inputDimensions || imageLayer?.transform?.inputDimensions;
    const base = imageLayer?.size || imageLayer?.volumeSize;
    const dims = base && Array.isArray(base) ? base : imageLayer?.dimensions;
    if (!Array.isArray(dims)) {
      wholeWarning.hidden = true;
      return;
    }
    const mip = Number.parseInt(wholeMipRow.select.value, 10) || 0;
    const divisor = Math.pow(2, mip);
    const voxels = dims.reduce((acc: number, value: any) => acc * Math.max(1, Math.floor(Number(value) / divisor)), 1);
    const dtypeBytes = castSelect.value === 'uint16' ? 2 : (imageLayer?.dtypeBytes || 2);
    const estimatedBytes = voxels * dtypeBytes;
    if (Number.isFinite(estimatedBytes) && estimatedBytes > LARGE_EXPORT_THRESHOLD_BYTES) {
      wholeWarning.hidden = false;
      wholeWarning.textContent = 'Warning: estimate exceeds ~100 GB. Consider a higher MIP or per-slice output.';
    } else {
      wholeWarning.hidden = true;
    }
  };

  const validateWholeForm = () => {
    const imgLayer = resolveLayer(imageEntries, wholeImageLayerRow.select.value);
    let reason = '';
    if (!imageEntries.length) {
      reason = 'No image layers available for export.';
    } else if (!layerAvailable(imgLayer)) {
      reason = 'Select an image layer to export.';
    }
    generateWholeButton.disabled = reason.length > 0;
    wholeHint.textContent = reason;
  };

  [wholeImageLayerRow.select, wholeMipRow.select, castSelect, saveModeSelect].forEach((control) => {
    control.addEventListener('change', () => {
      validateWholeForm();
      estimateWholeSize();
    });
  });

  validateWholeForm();
  estimateWholeSize();

  generateWholeButton.addEventListener('click', () => {
    const imgLayerEntry = resolveLayer(imageEntries, wholeImageLayerRow.select.value);
    if (!imgLayerEntry?.layer) {
      validateWholeForm();
      return;
    }
    const script = scriptWholeImageDump({
      cloudpathImg: extractLayerPrecomputedUrl(imgLayerEntry.layer) || '',
      readMipImg: Number.parseInt(wholeMipRow.select.value, 10) || 0,
      castDtype: castSelect.value as any,
      saveStack: saveModeSelect.value === 'stack',
      transposeXY: transposeCheckboxWhole.checked,
      compression: compressionSelectWhole.value as any,
      predictor2: predictorCheckboxWhole.checked,
      memoryBudgetGB: Number.parseFloat(memoryBudgetInputWhole.value) || sharedState.memoryBudget,
    });
    const filename = `download_whole_image_mip${wholeMipRow.select.value}.py`;
    setScript(script, filename);
  });

  refreshLayerOptions();
  return section;
}

function updateViewerFocusHoverButton(focusEnabled?: boolean): void {
  if (!viewerFocusHoverButton) return;
  const focusActive = typeof focusEnabled === 'boolean'
    ? focusEnabled
    : !!window.OctoEnhancements?.isViewerFocusEnabled?.();
  const hoverEnabled = !!window.OctoEnhancements?.isViewerFocusHoverEnabled?.();
  viewerFocusHoverButton.style.display = focusActive ? '' : 'none';
  viewerFocusHoverButton.setAttribute('aria-hidden', focusActive ? 'false' : 'true');
  viewerFocusHoverButton.innerText = hoverEnabled ? 'Hover Navigation: On' : 'Hover Navigation: Off';
  viewerFocusHoverButton.setAttribute('aria-pressed', hoverEnabled ? 'true' : 'false');
  viewerFocusHoverButton.disabled = !focusActive;
  viewerFocusHoverButton.title = focusActive
    ? 'When enabled, hovering segments auto-focus the ontology.'
    : 'Enable Viewer Focus to allow hover navigation.';
}

function updateViewerFocusButton(): void {
  const enabled = !!window.OctoEnhancements?.isViewerFocusEnabled?.();
  if (viewerFocusToggleButton) {
    viewerFocusToggleButton.innerText = enabled ? 'Viewer Focus: On' : 'Viewer Focus: Off';
    viewerFocusToggleButton.setAttribute('aria-pressed', enabled ? 'true' : 'false');
  }
  updateViewerFocusHoverButton(enabled);
}

function syncLayerPanelButton(hidden: boolean): void {
  if (!layerPanelToggleButton) return;
  layerPanelToggleButton.innerText = hidden ? 'Show Layer Panel' : 'Hide Layer Panel';
  layerPanelToggleButton.setAttribute('aria-pressed', hidden ? 'true' : 'false');
  layerPanelToggleButton.classList.toggle('active', hidden);
  layerPanelToggleButton.title = hidden
    ? "Show Neuroglancer's layer list panel"
    : "Hide Neuroglancer's layer list panel";
}

function syncSidePanelsButton(hidden: boolean): void {
  if (!sidePanelsToggleButton) return;
  sidePanelsToggleButton.innerText = hidden ? 'Show Side Panels' : 'Hide Side Panels';
  sidePanelsToggleButton.setAttribute('aria-pressed', hidden ? 'true' : 'false');
  sidePanelsToggleButton.classList.toggle('active', hidden);
  sidePanelsToggleButton.title = hidden
    ? 'Restore settings/layer panels'
    : 'Hide settings, layer list, and selected-layer panels';
}

function loadFeatureModules(): Promise<FeatureModules> {
  if (!featureModulesPromise) {
    featureModulesPromise = Promise.all([
      import('./rotate'),
      import('./meshControls'),
      import('./home'),
      import('./helpPopover'),
      import('../Layers/lineMode'),
      import('./pathRide'),
    ]).then(([rotate, meshControls, home, help, lineMode, pathRide]) => ({
      rotate,
      meshControls,
      home,
      help,
      lineMode,
      pathRide,
    })).catch((error) => {
      featureModulesPromise = null;
      throw error;
    });
  }
  return featureModulesPromise;
}

async function buildMenu(viewer: any, ontologyUI: OntologyUI | null, targetLayerName: string): Promise<void> {
  if (!dynamicToolMenu) return;
  const modules = await loadFeatureModules();
  featureModules = modules;
  const { rotate, meshControls, home, help, lineMode, pathRide } = modules;

  rotate.initialiseRotation(viewer);
  dynamicToolMenu.innerHTML = '';

  const rotationButtons = document.createElement('div');
  rotationButtons.className = 'button-group';

  const rotateXButton = document.createElement('button');
  styleButton(rotateXButton);
  rotateXButton.style.width = 'auto';
  rotateXButton.style.flex = '1 1 0';
  rotateXButton.style.textAlign = 'center';
  rotateXButton.style.marginBottom = '0';
  rotateXButton.addEventListener('click', () => rotate.rotate3DViewerAroundAxisWithCurrentPerspective('X'));
  rotationButtons.appendChild(rotateXButton);

  const rotateYButton = document.createElement('button');
  styleButton(rotateYButton);
  rotateYButton.style.width = 'auto';
  rotateYButton.style.flex = '1 1 0';
  rotateYButton.style.textAlign = 'center';
  rotateYButton.style.marginBottom = '0';
  rotateYButton.addEventListener('click', () => rotate.rotate3DViewerAroundAxisWithCurrentPerspective('Y'));
  rotationButtons.appendChild(rotateYButton);

  const rotateZButton = document.createElement('button');
  styleButton(rotateZButton);
  rotateZButton.style.width = 'auto';
  rotateZButton.style.flex = '1 1 0';
  rotateZButton.style.textAlign = 'center';
  rotateZButton.style.marginBottom = '0';
  rotateZButton.addEventListener('click', () => rotate.rotate3DViewerAroundAxisWithCurrentPerspective('Z'));
  rotationButtons.appendChild(rotateZButton);

  const stopRotationButton = document.createElement('button');
  stopRotationButton.innerText = 'Stop Rotation';
  styleButton(stopRotationButton);
  stopRotationButton.style.display = 'none';
  stopRotationButton.id = 'stopButton';
  stopRotationButton.style.backgroundColor = '#d9534f';
  stopRotationButton.addEventListener('mouseenter', () => stopRotationButton.style.backgroundColor = '#c9302c');
  stopRotationButton.addEventListener('mouseleave', () => stopRotationButton.style.backgroundColor = '#d9534f');
  stopRotationButton.addEventListener('click', () => rotate.stopCurrentRotation());

  const rotationSection = document.createElement('div');
  rotationSection.appendChild(rotationButtons);
  rotationSection.appendChild(stopRotationButton);

  const speedContainer = document.createElement('div');
  speedContainer.id = 'speedContainer';
  const speedLabel = document.createElement('label');
  speedLabel.htmlFor = 'speedSliderInput';
  speedLabel.innerText = 'Speed / Direction:';
  const speedSlider = document.createElement('input');
  speedSlider.type = 'range';
  speedSlider.id = 'speedSliderInput';
  speedSlider.min = '-0.05';
  speedSlider.max = '0.05';
  speedSlider.step = '0.001';
  const initialSpeed = rotate.getRotationSpeed();
  speedSlider.value = String(initialSpeed);
  speedSlider.title = 'Negative = rotate left, Positive = rotate right';
  const speedValue = document.createElement('span');
  speedValue.className = 'speed-value';
  const applySpeed = (value: number) => {
    rotate.setRotationSpeed(value);
    if (Math.abs(value) < 0.0005) {
      speedValue.innerText = 'Stopped';
    } else if (value > 0) {
      speedValue.innerText = `↻ ${value.toFixed(3)}`;
    } else {
      speedValue.innerText = `↺ ${Math.abs(value).toFixed(3)}`;
    }
  };
  speedSlider.addEventListener('input', () => {
    applySpeed(parseFloat(speedSlider.value));
  });
  applySpeed(initialSpeed);
  speedContainer.appendChild(speedLabel);
  const speedRow = document.createElement('div');
  speedRow.className = 'speed-row';
  speedRow.appendChild(speedSlider);
  speedRow.appendChild(speedValue);
  speedContainer.appendChild(speedRow);
  rotationSection.appendChild(speedContainer);

  const rotationModeLabel = document.createElement('label');
  rotationModeLabel.innerText = 'Rotation reference:';
  rotationModeLabel.style.fontSize = '11px';
  rotationModeLabel.style.display = 'block';
  rotationModeLabel.style.margin = '6px 0 4px 0';
  rotationSection.appendChild(rotationModeLabel);

  const rotationModeButtons = document.createElement('div');
  rotationModeButtons.className = 'button-group';
  const datasetAxisBtn = document.createElement('button');
  datasetAxisBtn.type = 'button';
  datasetAxisBtn.innerText = 'Dataset axes';
  styleButton(datasetAxisBtn);
  const viewAxisBtn = document.createElement('button');
  viewAxisBtn.type = 'button';
  viewAxisBtn.innerText = 'View axes';
  styleButton(viewAxisBtn);
  rotationModeButtons.appendChild(datasetAxisBtn);
  rotationModeButtons.appendChild(viewAxisBtn);
  rotationSection.appendChild(rotationModeButtons);

  const rotationLabels = {
    world: [
      { text: 'Rotate X', title: 'Rotate around dataset X axis' },
      { text: 'Rotate Y', title: 'Rotate around dataset Y axis' },
      { text: 'Rotate Z', title: 'Rotate around dataset Z axis' },
    ],
    view: [
      { text: 'Orbit Up/Down', title: 'Orbit vertically in view space' },
      { text: 'Orbit Left/Right', title: 'Orbit horizontally in view space' },
      { text: 'Roll View', title: 'Roll the camera around its viewing axis' },
    ],
  } as const;

  const updateRotationButtonLabels = (mode: 'world' | 'view') => {
    const labels = rotationLabels[mode];
    [rotateXButton, rotateYButton, rotateZButton].forEach((button, index) => {
      button.innerText = labels[index].text;
      button.title = labels[index].title;
    });
  };

  const applyRotationMode = (mode: 'world' | 'view', persistAngle = true) => {
    rotate.setRotationMode(mode, persistAngle);
    datasetAxisBtn.classList.toggle('active', mode === 'world');
    viewAxisBtn.classList.toggle('active', mode === 'view');
    updateRotationButtonLabels(mode);
  };
  datasetAxisBtn.addEventListener('click', () => applyRotationMode('world'));
  viewAxisBtn.addEventListener('click', () => applyRotationMode('view'));
  applyRotationMode(rotate.getRotationMode(), false);

  dynamicToolMenu.appendChild(createCollapsibleSection('Rotation', rotationSection));

  const restoreButton = document.createElement('button');
  restoreButton.innerText = 'Restore View';
  styleButton(restoreButton);
  restoreButton.id = 'restoreViewButton';
  restoreButton.title = 'Return to saved home view or initial';
  restoreButton.addEventListener('click', () => home.restoreView());

  const setHomeButton = document.createElement('button');
  setHomeButton.innerText = 'Set Home View';
  styleButton(setHomeButton);
  setHomeButton.id = 'setHomeButton';
  setHomeButton.title = 'Save current view as home';
  setHomeButton.addEventListener('click', () => home.setHomeView());

  const sync3Dto2DButton = document.createElement('button');
  sync3Dto2DButton.innerText = 'Match 2D ← 3D';
  styleButton(sync3Dto2DButton);
  sync3Dto2DButton.title = 'Apply 3D orientation to 2D slices';
  sync3Dto2DButton.addEventListener('click', () => rotate.match2DTo3DView());

  const sync2Dto3DButton = document.createElement('button');
  sync2Dto3DButton.innerText = 'Match 3D ← 2D';
  styleButton(sync2Dto3DButton);
  sync2Dto3DButton.title = 'Apply 2D orientation to 3D view';
  sync2Dto3DButton.addEventListener('click', () => rotate.match3DTo2DView());
  const viewSection = document.createElement('div');
  viewSection.appendChild(restoreButton);
  viewSection.appendChild(setHomeButton);
  viewSection.appendChild(sync3Dto2DButton);
  viewSection.appendChild(sync2Dto3DButton);
  dynamicToolMenu.appendChild(createCollapsibleSection('View State', viewSection));

  const muteButton = document.createElement('button');
  muteButton.id = 'muteNonImageButton';
  muteButton.title = 'Temporarily hide/show non-image layers (Ctrl+Space)';
  initialiseMuteButton(muteButton);
  muteButton.addEventListener('click', () => {
    if (muteButton.disabled) return;
  muteButton.disabled = true;
  try { toggleMuteNonImageLayers(); } finally { muteButton.disabled = false; }
});
  const panelSection = document.createElement('div');
  panelSection.appendChild(muteButton);

  initializeLayerPanelControls();

  layerPanelToggleButton = document.createElement('button');
  layerPanelToggleButton.id = 'layerPanelToggleButton';
  styleButton(layerPanelToggleButton);
  layerPanelToggleButton.setAttribute('aria-label', 'Toggle Neuroglancer layer panel visibility');
  layerPanelToggleButton.addEventListener('click', () => toggleLayerPanelVisibility());
  panelSection.appendChild(layerPanelToggleButton);
  removeLayerPanelVisibilityListener?.();
  removeLayerPanelVisibilityListener = onLayerPanelVisibilityChange((hidden) => {
    syncLayerPanelButton(hidden);
  });
  syncLayerPanelButton(isLayerPanelHidden());

  sidePanelsToggleButton = document.createElement('button');
  sidePanelsToggleButton.id = 'sidePanelsToggleButton';
  styleButton(sidePanelsToggleButton);
  sidePanelsToggleButton.setAttribute('aria-label', 'Toggle visibility of Neuroglancer side panels');
  sidePanelsToggleButton.addEventListener('click', () => toggleSidePanelsHidden());
  panelSection.appendChild(sidePanelsToggleButton);
  onSidePanelsHiddenChange((hidden) => syncSidePanelsButton(hidden));
  syncSidePanelsButton(isSidePanelsHidden());
  dynamicToolMenu.appendChild(createCollapsibleSection('Panels & Layers', panelSection));

  viewerFocusToggleButton = document.createElement('button');
  viewerFocusToggleButton.id = 'viewerFocusToggleButton';
  styleButton(viewerFocusToggleButton);
  viewerFocusToggleButton.setAttribute('aria-label', 'Toggle ontology auto-focus from viewer clicks');
  viewerFocusToggleButton.addEventListener('click', () => {
    const current = !!window.OctoEnhancements?.isViewerFocusEnabled?.();
    window.OctoEnhancements?.setViewerFocusEnabled?.(!current);
    updateViewerFocusButton();
  });
  updateViewerFocusButton();

  viewerFocusHoverButton = document.createElement('button');
  viewerFocusHoverButton.id = 'viewerFocusHoverButton';
  styleButton(viewerFocusHoverButton);
  viewerFocusHoverButton.setAttribute('aria-label', 'Toggle hover-based ontology navigation');
  viewerFocusHoverButton.addEventListener('click', () => {
    const current = !!window.OctoEnhancements?.isViewerFocusHoverEnabled?.();
    window.OctoEnhancements?.setViewerFocusHoverEnabled?.(!current);
    updateViewerFocusHoverButton();
  });
  updateViewerFocusHoverButton();

  const hoverPreviewPanel = createHoverPreviewPanel(ontologyUI);
  const hoverSection = document.createElement('div');
  hoverSection.appendChild(viewerFocusToggleButton);
  hoverSection.appendChild(viewerFocusHoverButton);
  hoverSection.appendChild(hoverPreviewPanel);
  dynamicToolMenu.appendChild(createCollapsibleSection('Hover & Focus', hoverSection));

  const lineModeButton = document.createElement('button');
  lineModeButton.id = 'toggleLineModeButton';
  lineModeButton.innerText = 'Points to Lines';
  styleButton(lineModeButton);
  lineModeButton.title = 'Toggle selected annotation layer between points and lines';
  lineModeButton.addEventListener('click', () => lineMode.toggleLineMode());

  const pathRideControls = pathRide.createPathRideControls({
    viewer,
    styleButton,
  });
  const planeTiltControls = createPlaneTiltControls({ viewer, styleButton });
  const planeAlignControls = createPlaneAlignmentControls({ viewer, styleButton });
  const annotationSection = document.createElement('div');
  annotationSection.appendChild(lineModeButton);
  annotationSection.appendChild(createCollapsibleSection('Path Ride', pathRideControls.element));
  annotationSection.appendChild(createCollapsibleSection('Plane Nudge', planeTiltControls.element));
  annotationSection.appendChild(createCollapsibleSection('Plane Align', planeAlignControls.element));
  dynamicToolMenu.appendChild(createCollapsibleSection('Annotation Tools', annotationSection));

  const meshControlsInstance = meshControls.createMeshControls({
    viewer,
    styleButton,
    defaultHiddenLayers: new Set(DEFAULT_HIDDEN_LAYER_NAMES),
  });
  dynamicToolMenu.appendChild(createCollapsibleSection('Mesh Controls', meshControlsInstance.element));

  const downloadsPanel = createDownloadsPanel(ontologyUI);
  dynamicToolMenu.appendChild(downloadsPanel);

  const helpUI = help.createHelpPopover(styleButton);
  dynamicToolMenu.appendChild(helpUI.button);
  dynamicToolMenu.appendChild(helpUI.popover);

  expandSecondTier(document.getElementById('ontologyContainer'));
  expandFirstOntologyNode(document.getElementById('ontologyContainer'));
  if (dynamicToolIcon && dynamicToolMenu) {
    calculateAndPositionMenu();
  }
  menuBuilt = true;
}

async function ensureMenuBuilt(viewer: any, ontologyUI: OntologyUI | null, targetLayerName: string): Promise<void> {
  if (menuBuilt) return;
  if (!menuBuildPromise) {
    menuBuildPromise = buildMenu(viewer, ontologyUI, targetLayerName)
      .catch((error) => {
        menuBuilt = false;
        throw error;
      })
      .finally(() => {
        menuBuildPromise = null;
      });
  }
  return menuBuildPromise;
}

export function createDynamicToolIcon(options: { ontologyUI?: OntologyUI | null; targetLayerName: string; viewer?: any }): void {
  const overlayContainer = ensureOverlayContainer();
  const { ontologyUI = null, viewer = window.viewer, targetLayerName } = options;

  const isNewIcon = !dynamicToolIcon;

  if (!dynamicToolIcon) {
    dynamicToolIcon = document.createElement('div');
    dynamicToolIcon.id = 'dynamic-tool-icon';
    dynamicToolIcon.innerHTML = toolIconSVG;
    dynamicToolIcon.title = 'Viewer Tools (click to toggle, drag to move)';
    dynamicToolIcon.setAttribute('role', 'button');
    dynamicToolIcon.setAttribute('aria-haspopup', 'true');
    dynamicToolIcon.setAttribute('aria-expanded', 'false');
    dynamicToolIcon.style.position = 'fixed';
    dynamicToolIcon.style.left = '16px';
    dynamicToolIcon.style.bottom = '16px';
    makeElementDraggable(dynamicToolIcon, calculateAndPositionMenu);
  }

  if (!dynamicToolMenu) {
    const existingMenu = overlayContainer.querySelector('#dynamic-tool-menu') as HTMLElement | null;
    dynamicToolMenu = existingMenu ?? document.createElement('div');
    dynamicToolMenu.id = 'dynamic-tool-menu';
    dynamicToolMenu.classList.add('hidden');
    dynamicToolMenu.setAttribute('role', 'menu');
    dynamicToolMenu.setAttribute('aria-hidden', 'true');
    if (!dynamicToolMenu.parentElement) {
      overlayContainer.appendChild(dynamicToolMenu);
    }
  } else if (!dynamicToolMenu.parentElement) {
    overlayContainer.appendChild(dynamicToolMenu);
  }

  if (isNewIcon) {
    overlayContainer.appendChild(dynamicToolIcon!);
    dynamicToolIcon!.addEventListener('click', async (event) => {
      event.stopPropagation();
      try {
        await ensureMenuBuilt(viewer, ontologyUI, targetLayerName);
      } catch (error) {
        console.error('[Dynamic Tools] Failed to initialise menu:', error);
        return;
      }
      if (isMenuOpen) {
        hideMenu(true);
      } else {
        showMenu();
      }
      dynamicToolIcon!.setAttribute('aria-expanded', String(isMenuOpen));
    });
  }

  if (!focusToggleListenerAttached) {
    try {
      window.addEventListener('octo:focus-toggle', updateViewerFocusButton as any);
      focusToggleListenerAttached = true;
    } catch (_) {
      /* ignore */
    }
  }

  if (!focusHoverListenerAttached) {
    try {
      window.addEventListener('octo:focus-hover-toggle', updateViewerFocusHoverButton as any);
      focusHoverListenerAttached = true;
    } catch (_) {
      /* ignore */
    }
  }

  window.addEventListener('resize', () => {
    ensureToolIconInViewport();
    calculateAndPositionMenu();
  });
  window.addEventListener('orientationchange', () => {
    ensureToolIconInViewport();
    calculateAndPositionMenu();
  });

  if (!menuBuilt) {
    const prewarm = () => {
      ensureMenuBuilt(viewer, ontologyUI, targetLayerName).catch((error) => {
        console.warn('[Dynamic Tools] Prefetch menu failed:', error);
      });
    };
    if (typeof (window as any).requestIdleCallback === 'function') {
      (window as any).requestIdleCallback(() => prewarm());
    } else {
      window.setTimeout(prewarm, 150);
    }
  }
}
