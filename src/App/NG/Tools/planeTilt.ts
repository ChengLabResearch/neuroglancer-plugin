// @ts-nocheck

import { getStorageItem, setStorageItem } from '../Utils/storage';
import { setHomeView, restoreView } from './home';

type Vec3 = [number, number, number];
type Quat = [number, number, number, number];

const EPS = 1e-6;
const DEFAULT_STEP_DEG = 0.5;
const DEFAULT_ANCHOR_LAYER = 'Plane Tilt Anchor';

const STORAGE_KEYS = {
  step: 'plane_tilt_step_deg',
  invert: 'plane_tilt_invert',
  anchorMode: 'plane_tilt_anchor_mode',
  anchorLayer: 'plane_tilt_anchor_layer',
  snap: 'plane_tilt_snap',
  sync: 'plane_tilt_sync',
};

type AnchorMode = 'center' | 'annotation';

type TiltDirection = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

const DIRECTION_VECTORS: Record<TiltDirection, [number, number]> = {
  N: [0, 1],
  NE: [1, 1],
  E: [1, 0],
  SE: [1, -1],
  S: [0, -1],
  SW: [-1, -1],
  W: [-1, 0],
  NW: [-1, 1],
};

type ViewAxes = {
  right: Vec3;
  up: Vec3;
  normal: Vec3;
};

type ViewSyncController = {
  isEnabled: () => boolean;
  setEnabled: (enabled: boolean, options?: { persist?: boolean }) => void;
};

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function length(v: Vec3): number {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}

function normalize(v: Vec3): Vec3 {
  const len = length(v);
  if (!Number.isFinite(len) || len < EPS) return [0, 0, 0];
  return [v[0] / len, v[1] / len, v[2] / len];
}

function add(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function scale(v: Vec3, s: number): Vec3 {
  return [v[0] * s, v[1] * s, v[2] * s];
}

function quatNormalize(q: Quat): Quat {
  const len = Math.hypot(q[0], q[1], q[2], q[3]);
  if (!Number.isFinite(len) || len < EPS) return [0, 0, 0, 1];
  return [q[0] / len, q[1] / len, q[2] / len, q[3] / len];
}

function quatMultiply(a: Quat, b: Quat): Quat {
  const [ax, ay, az, aw] = a;
  const [bx, by, bz, bw] = b;
  return [
    aw * bx + ax * bw + ay * bz - az * by,
    aw * by - ax * bz + ay * bw + az * bx,
    aw * bz + ax * by - ay * bx + az * bw,
    aw * bw - ax * bx - ay * by - az * bz,
  ];
}

function quatRotateVec(q: Quat, v: Vec3): Vec3 {
  const [qx, qy, qz, qw] = quatNormalize(q);
  const tx = 2 * (qy * v[2] - qz * v[1]);
  const ty = 2 * (qz * v[0] - qx * v[2]);
  const tz = 2 * (qx * v[1] - qy * v[0]);
  return [
    v[0] + qw * tx + (qy * tz - qz * ty),
    v[1] + qw * ty + (qz * tx - qx * tz),
    v[2] + qw * tz + (qx * ty - qy * tx),
  ];
}

function quatFromAxisAngle(axis: Vec3, angleRad: number): Quat {
  const norm = normalize(axis);
  const half = angleRad / 2;
  const sinHalf = Math.sin(half);
  return quatNormalize([norm[0] * sinHalf, norm[1] * sinHalf, norm[2] * sinHalf, Math.cos(half)]);
}

function readQuat(quatLike: any): Quat | null {
  if (!quatLike || quatLike.length !== 4) return null;
  return [quatLike[0], quatLike[1], quatLike[2], quatLike[3]];
}

function quatDiff(a: any, b: any): number {
  if (!a || !b || a.length !== 4 || b.length !== 4) return Infinity;
  let max = 0;
  for (let i = 0; i < 4; i += 1) {
    const diff = Math.abs((a[i] ?? 0) - (b[i] ?? 0));
    if (diff > max) max = diff;
  }
  return max;
}

function getViewAxes(viewer: any): ViewAxes | null {
  const quatLike = viewer?.navigationState?.pose?.orientation?.orientation;
  const quat = readQuat(quatLike);
  if (!quat) return null;
  const right = quatRotateVec(quat, [1, 0, 0]);
  const up = quatRotateVec(quat, [0, 1, 0]);
  const normal = quatRotateVec(quat, [0, 0, 1]);
  return {
    right: normalize(right),
    up: normalize(up),
    normal: normalize(normal),
  };
}

function resolveScreenAxes(viewer: any): { right: Vec3; up: Vec3; normal: Vec3 } | null {
  const axes = getViewAxes(viewer);
  if (!axes) return null;
  // In Neuroglancer 2D cross-section, the axis that behaves like the screen normal
  // aligns with the quaternion "up" axis; the screen-up axis aligns with "normal".
  return {
    right: axes.right,
    up: axes.normal,
    normal: axes.up,
  };
}

function collectAnnotationLayers(viewer: any): Array<{ name: string; spec: any }> {
  try {
    const config = viewer?.state?.toJSON?.() || {};
    const layers = Array.isArray(config.layers) ? config.layers : [];
    return layers
      .filter((layer: any) => layer?.type === 'annotation')
      .map((layer: any) => ({ name: layer?.name || '(untitled annotation)', spec: layer }));
  } catch (error) {
    console.warn('[Plane Tilt] Failed to read annotation layers:', error);
    return [];
  }
}

function findAnnotationLayerByName(viewer: any, name: string | null): any | null {
  if (!viewer || !name) return null;
  try {
    const config = viewer?.state?.toJSON?.() || {};
    const layers = Array.isArray(config.layers) ? config.layers : [];
    return layers.find((layer: any) => layer?.type === 'annotation' && layer?.name === name) || null;
  } catch (error) {
    console.warn('[Plane Tilt] Failed to locate annotation layer:', error);
    return null;
  }
}

function clone(value: unknown): any {
  if (!value || typeof value !== 'object') return undefined;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    console.warn('[Plane Tilt] Failed to clone value:', error);
    return undefined;
  }
}

function ensureAnchorLayer(viewer: any, name = DEFAULT_ANCHOR_LAYER): string | null {
  try {
    const state = viewer?.state?.toJSON?.();
    if (!state || !Array.isArray(state.layers)) return null;

    const existing = state.layers.find((layer: any) => layer?.type === 'annotation' && layer?.name === name);
    if (existing) {
      state.selectedLayer = { layer: name, visible: true };
      viewer.state.restoreState(state);
      return name;
    }

    let referenceTransform: any = null;
    for (const layer of state.layers) {
      if (layer?.source?.transform) {
        referenceTransform = clone(layer.source.transform);
        break;
      }
    }

    const newLayer: any = {
      type: 'annotation',
      name,
      visible: true,
      tab: 'annotations',
      tool: 'annotatePoint',
      annotations: [],
      source: {
        url: 'local://annotations',
      },
    };

    if (referenceTransform) {
      newLayer.source.transform = referenceTransform;
    }

    state.layers.push(newLayer);
    state.selectedLayer = { layer: name, visible: true };
    viewer.state.restoreState(state);
    return name;
  } catch (error) {
    console.warn('[Plane Tilt] Failed to create anchor layer:', error);
    return null;
  }
}

function isVec3(value: any): value is Vec3 {
  return Array.isArray(value) && value.length === 3 && value.every((entry) => Number.isFinite(entry));
}

function extractLastPoint(layerSpec: any): Vec3 | null {
  const annotations = Array.isArray(layerSpec?.source?.annotations)
    ? layerSpec.source.annotations
    : Array.isArray(layerSpec?.annotations)
      ? layerSpec.annotations
      : [];

  for (let i = annotations.length - 1; i >= 0; i -= 1) {
    const annotation = annotations[i];
    if (!annotation || typeof annotation !== 'object') continue;
    if (isVec3(annotation.point)) return [annotation.point[0], annotation.point[1], annotation.point[2]];
    if (isVec3(annotation.center)) return [annotation.center[0], annotation.center[1], annotation.center[2]];
    if (isVec3(annotation.centerPoint)) return [annotation.centerPoint[0], annotation.centerPoint[1], annotation.centerPoint[2]];
    if (isVec3(annotation.centroid)) return [annotation.centroid[0], annotation.centroid[1], annotation.centroid[2]];
    if (annotation.type === 'line' || annotation.pointA || annotation.pointB) {
      if (isVec3(annotation.pointB)) return [annotation.pointB[0], annotation.pointB[1], annotation.pointB[2]];
      if (isVec3(annotation.pointA)) return [annotation.pointA[0], annotation.pointA[1], annotation.pointA[2]];
    }
    if (annotation.type === 'ellipsoid') {
      if (isVec3(annotation.center)) return [annotation.center[0], annotation.center[1], annotation.center[2]];
      if (isVec3(annotation.point)) return [annotation.point[0], annotation.point[1], annotation.point[2]];
    }
    if (annotation.type === 'axis_aligned_bounding_box'
        || annotation.type === 'bounding_box'
        || annotation.type === 'box') {
      if (isVec3(annotation.pointB)) return [annotation.pointB[0], annotation.pointB[1], annotation.pointB[2]];
      if (isVec3(annotation.pointA)) return [annotation.pointA[0], annotation.pointA[1], annotation.pointA[2]];
      if (isVec3(annotation.max)) return [annotation.max[0], annotation.max[1], annotation.max[2]];
      if (isVec3(annotation.min)) return [annotation.min[0], annotation.min[1], annotation.min[2]];
    }
    if (Array.isArray(annotation.points)) {
      for (let j = annotation.points.length - 1; j >= 0; j -= 1) {
        if (isVec3(annotation.points[j])) {
          const p = annotation.points[j];
          return [p[0], p[1], p[2]];
        }
      }
    }
    if (Array.isArray(annotation.vertices)) {
      for (let j = annotation.vertices.length - 1; j >= 0; j -= 1) {
        if (isVec3(annotation.vertices[j])) {
          const p = annotation.vertices[j];
          return [p[0], p[1], p[2]];
        }
      }
    }
  }

  return null;
}

function resolveAnchor(viewer: any, mode: AnchorMode, layerName: string | null) {
  if (mode !== 'annotation') {
    return { point: null, source: 'center' };
  }
  const layerSpec = findAnnotationLayerByName(viewer, layerName);
  if (!layerSpec) {
    return { point: null, source: 'missing-layer' };
  }
  const point = extractLastPoint(layerSpec);
  if (!point) {
    return { point: null, source: 'missing-point' };
  }
  return { point, source: 'annotation' };
}

function applyTilt(
  viewer: any,
  direction: TiltDirection,
  options: {
    stepDeg: number;
    invert: boolean;
    anchorMode: AnchorMode;
    anchorLayer: string | null;
    snapToAnchor: boolean;
    sync3D: boolean;
  }
): { ok: boolean; message: string } {
  if (!viewer?.navigationState?.pose?.orientation?.orientation) {
    return { ok: false, message: 'Viewer not ready for 2D tilt yet.' };
  }

  const axes = resolveScreenAxes(viewer);
  if (!axes) {
    return { ok: false, message: 'Unable to read view orientation.' };
  }

  const { point, source } = resolveAnchor(viewer, options.anchorMode, options.anchorLayer);
  if (options.anchorMode === 'annotation' && !point) {
    if (source === 'missing-layer') {
      return { ok: false, message: 'Select an annotation layer with a point anchor.' };
    }
    return { ok: false, message: 'Add a point to the anchor layer before tilting.' };
  }

  const dir = DIRECTION_VECTORS[direction];
  const mag = Math.hypot(dir[0], dir[1]) || 1;
  let dx = dir[0] / mag;
  let dy = dir[1] / mag;
  if (options.invert) {
    dx *= -1;
    dy *= -1;
  }

  const axis = normalize(add(scale(axes.right, dy), scale(axes.up, dx)));
  if (length(axis) < EPS) {
    return { ok: false, message: 'Tilt axis collapsed; try another orientation.' };
  }

  const stepDeg = clamp(options.stepDeg, 0.01, 15);
  const angleRad = (stepDeg * Math.PI) / 180;

  const currentQuat = readQuat(viewer.navigationState.pose.orientation.orientation);
  if (!currentQuat) {
    return { ok: false, message: 'Unable to read current orientation.' };
  }

  const rotation = quatFromAxisAngle(axis, angleRad);
  const nextQuat = quatNormalize(quatMultiply(rotation, currentQuat));

  const nav = viewer.navigationState;
  const perspective = viewer.perspectiveNavigationState;
  if (nav.atomic !== undefined) nav.atomic = true;
  if (perspective?.atomic !== undefined) perspective.atomic = true;
  try {
    if (options.snapToAnchor && point && nav?.position?.value) {
      nav.position.value[0] = point[0];
      nav.position.value[1] = point[1];
      nav.position.value[2] = point[2];
      nav.position.changed?.dispatch?.();
    }

    nav.pose.orientation.orientation.set(nextQuat);
    nav.pose.orientation.changed?.dispatch?.();

    if (options.sync3D && perspective?.pose?.orientation?.orientation) {
      perspective.pose.orientation.orientation.set(nextQuat);
      perspective.pose.orientation.changed?.dispatch?.();
    }
  } catch (error) {
    console.warn('[Plane Tilt] Failed to apply tilt:', error);
    return { ok: false, message: 'Tilt failed; try again.' };
  } finally {
    if (nav.atomic !== undefined) nav.atomic = false;
    if (perspective?.atomic !== undefined) perspective.atomic = false;
  }

  return { ok: true, message: `Tilted ${stepDeg.toFixed(2)}° ${direction}.` };
}

function applyRoll(
  viewer: any,
  direction: 'cw' | 'ccw',
  options: {
    stepDeg: number;
    anchorMode: AnchorMode;
    anchorLayer: string | null;
    snapToAnchor: boolean;
    sync3D: boolean;
  }
): { ok: boolean; message: string } {
  if (!viewer?.navigationState?.pose?.orientation?.orientation) {
    return { ok: false, message: 'Viewer not ready for 2D rotation yet.' };
  }

  const axes = resolveScreenAxes(viewer);
  if (!axes) {
    return { ok: false, message: 'Unable to read view orientation.' };
  }

  const { point, source } = resolveAnchor(viewer, options.anchorMode, options.anchorLayer);
  if (options.anchorMode === 'annotation' && !point) {
    if (source === 'missing-layer') {
      return { ok: false, message: 'Select an annotation layer with a point anchor.' };
    }
    return { ok: false, message: 'Add a point to the anchor layer before rotating.' };
  }

  const stepDeg = clamp(options.stepDeg, 0.01, 15);
  const angleRad = (stepDeg * Math.PI) / 180;
  const sign = direction === 'cw' ? -1 : 1;

  const currentQuat = readQuat(viewer.navigationState.pose.orientation.orientation);
  if (!currentQuat) {
    return { ok: false, message: 'Unable to read current orientation.' };
  }

  const rotation = quatFromAxisAngle(axes.normal, angleRad * sign);
  const nextQuat = quatNormalize(quatMultiply(rotation, currentQuat));

  const nav = viewer.navigationState;
  const perspective = viewer.perspectiveNavigationState;
  if (nav.atomic !== undefined) nav.atomic = true;
  if (perspective?.atomic !== undefined) perspective.atomic = true;
  try {
    if (options.snapToAnchor && point && nav?.position?.value) {
      nav.position.value[0] = point[0];
      nav.position.value[1] = point[1];
      nav.position.value[2] = point[2];
      nav.position.changed?.dispatch?.();
    }

    nav.pose.orientation.orientation.set(nextQuat);
    nav.pose.orientation.changed?.dispatch?.();

    if (options.sync3D && perspective?.pose?.orientation?.orientation) {
      perspective.pose.orientation.orientation.set(nextQuat);
      perspective.pose.orientation.changed?.dispatch?.();
    }
  } catch (error) {
    console.warn('[Plane Tilt] Failed to apply roll:', error);
    return { ok: false, message: 'Rotation failed; try again.' };
  } finally {
    if (nav.atomic !== undefined) nav.atomic = false;
    if (perspective?.atomic !== undefined) perspective.atomic = false;
  }

  return { ok: true, message: `Rotated ${stepDeg.toFixed(2)}° ${direction === 'cw' ? '↻' : '↺'}.` };
}

function createViewSyncController(viewer: any): ViewSyncController {
  let enabled = getStorageItem(STORAGE_KEYS.sync) === '1';
  let attached = false;
  let syncing = false;

  const attach = () => {
    if (attached) return;
    const navPose = viewer?.navigationState?.pose?.orientation;
    const perspPose = viewer?.perspectiveNavigationState?.pose?.orientation;
    if (!navPose?.changed?.add || !perspPose?.changed?.add) {
      setTimeout(attach, 400);
      return;
    }

    const syncFrom2D = () => {
      if (!enabled || syncing) return;
      const source = viewer?.navigationState?.pose?.orientation?.orientation;
      const target = viewer?.perspectiveNavigationState?.pose?.orientation?.orientation;
      if (!source || !target) return;
      if (quatDiff(source, target) < 1e-6) return;
      syncing = true;
      try {
        target.set(source);
        viewer?.perspectiveNavigationState?.pose?.orientation?.changed?.dispatch?.();
      } catch (_) {
        /* ignore */
      } finally {
        syncing = false;
      }
    };

    const syncFrom3D = () => {
      if (!enabled || syncing) return;
      const source = viewer?.perspectiveNavigationState?.pose?.orientation?.orientation;
      const target = viewer?.navigationState?.pose?.orientation?.orientation;
      if (!source || !target) return;
      if (quatDiff(source, target) < 1e-6) return;
      syncing = true;
      try {
        target.set(source);
        viewer?.navigationState?.pose?.orientation?.changed?.dispatch?.();
      } catch (_) {
        /* ignore */
      } finally {
        syncing = false;
      }
    };

    navPose.changed.add(syncFrom2D);
    perspPose.changed.add(syncFrom3D);
    attached = true;
  };

  attach();

  return {
    isEnabled: () => enabled,
    setEnabled: (next, { persist = true } = {}) => {
      enabled = !!next;
      if (persist) {
        setStorageItem(STORAGE_KEYS.sync, enabled ? '1' : '0');
      }
    },
  };
}

function readStoredNumber(key: string, fallback: number): number {
  const raw = getStorageItem(key);
  const parsed = raw !== null ? Number.parseFloat(raw) : NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readStoredBool(key: string, fallback: boolean): boolean {
  const raw = getStorageItem(key);
  if (raw === null) return fallback;
  return raw === '1' || raw === 'true';
}

export function createPlaneTiltControls(options: { viewer: any; styleButton: (button: HTMLButtonElement | null) => void }) {
  const { viewer, styleButton } = options;

  const root = document.createElement('div');
  root.className = 'slider-container plane-tilt-controls';
  root.style.display = 'flex';
  root.style.flexDirection = 'column';
  root.style.gap = '8px';

  const title = document.createElement('div');
  title.textContent = 'Plane Nudge';
  title.style.fontWeight = 'bold';
  title.style.margin = '6px 0 2px';
  root.appendChild(title);

  const anchorRow = document.createElement('div');
  anchorRow.style.display = 'flex';
  anchorRow.style.flexDirection = 'column';
  anchorRow.style.gap = '6px';

  const anchorLabel = document.createElement('label');
  anchorLabel.textContent = 'Anchor';
  anchorRow.appendChild(anchorLabel);

  const anchorModeSelect = document.createElement('select');
  anchorModeSelect.innerHTML = `
    <option value="center">View center</option>
    <option value="annotation">Annotation point (last)</option>
  `;

  const storedMode = getStorageItem(STORAGE_KEYS.anchorMode);
  const anchorMode = storedMode === 'annotation' ? 'annotation' : 'center';
  anchorModeSelect.value = anchorMode;
  anchorRow.appendChild(anchorModeSelect);

  const layerRow = document.createElement('div');
  layerRow.className = 'plane-tilt-layer-row';
  layerRow.style.display = 'flex';
  layerRow.style.gap = '6px';
  layerRow.style.alignItems = 'center';

  const layerSelect = document.createElement('select');
  layerSelect.style.flex = '1 1 0';
  layerSelect.style.minWidth = '0';

  const useSelectedButton = document.createElement('button');
  useSelectedButton.type = 'button';
  useSelectedButton.textContent = 'Use selected';
  styleButton(useSelectedButton);

  const createLayerButton = document.createElement('button');
  createLayerButton.type = 'button';
  createLayerButton.textContent = 'New anchor';
  styleButton(createLayerButton);

  layerRow.appendChild(layerSelect);
  layerRow.appendChild(useSelectedButton);
  layerRow.appendChild(createLayerButton);
  anchorRow.appendChild(layerRow);
  root.appendChild(anchorRow);

  const snapLabel = document.createElement('label');
  snapLabel.className = 'plane-tilt-checkbox';
  const snapCheckbox = document.createElement('input');
  snapCheckbox.type = 'checkbox';
  snapCheckbox.checked = readStoredBool(STORAGE_KEYS.snap, true);
  snapLabel.appendChild(snapCheckbox);
  snapLabel.appendChild(document.createTextNode('Snap crosshair to anchor before tilt'));
  root.appendChild(snapLabel);

  const stepRow = document.createElement('div');
  stepRow.className = 'plane-tilt-step-row';
  stepRow.style.display = 'grid';
  stepRow.style.gridTemplateColumns = '1fr auto';
  stepRow.style.gap = '6px';
  stepRow.style.alignItems = 'center';

  const stepLabel = document.createElement('label');
  stepLabel.textContent = 'Step (degrees)';
  stepRow.appendChild(stepLabel);

  const stepInput = document.createElement('input');
  stepInput.type = 'number';
  stepInput.min = '0.01';
  stepInput.max = '15';
  stepInput.step = '0.05';
  const storedStep = readStoredNumber(STORAGE_KEYS.step, DEFAULT_STEP_DEG);
  stepInput.value = String(clamp(storedStep, 0.01, 15));
  stepRow.appendChild(stepInput);
  root.appendChild(stepRow);

  const stepSlider = document.createElement('input');
  stepSlider.type = 'range';
  stepSlider.min = '0.05';
  stepSlider.max = '5';
  stepSlider.step = '0.05';
  stepSlider.value = stepInput.value;
  root.appendChild(stepSlider);

  const stepButtons = document.createElement('div');
  stepButtons.className = 'button-group plane-tilt-step-buttons';
  const quickSteps = [0.1, 0.25, 0.5, 1];
  quickSteps.forEach((value) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = `${value}°`;
    styleButton(button);
    button.addEventListener('click', () => {
      stepInput.value = String(value);
      stepSlider.value = String(value);
      setStorageItem(STORAGE_KEYS.step, String(value));
    });
    stepButtons.appendChild(button);
  });
  root.appendChild(stepButtons);

  const invertLabel = document.createElement('label');
  invertLabel.className = 'plane-tilt-checkbox';
  const invertCheckbox = document.createElement('input');
  invertCheckbox.type = 'checkbox';
  invertCheckbox.checked = readStoredBool(STORAGE_KEYS.invert, false);
  invertLabel.appendChild(invertCheckbox);
  invertLabel.appendChild(document.createTextNode('Invert tilt directions'));
  root.appendChild(invertLabel);

  const syncController = createViewSyncController(viewer);
  const syncLabel = document.createElement('label');
  syncLabel.className = 'plane-tilt-checkbox';
  const syncCheckbox = document.createElement('input');
  syncCheckbox.type = 'checkbox';
  syncCheckbox.checked = syncController.isEnabled();
  syncLabel.appendChild(syncCheckbox);
  syncLabel.appendChild(document.createTextNode('Link 2D & 3D orientations'));
  root.appendChild(syncLabel);

  const dial = document.createElement('div');
  dial.className = 'plane-tilt-dial';

  const centerNode = document.createElement('div');
  centerNode.className = 'plane-tilt-center';
  centerNode.title = 'Anchor indicator';
  centerNode.textContent = '•';

  const dialSlots: Array<TiltDirection | 'CENTER'> = [
    'NW', 'N', 'NE',
    'W', 'CENTER', 'E',
    'SW', 'S', 'SE',
  ];

  dialSlots.forEach((slot) => {
    if (slot === 'CENTER') {
      dial.appendChild(centerNode);
      return;
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'plane-tilt-button';
    button.dataset.dir = slot;
    const symbol = {
      N: '↑',
      NE: '↗',
      E: '→',
      SE: '↘',
      S: '↓',
      SW: '↙',
      W: '←',
      NW: '↖',
    }[slot];
    button.textContent = symbol;
    button.setAttribute('aria-label', `Tilt ${slot}`);
    dial.appendChild(button);
  });

  root.appendChild(dial);

  const rollRow = document.createElement('div');
  rollRow.className = 'button-group plane-tilt-roll-buttons';
  const rotateLeftButton = document.createElement('button');
  rotateLeftButton.type = 'button';
  rotateLeftButton.textContent = 'Rotate ↺';
  styleButton(rotateLeftButton);
  const rotateRightButton = document.createElement('button');
  rotateRightButton.type = 'button';
  rotateRightButton.textContent = 'Rotate ↻';
  styleButton(rotateRightButton);
  rollRow.appendChild(rotateLeftButton);
  rollRow.appendChild(rotateRightButton);
  root.appendChild(rollRow);

  const viewRow = document.createElement('div');
  viewRow.className = 'button-group plane-tilt-view-buttons';
  const saveViewButton = document.createElement('button');
  saveViewButton.type = 'button';
  saveViewButton.textContent = 'Save View';
  styleButton(saveViewButton);
  const restoreViewButton = document.createElement('button');
  restoreViewButton.type = 'button';
  restoreViewButton.textContent = 'Restore View';
  styleButton(restoreViewButton);
  viewRow.appendChild(saveViewButton);
  viewRow.appendChild(restoreViewButton);
  root.appendChild(viewRow);

  const statusLine = document.createElement('div');
  statusLine.className = 'plane-tilt-status';
  statusLine.textContent = 'Pick a direction to tilt the 2D slice plane.';
  root.appendChild(statusLine);

  const setStatus = (message: string, isError = false) => {
    statusLine.textContent = message;
    statusLine.dataset.state = isError ? 'error' : 'ok';
  };

  const updateCenterTitle = () => {
    const mode = anchorModeSelect.value as AnchorMode;
    if (mode === 'annotation') {
      const name = layerSelect.value || DEFAULT_ANCHOR_LAYER;
      centerNode.title = `Anchor: ${name} (last point)`;
    } else {
      centerNode.title = 'Anchor: view center';
    }
  };

  const refreshLayers = (preferredName?: string | null) => {
    const layers = collectAnnotationLayers(viewer);
    layerSelect.innerHTML = '';
    if (!layers.length) {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'No annotation layers';
      option.disabled = true;
      option.selected = true;
      layerSelect.appendChild(option);
      updateCenterTitle();
      return;
    }

    layers.forEach((layer) => {
      const option = document.createElement('option');
      option.value = layer.name;
      option.textContent = layer.name;
      layerSelect.appendChild(option);
    });

    const target = preferredName && layers.some((layer) => layer.name === preferredName)
      ? preferredName
      : layers[0].name;
    layerSelect.value = target;
    setStorageItem(STORAGE_KEYS.anchorLayer, target);
    updateCenterTitle();
  };

  const toggleLayerRowVisibility = () => {
    const isAnnotation = anchorModeSelect.value === 'annotation';
    layerRow.style.display = isAnnotation ? 'flex' : 'none';
    if (isAnnotation) {
      refreshLayers(layerSelect.value || null);
    }
    setStorageItem(STORAGE_KEYS.anchorMode, anchorModeSelect.value);
    updateCenterTitle();
  };

  const useSelectedLayer = () => {
    const selected = viewer?.selectedLayer?.layer?.name;
    if (!selected) {
      setStatus('Select an annotation layer in the layer tabs first.', true);
      return;
    }
    const spec = findAnnotationLayerByName(viewer, selected);
    if (!spec) {
      setStatus(`"${selected}" is not an annotation layer.`, true);
      return;
    }
    anchorModeSelect.value = 'annotation';
    refreshLayers(selected);
    toggleLayerRowVisibility();
    setStatus(`Using "${selected}" as the anchor layer.`);
  };

  const createAnchorLayer = () => {
    const created = ensureAnchorLayer(viewer, DEFAULT_ANCHOR_LAYER);
    anchorModeSelect.value = 'annotation';
    if (created) {
      refreshLayers(created);
      toggleLayerRowVisibility();
      setStatus(`Created "${created}". Place a point and tilt.`);
    } else {
      setStatus('Unable to create anchor layer.', true);
    }
  };

  useSelectedButton.addEventListener('click', useSelectedLayer);
  createLayerButton.addEventListener('click', createAnchorLayer);
  layerSelect.addEventListener('change', () => {
    setStorageItem(STORAGE_KEYS.anchorLayer, layerSelect.value);
    updateCenterTitle();
  });

  anchorModeSelect.addEventListener('change', toggleLayerRowVisibility);

  stepInput.addEventListener('change', () => {
    const value = clamp(Number.parseFloat(stepInput.value), 0.01, 15);
    stepInput.value = value.toFixed(2).replace(/\.00$/, '');
    stepSlider.value = String(clamp(value, 0.05, 5));
    setStorageItem(STORAGE_KEYS.step, String(value));
  });

  stepSlider.addEventListener('input', () => {
    const value = clamp(Number.parseFloat(stepSlider.value), 0.05, 5);
    stepInput.value = value.toFixed(2).replace(/\.00$/, '');
    setStorageItem(STORAGE_KEYS.step, String(value));
  });

  invertCheckbox.addEventListener('change', () => {
    setStorageItem(STORAGE_KEYS.invert, invertCheckbox.checked ? '1' : '0');
  });

  snapCheckbox.addEventListener('change', () => {
    setStorageItem(STORAGE_KEYS.snap, snapCheckbox.checked ? '1' : '0');
  });

  syncCheckbox.addEventListener('change', () => {
    syncController.setEnabled(syncCheckbox.checked);
    setStatus(syncCheckbox.checked ? '2D/3D sync enabled.' : '2D/3D sync disabled.');
  });

  saveViewButton.addEventListener('click', () => {
    setHomeView();
    setStatus('Saved current view.');
  });

  restoreViewButton.addEventListener('click', () => {
    restoreView();
    setStatus('Restored saved view.');
  });

  const applyTiltFromButton = (direction: TiltDirection) => {
    const stepDeg = Number.parseFloat(stepInput.value) || DEFAULT_STEP_DEG;
    const baseOptions = {
      stepDeg,
      invert: invertCheckbox.checked,
      anchorMode: anchorModeSelect.value as AnchorMode,
      anchorLayer: layerSelect.value || null,
      snapToAnchor: snapCheckbox.checked,
      sync3D: syncController.isEnabled(),
    };

    const run = (dir: TiltDirection) => applyTilt(viewer, dir, baseOptions);

    const isDiagonal = direction.length === 2;
    if (!isDiagonal) {
      const result = run(direction);
      setStatus(result.message, !result.ok);
      return;
    }

    const vertical = direction.includes('N') ? 'N' : 'S';
    const horizontal = direction.includes('E') ? 'E' : 'W';
    const first = run(vertical as TiltDirection);
    if (!first.ok) {
      setStatus(first.message, true);
      return;
    }
    const second = run(horizontal as TiltDirection);
    const message = second.ok
      ? `Tilted ${vertical} + ${horizontal} (${stepDeg.toFixed(2)}° each).`
      : second.message;
    setStatus(message, !second.ok);
  };

  const applyRollFromButton = (direction: 'cw' | 'ccw') => {
    const stepDeg = Number.parseFloat(stepInput.value) || DEFAULT_STEP_DEG;
    const result = applyRoll(viewer, direction, {
      stepDeg,
      anchorMode: anchorModeSelect.value as AnchorMode,
      anchorLayer: layerSelect.value || null,
      snapToAnchor: snapCheckbox.checked,
      sync3D: syncController.isEnabled(),
    });
    setStatus(result.message, !result.ok);
  };

  const attachHoldAction = (button: HTMLButtonElement, action: () => void) => {
    let repeatTimeout: number | null = null;
    let repeatInterval: number | null = null;

    const stop = () => {
      if (repeatTimeout) {
        window.clearTimeout(repeatTimeout);
        repeatTimeout = null;
      }
      if (repeatInterval) {
        window.clearInterval(repeatInterval);
        repeatInterval = null;
      }
    };

    const start = (event: Event) => {
      event.preventDefault();
      action();
      repeatTimeout = window.setTimeout(() => {
        repeatInterval = window.setInterval(() => action(), 120);
      }, 240);
    };

    button.addEventListener('mousedown', start);
    button.addEventListener('touchstart', start, { passive: false });
    button.addEventListener('mouseup', stop);
    button.addEventListener('mouseleave', stop);
    button.addEventListener('touchend', stop);
    window.addEventListener('mouseup', stop);
  };

  dial.querySelectorAll<HTMLButtonElement>('button.plane-tilt-button').forEach((button) => {
    const dir = button.dataset.dir as TiltDirection;
    if (!dir) return;
    attachHoldAction(button, () => applyTiltFromButton(dir));
  });

  attachHoldAction(rotateLeftButton, () => applyRollFromButton('ccw'));
  attachHoldAction(rotateRightButton, () => applyRollFromButton('cw'));

  const storedLayer = getStorageItem(STORAGE_KEYS.anchorLayer);
  refreshLayers(storedLayer);
  toggleLayerRowVisibility();
  updateCenterTitle();

  return { element: root, refreshLayers };
}
