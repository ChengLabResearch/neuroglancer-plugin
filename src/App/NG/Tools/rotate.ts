// @ts-nocheck

import { ensureLayerLookup } from '../Viewer/ng';

let currentAnimationFrame: number | null = null;
let currentAxis: 'X' | 'Y' | 'Z' | null = null;
let rotationSpeed = 0.01;
let initialOrientation: Float32Array | null = null;
let currentAngle = 0;
let rotationMode: 'world' | 'view' = 'world';

function quatMultiply(out: Float32Array, q1: Float32Array, q2: Float32Array): Float32Array {
  const x1 = q1[0]; const y1 = q1[1]; const z1 = q1[2]; const w1 = q1[3];
  const x2 = q2[0]; const y2 = q2[1]; const z2 = q2[2]; const w2 = q2[3];
  out[0] = w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2;
  out[1] = w1 * y2 - x1 * z2 + y1 * w2 + z1 * x2;
  out[2] = w1 * z2 + x1 * y2 - y1 * x2 + z1 * w2;
  out[3] = w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2;
  return out;
}

export function getRotationSpeed(): number {
  return rotationSpeed;
}

export function setRotationSpeed(value: number): void {
  rotationSpeed = value;
}

export function getRotationMode(): 'world' | 'view' {
  return rotationMode;
}

export function setRotationMode(mode: 'world' | 'view', persistAngle = true): void {
  rotationMode = mode;
  if (persistAngle && currentAnimationFrame !== null && window.viewer?.perspectiveNavigationState?.pose?.orientation?.orientation) {
    initialOrientation = new Float32Array(window.viewer.perspectiveNavigationState.pose.orientation.orientation);
    currentAngle = 0;
  }
}

function stopRotationInternal(): void {
  if (currentAnimationFrame !== null) {
    cancelAnimationFrame(currentAnimationFrame);
    currentAnimationFrame = null;
  }
  currentAxis = null;
  const stopBtn = document.getElementById('stopButton');
  if (stopBtn) stopBtn.style.display = 'none';
}

export function stopCurrentRotation(): void {
  stopRotationInternal();
}

export function rotate3DViewerAroundAxisWithCurrentPerspective(axis: 'X' | 'Y' | 'Z'): void {
  if (!window.viewer?.perspectiveNavigationState?.pose?.orientation?.orientation) {
    console.error('[Rotation] Viewer or perspective state/orientation not ready for rotation.', window.viewer?.perspectiveNavigationState);
    return;
  }
  if (currentAxis === axis && currentAnimationFrame !== null) {
    stopRotationInternal();
    return;
  }
  stopRotationInternal();

  currentAxis = axis;
  currentAngle = 0;
  try {
    initialOrientation = new Float32Array(window.viewer.perspectiveNavigationState.pose.orientation.orientation);
  } catch (error) {
    console.error('[Rotation] Failed to get initial orientation:', error);
    currentAxis = null;
    return;
  }

  const stopBtn = document.getElementById('stopButton');
  if (stopBtn) stopBtn.style.display = 'block';

  const updateRotation = () => {
    if (currentAxis !== axis || currentAnimationFrame === null) {
      stopRotationInternal();
      return;
    }

    try {
      currentAngle += rotationSpeed;
      const sinHalfAngle = Math.sin(currentAngle / 2);
      const cosHalfAngle = Math.cos(currentAngle / 2);
      let rotationQuaternion: Float32Array;
      switch (axis) {
        case 'X':
          rotationQuaternion = new Float32Array([sinHalfAngle, 0, 0, cosHalfAngle]);
          break;
        case 'Y':
          rotationQuaternion = new Float32Array([0, sinHalfAngle, 0, cosHalfAngle]);
          break;
        case 'Z':
          rotationQuaternion = new Float32Array([0, 0, sinHalfAngle, cosHalfAngle]);
          break;
        default:
          throw new Error(`Invalid rotation axis: ${axis}`);
      }

      const combinedQuaternion = new Float32Array(4);
      if (rotationMode === 'view') {
        quatMultiply(combinedQuaternion, initialOrientation!, rotationQuaternion);
      } else {
        quatMultiply(combinedQuaternion, rotationQuaternion, initialOrientation!);
      }

      window.viewer.perspectiveNavigationState.atomic = true;
      window.viewer.perspectiveNavigationState.pose.orientation.orientation.set(combinedQuaternion);
      window.viewer.perspectiveNavigationState.pose.orientation.changed.dispatch();
      window.viewer.perspectiveNavigationState.atomic = false;

      currentAnimationFrame = requestAnimationFrame(updateRotation);
    } catch (error) {
      console.error('[Rotation Update] Error during update:', error);
      stopRotationInternal();
    }
  };

  currentAnimationFrame = requestAnimationFrame(updateRotation);
}

export function match2DTo3DView(): void {
  if (!window.viewer?.perspectiveNavigationState?.pose?.orientation?.orientation ||
      !window.viewer?.navigationState?.pose?.orientation?.orientation) {
    console.error('[Sync Orient] Viewer state components for orientation sync not ready.');
    return;
  }
  const current3DOrientation = window.viewer.perspectiveNavigationState.pose.orientation.orientation;

  window.viewer.navigationState.atomic = true;
  try {
    window.viewer.navigationState.pose.orientation.orientation.set(current3DOrientation);
    window.viewer.navigationState.pose.orientation.changed.dispatch();
  } catch (e) {
    console.error('[Sync Orient] Error setting 2D orientation:', e);
  } finally {
    window.viewer.navigationState.atomic = false;
  }
}

export function match3DTo2DView(): void {
  if (!window.viewer?.perspectiveNavigationState?.pose?.orientation?.orientation ||
      !window.viewer?.navigationState?.pose?.orientation?.orientation) {
    console.error('[Sync Orient] Viewer state components for orientation sync not ready.');
    return;
  }
  const current2DOrientation = window.viewer.navigationState.pose.orientation.orientation;

  window.viewer.perspectiveNavigationState.atomic = true;
  try {
    window.viewer.perspectiveNavigationState.pose.orientation.orientation.set(current2DOrientation);
    window.viewer.perspectiveNavigationState.pose.orientation.changed.dispatch();
  } catch (e) {
    console.error('[Sync Orient] Error setting 3D orientation:', e);
  } finally {
    window.viewer.perspectiveNavigationState.atomic = false;
  }
}

export function initialiseRotation(viewer: any): void {
  ensureLayerLookup(viewer);
}
