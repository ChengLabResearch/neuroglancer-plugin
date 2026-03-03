// @ts-nocheck

import { listManagedLayers } from '../Viewer/ng';

export const DEFAULT_HIDDEN_LAYERS = new Set([
  'Ghost octopus 2.8um',
  'Glass octopus 5.6um',
]);

interface MeshControlsOptions {
  viewer: any;
  styleButton: (button: HTMLButtonElement | null) => void;
  defaultHiddenLayers?: Set<string>;
}

interface MeshLayerInfo {
  name: string;
  displayState: any;
}

function createElement(tag: string, className?: string): HTMLElement {
  const el = document.createElement(tag);
  if (className) el.className = className;
  return el;
}

export function createMeshControls(options: MeshControlsOptions) {
  const { viewer, styleButton, defaultHiddenLayers = DEFAULT_HIDDEN_LAYERS } = options;
  const root = createElement('div');
  root.className = 'slider-container';
  root.style.display = 'flex';
  root.style.flexDirection = 'column';
  root.style.gap = '6px';

  const header = createElement('div');
  header.textContent = 'Mesh Controls';
  header.style.fontWeight = 'bold';
  header.style.margin = '0 0 4px';
  root.appendChild(header);

  const checkboxList = createElement('div');
  checkboxList.style.display = 'grid';
  checkboxList.style.gap = '4px';
  checkboxList.style.maxHeight = '220px';
  checkboxList.style.overflowY = 'auto';
  root.appendChild(checkboxList);

  const buttonGroup = createElement('div', 'button-group');
  const allOnButton = document.createElement('button');
  allOnButton.type = 'button';
  allOnButton.textContent = 'All On';
  styleButton(allOnButton);
  const allOffButton = document.createElement('button');
  allOffButton.type = 'button';
  allOffButton.textContent = 'All Off';
  styleButton(allOffButton);
  buttonGroup.appendChild(allOnButton);
  buttonGroup.appendChild(allOffButton);
  root.appendChild(buttonGroup);

  const sliderContainer = createElement('div');
  sliderContainer.style.display = 'flex';
  sliderContainer.style.flexDirection = 'column';
  sliderContainer.style.gap = '6px';
  root.appendChild(sliderContainer);

  const transparencyControl = buildSliderControl('Transparency', '0', '1', '0.01', '1');
  const silhouetteControl = buildSliderControl('Silhouette', '0', '10', '0.1', '0');
  sliderContainer.appendChild(transparencyControl.container);
  sliderContainer.appendChild(silhouetteControl.container);

  let checkboxEntries: Array<{ name: string; checkbox: HTMLInputElement }> = [];
  let initialised = false;

  function collectMeshLayers(): MeshLayerInfo[] {
    const manager = viewer?.layerManager;
    if (!manager) return [];
    const layers: MeshLayerInfo[] = [];
    listManagedLayers(manager).forEach((entry) => {
      const managedLayer = Array.isArray(entry) && entry.length > 1 ? entry[1] : entry;
      const displayState = managedLayer?.displayState || managedLayer?.layer?.displayState;
      const name = managedLayer?.name || managedLayer?.layer?.name;
      if (!name || !displayState) return;
      if (displayState.objectAlpha && displayState.silhouetteRendering) {
        layers.push({ name, displayState });
      }
    });
    return layers;
  }

  function getSelectedNames(): string[] {
    const checked = checkboxEntries.filter(({ checkbox }) => checkbox.checked).map(({ name }) => name);
    if (checked.length) return checked;
    return checkboxEntries.map(({ name }) => name);
  }

  function applyToLayers(callback: (displayState: any) => void): void {
    const targetNames = new Set(getSelectedNames());
    collectMeshLayers()
      .filter(({ name }) => targetNames.has(name))
      .forEach(({ displayState }) => {
        try {
          callback(displayState);
        } catch (error) {
          console.warn('[MeshControls] Failed to apply operation to layer', error);
        }
      });
  }

  function updateLayerVisibilityFromCheckboxes(): void {
    const states = new Map(collectMeshLayers().map((info) => [info.name, info.displayState]));
    checkboxEntries.forEach(({ name, checkbox }) => {
      const displayState = states.get(name);
      if (!displayState) return;
      displayState.visible = checkbox.checked;
    });
  }

  function updateSlidersFromPrimary(): void {
    const layers = collectMeshLayers();
    if (!layers.length) return;
    const selected = getSelectedNames();
    let primary = layers.find(({ name }) => selected.includes(name));
    if (!primary) {
      primary = layers[0];
    }
    const opacity = primary.displayState?.objectAlpha?.value ?? 1;
    const silhouette = primary.displayState?.silhouetteRendering?.value ?? 0;
    transparencyControl.slider.value = String(opacity);
    silhouetteControl.slider.value = String(silhouette);
  }

  function rebuildCheckboxes(): void {
    const layers = collectMeshLayers();
    checkboxList.innerHTML = '';
    checkboxEntries = layers.map(({ name, displayState }) => {
      let checked = displayState?.visible !== false;
      if (!initialised && defaultHiddenLayers.has(name)) {
        checked = false;
      }
      const entry = buildMeshCheckbox(name, checked);
      checkboxList.appendChild(entry.row);
      entry.checkbox.addEventListener('change', () => {
        updateLayerVisibilityFromCheckboxes();
        updateSlidersFromPrimary();
      });
      if (!initialised && !checked && displayState?.visible !== false) {
        displayState.visible = false;
      }
      return { name, checkbox: entry.checkbox };
    });

    if (!initialised) {
      updateLayerVisibilityFromCheckboxes();
      initialised = true;
    }
    updateSlidersFromPrimary();
  }

  function refresh(): void {
    rebuildCheckboxes();
  }

  allOnButton.addEventListener('click', () => {
    checkboxEntries.forEach(({ checkbox }) => {
      checkbox.checked = true;
    });
    updateLayerVisibilityFromCheckboxes();
    updateSlidersFromPrimary();
  });

  allOffButton.addEventListener('click', () => {
    checkboxEntries.forEach(({ checkbox }) => {
      checkbox.checked = false;
    });
    updateLayerVisibilityFromCheckboxes();
    updateSlidersFromPrimary();
  });

  transparencyControl.slider.addEventListener('input', () => {
    const value = parseFloat(transparencyControl.slider.value);
    applyToLayers((displayState) => {
      if (displayState?.objectAlpha) {
        displayState.objectAlpha.value = value;
      }
    });
  });

  silhouetteControl.slider.addEventListener('input', () => {
    const value = parseFloat(silhouetteControl.slider.value);
    applyToLayers((displayState) => {
      if (displayState?.silhouetteRendering) {
        displayState.silhouetteRendering.value = value;
      }
    });
  });

  const manager = viewer?.layerManager;
  if (manager?.layersChanged?.add) {
    manager.layersChanged.add(() => {
      setTimeout(refresh, 250);
    });
  }

  refresh();
  setTimeout(refresh, 800);
  setTimeout(() => {
    if (!checkboxEntries.length) refresh();
  }, 2000);

  return {
    element: root,
    refresh,
  };
}

function buildMeshCheckbox(name: string, checked: boolean): { row: HTMLLabelElement; checkbox: HTMLInputElement } {
  const row = document.createElement('label');
  row.style.display = 'flex';
  row.style.alignItems = 'center';
  row.style.gap = '6px';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = checked;
  checkbox.dataset.layerName = name;

  const span = document.createElement('span');
  span.textContent = name;
  row.appendChild(checkbox);
  row.appendChild(span);

  return { row: row as HTMLLabelElement, checkbox };
}

function buildSliderControl(
  labelText: string,
  min: string,
  max: string,
  step: string,
  initialValue: string
): { container: HTMLElement; slider: HTMLInputElement } {
  const container = document.createElement('div');
  container.className = 'slider-container';
  const label = document.createElement('label');
  label.innerText = `${labelText}:`;
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = min;
  slider.max = max;
  slider.step = step;
  slider.value = initialValue;
  slider.title = labelText;
  container.appendChild(label);
  container.appendChild(slider);
  return { container, slider };
}
