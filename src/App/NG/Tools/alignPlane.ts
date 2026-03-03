// @ts-nocheck

type Vec3 = [number, number, number];
type Quat = [number, number, number, number];

const EPS = 1e-6;
const DEFAULT_LAYER_NAME = 'Alignment Points';

function isVec3(value: any): value is Vec3 {
  return Array.isArray(value)
    && value.length === 3
    && value.every((entry) => Number.isFinite(entry));
}

function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function add(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function sub(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function scale(v: Vec3, s: number): Vec3 {
  return [v[0] * s, v[1] * s, v[2] * s];
}

function dot(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function length(v: Vec3): number {
  return Math.sqrt(dot(v, v));
}

function normalize(v: Vec3): Vec3 {
  const len = length(v);
  if (!Number.isFinite(len) || len < EPS) return [0, 0, 0];
  return scale(v, 1 / len);
}

function quatNormalize(q: Quat): Quat {
  const len = Math.hypot(q[0], q[1], q[2], q[3]);
  if (!Number.isFinite(len) || len < EPS) return [0, 0, 0, 1];
  return [q[0] / len, q[1] / len, q[2] / len, q[3] / len];
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

function quatFromMat3(m: number[][]): Quat {
  const trace = m[0][0] + m[1][1] + m[2][2];
  if (trace > 0) {
    const s = Math.sqrt(trace + 1) * 2;
    return quatNormalize([
      (m[2][1] - m[1][2]) / s,
      (m[0][2] - m[2][0]) / s,
      (m[1][0] - m[0][1]) / s,
      0.25 * s,
    ]);
  }
  if (m[0][0] > m[1][1] && m[0][0] > m[2][2]) {
    const s = Math.sqrt(1 + m[0][0] - m[1][1] - m[2][2]) * 2;
    return quatNormalize([
      0.25 * s,
      (m[0][1] + m[1][0]) / s,
      (m[0][2] + m[2][0]) / s,
      (m[2][1] - m[1][2]) / s,
    ]);
  }
  if (m[1][1] > m[2][2]) {
    const s = Math.sqrt(1 + m[1][1] - m[0][0] - m[2][2]) * 2;
    return quatNormalize([
      (m[0][1] + m[1][0]) / s,
      0.25 * s,
      (m[1][2] + m[2][1]) / s,
      (m[0][2] - m[2][0]) / s,
    ]);
  }
  const s = Math.sqrt(1 + m[2][2] - m[0][0] - m[1][1]) * 2;
  return quatNormalize([
    (m[0][2] + m[2][0]) / s,
    (m[1][2] + m[2][1]) / s,
    0.25 * s,
    (m[1][0] - m[0][1]) / s,
  ]);
}

function clone(value: unknown): any {
  if (!value || typeof value !== 'object') return undefined;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    console.warn('[Plane Align] Failed to clone value:', error);
    return undefined;
  }
}

function collectAnnotationLayers(viewer: any): Array<{ name: string; spec: any }> {
  try {
    const config = viewer?.state?.toJSON?.() || {};
    const layers = Array.isArray(config.layers) ? config.layers : [];
    return layers
      .filter((layer: any) => layer?.type === 'annotation')
      .map((layer: any) => ({ name: layer?.name || '(untitled annotation)', spec: layer }));
  } catch (error) {
    console.warn('[Plane Align] Failed to read annotation layers:', error);
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
    console.warn('[Plane Align] Failed to locate annotation layer:', error);
    return null;
  }
}

function createLocalAnnotationLayer(viewer: any, name = DEFAULT_LAYER_NAME): string | null {
  try {
    const state = viewer?.state?.toJSON?.();
    if (!state || !Array.isArray(state.layers)) return null;

    const existing = state.layers.find((layer: any) => layer?.type === 'annotation' && layer?.name === name);
    if (existing) {
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
    viewer.state.restoreState(state);
    return name;
  } catch (error) {
    console.warn('[Plane Align] Failed to create annotation layer:', error);
    return null;
  }
}

function extractAnnotationPoints(layerSpec: any): Vec3[] {
  const annotations = Array.isArray(layerSpec?.source?.annotations)
    ? layerSpec.source.annotations
    : Array.isArray(layerSpec?.annotations)
      ? layerSpec.annotations
      : [];

  const points: Vec3[] = [];
  const seen = new Set<string>();

  const pushPoint = (value: any) => {
    if (!isVec3(value)) return;
    const key = `${value[0]}|${value[1]}|${value[2]}`;
    if (seen.has(key)) return;
    seen.add(key);
    points.push([value[0], value[1], value[2]]);
  };

  const pushPointsArray = (value: any) => {
    if (!Array.isArray(value)) return;
    value.forEach((entry) => pushPoint(entry));
  };

  annotations.forEach((annotation: any) => {
    if (!annotation || typeof annotation !== 'object') return;
    if (isVec3(annotation.point)) {
      pushPoint(annotation.point);
    }
    if (isVec3(annotation.center)) {
      pushPoint(annotation.center);
    }
    if (isVec3(annotation.centerPoint)) {
      pushPoint(annotation.centerPoint);
    }
    if (isVec3(annotation.centroid)) {
      pushPoint(annotation.centroid);
    }

    if (annotation.type === 'line' || annotation.pointA || annotation.pointB) {
      if (isVec3(annotation.pointA)) pushPoint(annotation.pointA);
      if (isVec3(annotation.pointB)) pushPoint(annotation.pointB);
    }

    if (annotation.type === 'ellipsoid') {
      if (isVec3(annotation.center)) pushPoint(annotation.center);
      if (isVec3(annotation.point)) pushPoint(annotation.point);
    }

    if (annotation.type === 'axis_aligned_bounding_box'
        || annotation.type === 'bounding_box'
        || annotation.type === 'box') {
      if (isVec3(annotation.pointA)) pushPoint(annotation.pointA);
      if (isVec3(annotation.pointB)) pushPoint(annotation.pointB);
      if (isVec3(annotation.min)) pushPoint(annotation.min);
      if (isVec3(annotation.max)) pushPoint(annotation.max);
    }

    if (annotation.vertices) {
      pushPointsArray(annotation.vertices);
    }
    if (annotation.points) {
      pushPointsArray(annotation.points);
    }
  });

  return points;
}

function jacobiEigenDecomposition(input: number[][]): { values: number[]; vectors: number[][] } {
  const a = input.map((row) => row.slice()) as number[][];
  const v = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  const maxIter = 50;

  for (let iter = 0; iter < maxIter; iter += 1) {
    let p = 0;
    let q = 1;
    let max = Math.abs(a[0][1]);
    const a02 = Math.abs(a[0][2]);
    if (a02 > max) {
      max = a02;
      p = 0;
      q = 2;
    }
    const a12 = Math.abs(a[1][2]);
    if (a12 > max) {
      max = a12;
      p = 1;
      q = 2;
    }
    if (max < 1e-10) break;

    const app = a[p][p];
    const aqq = a[q][q];
    const apq = a[p][q];
    const phi = 0.5 * Math.atan2(2 * apq, aqq - app);
    const c = Math.cos(phi);
    const s = Math.sin(phi);

    for (let i = 0; i < 3; i += 1) {
      const aip = a[i][p];
      const aiq = a[i][q];
      a[i][p] = c * aip - s * aiq;
      a[i][q] = s * aip + c * aiq;
    }

    for (let i = 0; i < 3; i += 1) {
      const api = a[p][i];
      const aqi = a[q][i];
      a[p][i] = c * api - s * aqi;
      a[q][i] = s * api + c * aqi;
    }

    for (let i = 0; i < 3; i += 1) {
      const vip = v[i][p];
      const viq = v[i][q];
      v[i][p] = c * vip - s * viq;
      v[i][q] = s * vip + c * viq;
    }
  }

  return {
    values: [a[0][0], a[1][1], a[2][2]],
    vectors: v,
  };
}

function fitPlaneNormal(points: Vec3[], viewForward: Vec3 | null, viewUp: Vec3 | null): { normal: Vec3 | null; reason?: string } {
  if (points.length < 2) {
    return { normal: null, reason: 'Need at least 2 points to define a plane.' };
  }

  if (points.length === 2) {
    const dir = normalize(sub(points[1], points[0]));
    if (length(dir) < EPS) {
      return { normal: null, reason: 'Points are coincident; unable to define plane.' };
    }
    let up = viewUp && length(viewUp) > EPS ? viewUp : [0, 1, 0];
    let normal = normalize(cross(dir, up as Vec3));
    if (length(normal) < EPS) {
      const fallback = Math.abs(dir[2]) < 0.9 ? [0, 0, 1] : [0, 1, 0];
      normal = normalize(cross(dir, fallback as Vec3));
    }
    if (length(normal) < EPS) {
      return { normal: null, reason: 'Line direction is degenerate; unable to define plane.' };
    }
    if (viewForward && length(viewForward) > EPS) {
      if (dot(normal, viewForward) < 0) {
        normal = scale(normal, -1);
      }
    }
    return { normal, reason: 'two-point' };
  }

  const centroid = points.reduce((acc, p) => add(acc, p), [0, 0, 0] as Vec3);
  const invCount = 1 / points.length;
  const c = scale(centroid, invCount);

  const cov = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  points.forEach((p) => {
    const dx = p[0] - c[0];
    const dy = p[1] - c[1];
    const dz = p[2] - c[2];
    cov[0][0] += dx * dx;
    cov[0][1] += dx * dy;
    cov[0][2] += dx * dz;
    cov[1][0] += dy * dx;
    cov[1][1] += dy * dy;
    cov[1][2] += dy * dz;
    cov[2][0] += dz * dx;
    cov[2][1] += dz * dy;
    cov[2][2] += dz * dz;
  });

  const { values, vectors } = jacobiEigenDecomposition(cov);
  const maxValue = Math.max(values[0], values[1], values[2]);
  if (!Number.isFinite(maxValue) || maxValue < EPS) {
    return { normal: null, reason: 'Points are too clustered to fit a plane.' };
  }
  const sorted = [...values].sort((a, b) => a - b);
  const collinearRatio = sorted[1] / sorted[2];
  if (!Number.isFinite(collinearRatio) || collinearRatio < 1e-4) {
    return { normal: null, reason: 'Points are nearly collinear; plane fit is unstable.' };
  }

  let minIndex = 0;
  if (values[1] < values[minIndex]) minIndex = 1;
  if (values[2] < values[minIndex]) minIndex = 2;
  let normal: Vec3 = [vectors[0][minIndex], vectors[1][minIndex], vectors[2][minIndex]];
  normal = normalize(normal);
  if (length(normal) < EPS) {
    return { normal: null, reason: 'Plane normal collapsed; try adjusting points.' };
  }

  if (viewForward && length(viewForward) > EPS) {
    if (dot(normal, viewForward) < 0) {
      normal = scale(normal, -1);
    }
  }

  return { normal, reason: 'pca' };
}

function deriveBasisFromNormal(
  normal: Vec3,
  viewRight: Vec3 | null,
  viewUp: Vec3 | null
): { right: Vec3; up: Vec3; normal: Vec3 } | null {
  let right = viewRight && length(viewRight) > EPS ? viewRight : [1, 0, 0];
  right = sub(right as Vec3, scale(normal, dot(right as Vec3, normal)));
  right = normalize(right);
  if (length(right) < EPS) {
    right = viewUp && length(viewUp) > EPS ? viewUp : [0, 1, 0];
    right = sub(right as Vec3, scale(normal, dot(right as Vec3, normal)));
    right = normalize(right);
  }
  if (length(right) < EPS) {
    const fallback = Math.abs(normal[2]) < 0.9 ? [0, 0, 1] : [0, 1, 0];
    right = normalize(cross(fallback as Vec3, normal));
  }
  if (length(right) < EPS) return null;

  let up = normalize(cross(normal, right));
  right = normalize(cross(up, normal));
  if (length(up) < EPS || length(right) < EPS) return null;
  return { right, up, normal };
}

function getCurrentViewAxes(viewer: any): { right: Vec3; up: Vec3; forward: Vec3 } | null {
  const nav = viewer?.navigationState;
  const quat = nav?.pose?.orientation?.orientation;
  if (!quat || quat.length !== 4) return null;
  const q: Quat = [quat[0], quat[1], quat[2], quat[3]];
  const right = quatRotateVec(q, [1, 0, 0]);
  const up = quatRotateVec(q, [0, 1, 0]);
  const forward = quatRotateVec(q, [0, 0, 1]);
  return { right, up, forward };
}

function applyOrientationTo2D(viewer: any, basis: { right: Vec3; up: Vec3; normal: Vec3 }): boolean {
  const nav = viewer?.navigationState;
  if (!nav?.pose?.orientation?.orientation) return false;

  const matrix = [
    [basis.right[0], basis.up[0], basis.normal[0]],
    [basis.right[1], basis.up[1], basis.normal[1]],
    [basis.right[2], basis.up[2], basis.normal[2]],
  ];
  const quat = quatFromMat3(matrix);

  try {
    if (nav.atomic !== undefined) nav.atomic = true;
    nav.pose.orientation.orientation.set(quat);
    nav.pose.orientation.changed?.dispatch?.();
    return true;
  } catch (error) {
    console.warn('[Plane Align] Failed to apply 2D orientation:', error);
    return false;
  } finally {
    if (nav.atomic !== undefined) nav.atomic = false;
  }
}

export function createPlaneAlignmentControls(options: { viewer: any; styleButton: (button: HTMLButtonElement | null) => void }) {
  const { viewer, styleButton } = options;
  const root = document.createElement('div');
  root.className = 'slider-container align-plane-controls';
  root.style.display = 'flex';
  root.style.flexDirection = 'column';
  root.style.gap = '6px';

  const title = document.createElement('div');
  title.textContent = 'Plane Align';
  title.style.fontWeight = 'bold';
  title.style.margin = '6px 0 2px';
  root.appendChild(title);

  const layerRow = document.createElement('div');
  layerRow.style.display = 'flex';
  layerRow.style.gap = '6px';
  layerRow.style.alignItems = 'center';

  const layerSelect = document.createElement('select');
  layerSelect.style.flex = '1 1 0';
  layerSelect.style.minWidth = '0';
  layerSelect.title = 'Annotation layer to sample points from';

  const useSelectedButton = document.createElement('button');
  useSelectedButton.type = 'button';
  useSelectedButton.textContent = 'Use selected';
  styleButton(useSelectedButton);
  useSelectedButton.style.flex = '0 0 auto';
  useSelectedButton.title = 'Use the currently selected annotation layer';

  layerRow.appendChild(layerSelect);
  layerRow.appendChild(useSelectedButton);
  root.appendChild(layerRow);

  const snapButton = document.createElement('button');
  snapButton.type = 'button';
  snapButton.textContent = 'Snap to plane';
  snapButton.id = 'planeAlignButton';
  snapButton.classList.add('align-plane-button');
  snapButton.title = 'Fit a plane to annotations and align the 2D cross-section to its normal';
  styleButton(snapButton);
  root.appendChild(snapButton);

  const statusLine = document.createElement('div');
  statusLine.className = 'align-plane-status';
  statusLine.textContent = 'Choose an annotation layer with points.';
  root.appendChild(statusLine);

  const setStatus = (message: string, isError = false) => {
    statusLine.textContent = message;
    statusLine.dataset.state = isError ? 'error' : 'ok';
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
      return;
    }

    layers.forEach((layer) => {
      const option = document.createElement('option');
      option.value = layer.name;
      option.textContent = layer.name;
      layerSelect.appendChild(option);
    });

    const selected = preferredName && layers.some((layer) => layer.name === preferredName)
      ? preferredName
      : layers[0].name;
    layerSelect.value = selected;
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
    refreshLayers(selected);
    setStatus(`Using layer "${selected}".`);
  };

  useSelectedButton.addEventListener('click', useSelectedLayer);

  const handleSnap = () => {
    const layers = collectAnnotationLayers(viewer);
    if (!layers.length) {
      const created = createLocalAnnotationLayer(viewer, DEFAULT_LAYER_NAME);
      refreshLayers(created);
      setStatus(
        created
          ? `Created "${DEFAULT_LAYER_NAME}". Add points and try again.`
          : 'No annotation layer found; unable to create one.',
        !created
      );
      return;
    }

    const targetName = layerSelect.value || layers[0].name;
    const layerSpec = findAnnotationLayerByName(viewer, targetName);
    if (!layerSpec) {
      refreshLayers();
      setStatus('Selected layer not found; refresh and try again.', true);
      return;
    }
    if (layerSpec.type !== 'annotation') {
      setStatus(`Layer "${targetName}" is not an annotation layer.`, true);
      return;
    }

    const points = extractAnnotationPoints(layerSpec);
    if (points.length < 2) {
      setStatus('Need at least 2 points/lines/ellipsoids to fit a plane.', true);
      return;
    }

    const axes = getCurrentViewAxes(viewer);
    const viewForward = axes?.forward || null;
    const viewUp = axes?.up || null;

    const fit = fitPlaneNormal(points, viewForward, viewUp);
    if (!fit.normal) {
      setStatus(fit.reason || 'Plane fit failed.', true);
      return;
    }

    const basis = deriveBasisFromNormal(fit.normal, axes?.right || null, axes?.up || null);
    if (!basis) {
      setStatus('Failed to build a stable orientation from the plane normal.', true);
      return;
    }

    const applied = applyOrientationTo2D(viewer, basis);
    if (!applied) {
      setStatus('Failed to apply 2D orientation. Viewer not ready?', true);
      return;
    }

    setStatus(`Aligned 2D slices to plane using ${points.length} points.`);
  };

  snapButton.addEventListener('click', handleSnap);

  refreshLayers(viewer?.selectedLayer?.layer?.name || null);

  return { element: root, refreshLayers };
}
