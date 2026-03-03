// @ts-nocheck

type Vec3 = [number, number, number];
type Quat = [number, number, number, number];

type Frame = { n: Vec3; b: Vec3; t: Vec3 };

type RideCache = {
  s: number[];
  pos: Vec3[];
  frames: Frame[];
  total: number;
};

const EPS = 1e-6;
const DEFAULT_SPEED = 80; // voxels/sec
const MAX_SAMPLES = 2000;

function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpVec(a: Vec3, b: Vec3, t: number): Vec3 {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function subVec(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function addVec(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function scaleVec(v: Vec3, s: number): Vec3 {
  return [v[0] * s, v[1] * s, v[2] * s];
}

function dot(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

function length(v: Vec3): number {
  return Math.sqrt(dot(v, v));
}

function normalize(v: Vec3): Vec3 {
  const len = length(v);
  if (!Number.isFinite(len) || len < EPS) return [0, 0, 0];
  return scaleVec(v, 1 / len);
}

function rotateAroundAxis(v: Vec3, axis: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const term1 = scaleVec(v, cos);
  const term2 = scaleVec(cross(axis, v), sin);
  const term3 = scaleVec(axis, dot(axis, v) * (1 - cos));
  return addVec(addVec(term1, term2), term3);
}

function quatNormalize(q: Quat): Quat {
  const len = Math.hypot(q[0], q[1], q[2], q[3]);
  if (!Number.isFinite(len) || len < EPS) return [0, 0, 0, 1];
  return [q[0] / len, q[1] / len, q[2] / len, q[3] / len];
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

function quatSlerp(a: Quat, b: Quat, t: number): Quat {
  const aNorm = quatNormalize(a);
  let bNorm = quatNormalize(b);
  let cosTheta = aNorm[0] * bNorm[0] + aNorm[1] * bNorm[1] + aNorm[2] * bNorm[2] + aNorm[3] * bNorm[3];
  if (cosTheta < 0) {
    bNorm = [-bNorm[0], -bNorm[1], -bNorm[2], -bNorm[3]];
    cosTheta = -cosTheta;
  }
  if (cosTheta > 0.9995) {
    return quatNormalize([
      lerp(aNorm[0], bNorm[0], t),
      lerp(aNorm[1], bNorm[1], t),
      lerp(aNorm[2], bNorm[2], t),
      lerp(aNorm[3], bNorm[3], t),
    ]);
  }
  const angle = Math.acos(clamp(cosTheta, -1, 1));
  const sinTotal = Math.sin(angle);
  const ratioA = Math.sin((1 - t) * angle) / sinTotal;
  const ratioB = Math.sin(t * angle) / sinTotal;
  return [
    aNorm[0] * ratioA + bNorm[0] * ratioB,
    aNorm[1] * ratioA + bNorm[1] * ratioB,
    aNorm[2] * ratioA + bNorm[2] * ratioB,
    aNorm[3] * ratioA + bNorm[3] * ratioB,
  ];
}

function distance(a: Vec3, b: Vec3): number {
  return length(subVec(a, b));
}

function chooseInitialNormal(tangent: Vec3): Vec3 {
  const axis = Math.abs(tangent[2]) > 0.9 ? [0, 1, 0] as Vec3 : [-tangent[1], tangent[0], 0] as Vec3;
  const n = normalize(axis);
  if (length(n) < EPS) return [0, 1, 0];
  return n;
}

function frameToQuat(frame: Frame, reverse: boolean, flip: boolean): Quat {
  const n = frame.n;
  const b = reverse ? [-frame.b[0], -frame.b[1], -frame.b[2]] as Vec3 : frame.b;
  const t = reverse ? [-frame.t[0], -frame.t[1], -frame.t[2]] as Vec3 : frame.t;

  const matrix = !flip
    ? [
        [n[0], b[0], t[0]],
        [n[1], b[1], t[1]],
        [n[2], b[2], t[2]],
      ]
    : [
        [n[0], n[1], n[2]],
        [b[0], b[1], b[2]],
        [t[0], t[1], t[2]],
      ];

  return quatFromMat3(matrix);
}

function catmullRomPoint(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number): Vec3 {
  // centripetal Catmull-Rom using chord lengths
  const alpha = 0.5;
  const d01 = Math.pow(distance(p0, p1), alpha);
  const d12 = Math.pow(distance(p1, p2), alpha);
  const d23 = Math.pow(distance(p2, p3), alpha);

  const t0 = 0;
  const t1 = t0 + (d01 || 1);
  const t2 = t1 + (d12 || 1);
  const t3 = t2 + (d23 || 1);

  const tv = lerp(t1, t2, t);

  const A1 = lerpVec(p0, p1, (tv - t0) / (t1 - t0));
  const A2 = lerpVec(p1, p2, (tv - t1) / (t2 - t1));
  const A3 = lerpVec(p2, p3, (tv - t2) / (t3 - t2));

  const B1 = lerpVec(A1, A2, (tv - t0) / (t2 - t0));
  const B2 = lerpVec(A2, A3, (tv - t1) / (t3 - t1));

  return lerpVec(B1, B2, (tv - t1) / (t2 - t1));
}

function evalCatmullRom(points: Vec3[], t: number): Vec3 {
  if (!points.length) return [0, 0, 0];
  if (points.length === 1) return points[0];
  const clampedT = clamp(t, 0, 1);
  const segmentCount = points.length - 1;
  const scaled = clampedT * segmentCount;
  const seg = Math.min(Math.floor(scaled), segmentCount - 1);
  const localT = scaled - seg;

  const p0 = points[Math.max(seg - 1, 0)];
  const p1 = points[seg];
  const p2 = points[Math.min(seg + 1, points.length - 1)];
  const p3 = points[Math.min(seg + 2, points.length - 1)];

  return catmullRomPoint(p0, p1, p2, p3, localT);
}

function evalCatmullRomDerivative(points: Vec3[], t: number): Vec3 {
  const delta = 1e-3;
  const t0 = clamp(t - delta, 0, 1);
  const t1 = clamp(t + delta, 0, 1);
  const p0 = evalCatmullRom(points, t0);
  const p1 = evalCatmullRom(points, t1);
  const scale = 1 / Math.max(EPS, t1 - t0);
  return scaleVec(subVec(p1, p0), scale);
}

function sortPointsByProximity(points: Vec3[]): Vec3[] {
  if (points.length < 2) return points;
  const remaining = [...points];
  const sorted: Vec3[] = [];

  let current = remaining.shift()!;
  sorted.push(current);

  while (remaining.length) {
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < remaining.length; i += 1) {
      const dist = distance(current, remaining[i]);
      if (dist < nearestDistance) {
        nearestDistance = dist;
        nearestIndex = i;
      }
    }

    current = remaining.splice(nearestIndex, 1)[0];
    sorted.push(current);
  }

  return sorted;
}

function estimateCurvature(points: Vec3[]): number {
  if (points.length < 3) return 0;
  let total = 0;
  for (let i = 1; i < points.length - 1; i += 1) {
    const a = normalize(subVec(points[i], points[i - 1]));
    const b = normalize(subVec(points[i + 1], points[i]));
    const d = clamp(dot(a, b), -1, 1);
    total += Math.acos(d);
  }
  return total;
}

function computeSampleCount(points: Vec3[], adaptive: boolean, curvatureRatio: number): number {
  const polyLength = points.reduce((sum, point, idx) => {
    if (idx === 0) return 0;
    return sum + distance(point, points[idx - 1]);
  }, 0);
  const base = Math.max(80, Math.min(1200, Math.round(polyLength * 2)));
  const curvature = adaptive ? estimateCurvature(points) : 0;
  const curvatureBoost = adaptive ? Math.round(curvature * (20 + curvatureRatio * 30)) : 0;
  return Math.max(64, Math.min(MAX_SAMPLES, base + curvatureBoost));
}

function buildRideCache(points: Vec3[], options: { lookAhead: number; adaptive: boolean; curvatureRatio: number }): RideCache | null {
  if (points.length < 2) return null;
  const sampleCount = computeSampleCount(points, options.adaptive, options.curvatureRatio);
  const pos: Vec3[] = [];
  const s: number[] = [];
  const tangents: Vec3[] = [];
  const params: number[] = [];

  for (let i = 0; i < sampleCount; i += 1) {
    const t = i / (sampleCount - 1);
    params.push(t);
    const p = evalCatmullRom(points, t);
    pos.push(p);
    s.push(0);
  }

  for (let i = 1; i < pos.length; i += 1) {
    s[i] = s[i - 1] + distance(pos[i], pos[i - 1]);
  }

  const total = s[s.length - 1] || 0;
  if (!Number.isFinite(total) || total < EPS) return null;

  const lookAhead = Math.max(0, Math.floor(options.lookAhead));
  for (let i = 0; i < pos.length; i += 1) {
    let tangent: Vec3 | null = null;
    if (lookAhead > 0) {
      const j = Math.min(pos.length - 1, i + lookAhead);
      tangent = subVec(pos[j], pos[i]);
    }
    if (!tangent || length(tangent) < EPS) {
      tangent = evalCatmullRomDerivative(points, params[i]);
    }
    if (!tangent || length(tangent) < EPS) {
      if (i === 0) {
        tangent = subVec(pos[1], pos[0]);
      } else {
        tangent = subVec(pos[i], pos[i - 1]);
      }
    }
    const norm = normalize(tangent);
    tangents.push(length(norm) < EPS ? [1, 0, 0] : norm);
  }

  const frames: Frame[] = [];
  let T = tangents[0];
  let N = chooseInitialNormal(T);
  let B = normalize(cross(T, N));
  N = normalize(cross(B, T));
  frames.push({ n: N, b: B, t: T });

  for (let i = 1; i < tangents.length; i += 1) {
    const nextT = tangents[i];
    const axis = cross(T, nextT);
    const axisLen = length(axis);
    if (axisLen > EPS) {
      const angle = Math.acos(clamp(dot(T, nextT), -1, 1));
      const axisNorm = scaleVec(axis, 1 / axisLen);
      N = rotateAroundAxis(N, axisNorm, angle);
      B = rotateAroundAxis(B, axisNorm, angle);
    }
    T = nextT;
    B = normalize(cross(T, N));
    N = normalize(cross(B, T));
    frames.push({ n: N, b: B, t: T });
  }

  return { s, pos, frames, total };
}

function findSegmentForArc(s: number[], target: number): number {
  let low = 0;
  let high = s.length - 1;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (s[mid] < target) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return clamp(low, 1, s.length - 1);
}

function sampleRide(
  cache: RideCache,
  targetArc: number,
  opts: { followOrientation: boolean; reverse: boolean; flip: boolean }
): { pos: Vec3; quat: Quat | null } | null {
  if (!cache || cache.total < EPS) return null;
  const s = clamp(targetArc, 0, cache.total);
  const idx = findSegmentForArc(cache.s, s);
  const s0 = cache.s[idx - 1];
  const s1 = cache.s[idx];
  const t = s1 - s0 > EPS ? (s - s0) / (s1 - s0) : 0;

  const pos = lerpVec(cache.pos[idx - 1], cache.pos[idx], t);

  if (!opts.followOrientation) {
    return { pos, quat: null };
  }

  const q0 = frameToQuat(cache.frames[idx - 1], opts.reverse, opts.flip);
  const q1 = frameToQuat(cache.frames[idx], opts.reverse, opts.flip);
  const quat = quatSlerp(q0, q1, t);
  return { pos, quat };
}

function setNavState(viewer: any, sample: { pos: Vec3; quat: Quat | null }, sync3D: boolean): void {
  const nav = viewer?.navigationState;
  if (!nav?.position?.value) return;
  const perspective = viewer?.perspectiveNavigationState;
  if (nav.atomic !== undefined) nav.atomic = true;
  if (perspective?.atomic !== undefined) perspective.atomic = true;
  try {
    nav.position.value[0] = sample.pos[0];
    nav.position.value[1] = sample.pos[1];
    nav.position.value[2] = sample.pos[2];
    nav.position.changed?.dispatch?.();
    if (sample.quat) {
      nav.pose.orientation.orientation.set(sample.quat);
      nav.pose.orientation.changed?.dispatch?.();
      if (sync3D && perspective?.pose?.orientation?.orientation) {
        perspective.pose.orientation.orientation.set(sample.quat);
        perspective.pose.orientation.changed?.dispatch?.();
      }
    }
  } catch (error) {
    console.warn('[Path Ride] Failed to apply navigation state', error);
  } finally {
    if (nav.atomic !== undefined) nav.atomic = false;
    if (perspective?.atomic !== undefined) perspective.atomic = false;
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
    console.warn('[Path Ride] Failed to read annotation layers', error);
    return [];
  }
}

function extractPoints(layerSpec: any): Vec3[] {
  const annotations = Array.isArray(layerSpec?.source?.annotations)
    ? layerSpec.source.annotations
    : Array.isArray(layerSpec?.annotations)
      ? layerSpec.annotations
      : [];
  const pts: Vec3[] = [];
  annotations.forEach((annotation: any) => {
    if (annotation?.type === 'point' && Array.isArray(annotation.point) && annotation.point.length === 3) {
      pts.push([annotation.point[0], annotation.point[1], annotation.point[2]]);
      return;
    }
    if (!annotation?.type && Array.isArray(annotation?.point) && annotation.point.length === 3) {
      pts.push([annotation.point[0], annotation.point[1], annotation.point[2]]);
      return;
    }
    if (annotation?.type === 'line') {
      if (Array.isArray(annotation.pointA) && annotation.pointA.length === 3) {
        pts.push([annotation.pointA[0], annotation.pointA[1], annotation.pointA[2]]);
      }
      if (Array.isArray(annotation.pointB) && annotation.pointB.length === 3) {
        pts.push([annotation.pointB[0], annotation.pointB[1], annotation.pointB[2]]);
      }
    }
  });
  return pts;
}

export function createPathRideControls(options: { viewer: any; styleButton: (button: HTMLButtonElement | null) => void }) {
  const { viewer, styleButton } = options;
  const root = document.createElement('div');
  root.className = 'slider-container';
  root.style.display = 'flex';
  root.style.flexDirection = 'column';
  root.style.gap = '6px';

  const title = document.createElement('div');
  title.textContent = 'Path Ride';
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
  const useSelectedButton = document.createElement('button');
  useSelectedButton.type = 'button';
  useSelectedButton.textContent = 'Use selected layer';
  styleButton(useSelectedButton);
  useSelectedButton.style.flex = '0 0 auto';
  layerRow.appendChild(layerSelect);
  layerRow.appendChild(useSelectedButton);
  root.appendChild(layerRow);

  const orderRow = document.createElement('div');
  orderRow.style.display = 'flex';
  orderRow.style.gap = '6px';
  orderRow.style.alignItems = 'center';
  const orderLabel = document.createElement('label');
  orderLabel.textContent = 'Order:';
  orderLabel.style.fontSize = '12px';
  const orderSelect = document.createElement('select');
  const orderOptions = [
    { value: 'stored', label: 'As stored' },
    { value: 'nearest', label: 'Nearest-neighbor sort' },
  ];
  orderOptions.forEach((opt) => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    orderSelect.appendChild(option);
  });
  orderRow.appendChild(orderLabel);
  orderRow.appendChild(orderSelect);
  root.appendChild(orderRow);

  const buttonsRow = document.createElement('div');
  buttonsRow.style.display = 'flex';
  buttonsRow.style.gap = '6px';

  const rebuildButton = document.createElement('button');
  rebuildButton.type = 'button';
  rebuildButton.textContent = 'Load / Rebuild path';
  styleButton(rebuildButton);

  const stopButton = document.createElement('button');
  stopButton.type = 'button';
  stopButton.textContent = 'Stop';
  styleButton(stopButton);
  stopButton.classList.add('ghost');

  buttonsRow.appendChild(rebuildButton);
  buttonsRow.appendChild(stopButton);
  root.appendChild(buttonsRow);

  const statusLine = document.createElement('div');
  statusLine.className = 'muted';
  statusLine.style.fontSize = '12px';
  statusLine.style.minHeight = '16px';
  statusLine.textContent = 'Select an annotation layer to begin.';
  root.appendChild(statusLine);

  const playbackRow = document.createElement('div');
  playbackRow.style.display = 'flex';
  playbackRow.style.gap = '6px';

  const playPauseButton = document.createElement('button');
  playPauseButton.type = 'button';
  styleButton(playPauseButton);
  playPauseButton.textContent = 'Play';
  playbackRow.appendChild(playPauseButton);

  const loopLabel = document.createElement('label');
  loopLabel.style.display = 'flex';
  loopLabel.style.alignItems = 'center';
  loopLabel.style.gap = '4px';
  const loopCheckbox = document.createElement('input');
  loopCheckbox.type = 'checkbox';
  loopCheckbox.checked = true;
  loopLabel.appendChild(loopCheckbox);
  loopLabel.appendChild(document.createTextNode('Loop'));
  playbackRow.appendChild(loopLabel);

  const reverseLabel = document.createElement('label');
  reverseLabel.style.display = 'flex';
  reverseLabel.style.alignItems = 'center';
  reverseLabel.style.gap = '4px';
  const reverseCheckbox = document.createElement('input');
  reverseCheckbox.type = 'checkbox';
  reverseCheckbox.checked = false;
  reverseLabel.appendChild(reverseCheckbox);
  reverseLabel.appendChild(document.createTextNode('Reverse'));
  playbackRow.appendChild(reverseLabel);

  root.appendChild(playbackRow);

  const speedRow = document.createElement('div');
  speedRow.style.display = 'flex';
  speedRow.style.alignItems = 'center';
  speedRow.style.gap = '8px';
  const speedLabel = document.createElement('label');
  speedLabel.textContent = 'Speed (vox/sec):';
  speedLabel.style.fontSize = '12px';
  const speedSlider = document.createElement('input');
  speedSlider.type = 'range';
  speedSlider.min = '5';
  speedSlider.max = '400';
  speedSlider.step = '1';
  speedSlider.value = String(DEFAULT_SPEED);
  speedSlider.style.flex = '1 1 0';
  const speedValue = document.createElement('span');
  speedValue.style.fontSize = '12px';
  speedValue.textContent = `${DEFAULT_SPEED}`;
  speedRow.appendChild(speedLabel);
  speedRow.appendChild(speedSlider);
  speedRow.appendChild(speedValue);
  root.appendChild(speedRow);

  const orientationRow = document.createElement('div');
  orientationRow.style.display = 'flex';
  orientationRow.style.flexWrap = 'wrap';
  orientationRow.style.gap = '8px';

  const followLabel = document.createElement('label');
  followLabel.style.display = 'flex';
  followLabel.style.alignItems = 'center';
  followLabel.style.gap = '4px';
  const followCheckbox = document.createElement('input');
  followCheckbox.type = 'checkbox';
  followCheckbox.checked = true;
  followLabel.appendChild(followCheckbox);
  followLabel.appendChild(document.createTextNode('Follow orientation'));

  const sync3DLabel = document.createElement('label');
  sync3DLabel.style.display = 'flex';
  sync3DLabel.style.alignItems = 'center';
  sync3DLabel.style.gap = '4px';
  const sync3DCheckbox = document.createElement('input');
  sync3DCheckbox.type = 'checkbox';
  sync3DCheckbox.checked = true;
  sync3DLabel.appendChild(sync3DCheckbox);
  sync3DLabel.appendChild(document.createTextNode('Sync 3D view'));

  const flipLabel = document.createElement('label');
  flipLabel.style.display = 'flex';
  flipLabel.style.alignItems = 'center';
  flipLabel.style.gap = '4px';
  const flipCheckbox = document.createElement('input');
  flipCheckbox.type = 'checkbox';
  flipCheckbox.checked = false;
  flipLabel.appendChild(flipCheckbox);
  flipLabel.appendChild(document.createTextNode('Flip orientation'));

  orientationRow.appendChild(followLabel);
  orientationRow.appendChild(sync3DLabel);
  orientationRow.appendChild(flipLabel);
  root.appendChild(orientationRow);

  const smoothingRow = document.createElement('div');
  smoothingRow.style.display = 'flex';
  smoothingRow.style.flexDirection = 'column';
  smoothingRow.style.gap = '6px';

  const lookAheadWrap = document.createElement('div');
  lookAheadWrap.style.display = 'flex';
  lookAheadWrap.style.alignItems = 'center';
  lookAheadWrap.style.gap = '8px';
  const lookAheadLabel = document.createElement('label');
  lookAheadLabel.textContent = 'Look-ahead samples:';
  lookAheadLabel.style.fontSize = '12px';
  const lookAheadSlider = document.createElement('input');
  lookAheadSlider.type = 'range';
  lookAheadSlider.min = '0';
  lookAheadSlider.max = '20';
  lookAheadSlider.step = '1';
  lookAheadSlider.value = '0';
  lookAheadSlider.style.flex = '1 1 0';
  const lookAheadValue = document.createElement('span');
  lookAheadValue.style.fontSize = '12px';
  lookAheadValue.textContent = '0';
  lookAheadWrap.appendChild(lookAheadLabel);
  lookAheadWrap.appendChild(lookAheadSlider);
  lookAheadWrap.appendChild(lookAheadValue);
  smoothingRow.appendChild(lookAheadWrap);

  const adaptiveWrap = document.createElement('div');
  adaptiveWrap.style.display = 'flex';
  adaptiveWrap.style.gap = '8px';
  adaptiveWrap.style.alignItems = 'center';
  const adaptiveCheckbox = document.createElement('input');
  adaptiveCheckbox.type = 'checkbox';
  adaptiveCheckbox.checked = false;
  const adaptiveLabel = document.createElement('span');
  adaptiveLabel.textContent = 'Adaptive sampling (curvature-weighted)';
  adaptiveLabel.style.fontSize = '12px';
  const curvatureSlider = document.createElement('input');
  curvatureSlider.type = 'range';
  curvatureSlider.min = '0';
  curvatureSlider.max = '2';
  curvatureSlider.step = '0.1';
  curvatureSlider.value = '0.8';
  curvatureSlider.style.flex = '1 1 0';
  const curvatureValue = document.createElement('span');
  curvatureValue.style.fontSize = '12px';
  curvatureValue.textContent = curvatureSlider.value;
  adaptiveWrap.appendChild(adaptiveCheckbox);
  adaptiveWrap.appendChild(adaptiveLabel);
  adaptiveWrap.appendChild(curvatureSlider);
  adaptiveWrap.appendChild(curvatureValue);
  smoothingRow.appendChild(adaptiveWrap);

  root.appendChild(smoothingRow);

  let rideCache: RideCache | null = null;
  let controlPoints: Vec3[] = [];
  let running = false;
  let paused = false;
  let rafId: number | null = null;
  let lastTs = 0;
  let currentArc = 0;
  let direction = 1;

  const setStatus = (text: string, isError = false) => {
    statusLine.textContent = text;
    statusLine.style.color = isError ? '#f25f5c' : '#ccc';
  };

  const refreshLayerOptions = () => {
    const entries = collectAnnotationLayers(viewer);
    const selected = layerSelect.value;
    layerSelect.innerHTML = '';
    entries.forEach((entry) => {
      const opt = document.createElement('option');
      opt.value = entry.name;
      opt.textContent = entry.name;
      layerSelect.appendChild(opt);
    });
    if (entries.length === 0) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = 'No annotation layers found';
      layerSelect.appendChild(opt);
    } else if (entries.some((entry) => entry.name === selected)) {
      layerSelect.value = selected;
    }
  };

  refreshLayerOptions();

  const stopPlayback = () => {
    running = false;
    paused = false;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    playPauseButton.textContent = 'Play';
  };

  const applySample = () => {
    if (!rideCache) return;
    const sample = sampleRide(rideCache, currentArc, {
      followOrientation: followCheckbox.checked,
      reverse: direction < 0,
      flip: flipCheckbox.checked,
    });
    if (sample) {
      setNavState(viewer, sample, sync3DCheckbox.checked);
    }
  };

  const startLoop = () => {
    if (!rideCache) {
      setStatus('Load a path before playing.', true);
      return;
    }
    if (running && !paused) {
      paused = true;
      playPauseButton.textContent = 'Resume';
      return;
    }
    running = true;
    paused = false;
    lastTs = performance.now();
    playPauseButton.textContent = 'Pause';
    if (!rafId) {
      rafId = requestAnimationFrame(step);
    }
  };

  const step = (ts: number) => {
    if (!running) {
      rafId = null;
      return;
    }
    const dt = Math.max(0, (ts - lastTs) / 1000);
    lastTs = ts;
    if (!paused && rideCache) {
      const speed = parseFloat(speedSlider.value) || 0;
      currentArc += direction * speed * dt;
      if (currentArc > rideCache.total) {
        if (loopCheckbox.checked) {
          currentArc = currentArc % rideCache.total;
        } else {
          currentArc = rideCache.total;
          running = false;
          playPauseButton.textContent = 'Play';
        }
      }
      if (currentArc < 0) {
        if (loopCheckbox.checked) {
          currentArc = rideCache.total + (currentArc % rideCache.total);
        } else {
          currentArc = 0;
          running = false;
          playPauseButton.textContent = 'Play';
        }
      }
      applySample();
    }
    rafId = requestAnimationFrame(step);
  };

  const rebuildPath = () => {
    stopPlayback();
    const layerName = layerSelect.value;
    if (!layerName) {
      setStatus('Choose an annotation layer first.', true);
      return;
    }
    const entries = collectAnnotationLayers(viewer);
    const layerEntry = entries.find((entry) => entry.name === layerName);
    if (!layerEntry) {
      setStatus(`Layer "${layerName}" not found.`, true);
      return;
    }
    const pts = extractPoints(layerEntry.spec);
    if (!pts.length) {
      setStatus('No point or line annotations found on this layer.', true);
      return;
    }
    let ordered = pts;
    if (orderSelect.value === 'nearest') {
      ordered = sortPointsByProximity(pts);
    }
    ordered = ordered.filter((point, index) => {
      if (index === 0) return true;
      return distance(point, ordered[index - 1]) > EPS;
    });
    if (ordered.length < 2) {
      setStatus('Need at least 2 unique points to build a path.', true);
      return;
    }
    controlPoints = ordered;
    const cache = buildRideCache(ordered, {
      lookAhead: Number.parseInt(lookAheadSlider.value, 10) || 0,
      adaptive: adaptiveCheckbox.checked,
      curvatureRatio: Number.parseFloat(curvatureSlider.value) || 0,
    });
    if (!cache) {
      setStatus('Failed to build spline from these points.', true);
      return;
    }
    rideCache = cache;
    currentArc = direction > 0 ? 0 : cache.total;
    applySample();
    const lengthMsg = cache.total >= 1000 ? `${(cache.total / 1000).toFixed(2)}k` : cache.total.toFixed(1);
    setStatus(`Path ready (${ordered.length} pts, ${cache.pos.length} samples, ${lengthMsg} vox).`);
  };

  playPauseButton.addEventListener('click', () => startLoop());
  stopButton.addEventListener('click', () => {
    stopPlayback();
    if (rideCache) {
      currentArc = direction > 0 ? 0 : rideCache.total;
      applySample();
    }
  });
  loopCheckbox.addEventListener('change', () => {
    if (!loopCheckbox.checked && rideCache && currentArc >= rideCache.total) {
      currentArc = rideCache.total;
    }
  });
  reverseCheckbox.addEventListener('change', () => {
    direction = reverseCheckbox.checked ? -1 : 1;
  });
  followCheckbox.addEventListener('change', () => {
    sync3DCheckbox.disabled = !followCheckbox.checked;
  });
  speedSlider.addEventListener('input', () => {
    speedValue.textContent = speedSlider.value;
  });
  lookAheadSlider.addEventListener('input', () => {
    lookAheadValue.textContent = lookAheadSlider.value;
  });
  curvatureSlider.addEventListener('input', () => {
    curvatureValue.textContent = curvatureSlider.value;
  });

  rebuildButton.addEventListener('click', rebuildPath);
  useSelectedButton.addEventListener('click', () => {
    const selected = viewer?.selectedLayer?.layer?.name || viewer?.selectedLayer?.name;
    if (!selected) {
      setStatus('No selected layer detected.', true);
      return;
    }
    const entries = collectAnnotationLayers(viewer);
    const match = entries.find((entry) => entry.name === selected);
    if (!match) {
      setStatus(`Selected layer "${selected}" is not an annotation layer.`, true);
      return;
    }
    layerSelect.value = selected;
    setStatus(`Using layer "${selected}".`);
  });

  if (viewer?.layerManager?.layersChanged?.add) {
    viewer.layerManager.layersChanged.add(() => {
      setTimeout(refreshLayerOptions, 200);
    });
  } else {
    refreshLayerOptions();
  }

  return {
    element: root,
    refresh: refreshLayerOptions,
    stop: stopPlayback,
  };
}
