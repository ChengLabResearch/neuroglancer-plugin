// @ts-nocheck

let currentAnimationFrame: number | null = null;
let currentAxis: 'X' | 'Y' | 'Z' | null = null;
let rotationSpeed = 0.01;
let initialOrientation: Float32Array | null = null;
let currentAngle = 0;
let rotationMode: 'world' | 'view' = 'world';

function quatMultiply(out: Float32Array, q1: Float32Array, q2: Float32Array) {
  const x1 = q1[0], y1 = q1[1], z1 = q1[2], w1 = q1[3];
  const x2 = q2[0], y2 = q2[1], z2 = q2[2], w2 = q2[3];
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

export function rotate3DViewerAroundAxisWithCurrentPerspective(axis: 'X' | 'Y' | 'Z'): void {
  console.log(`[Rotation] Attempting to rotate around ${axis}-axis.`);
  if (!window.viewer?.perspectiveNavigationState?.pose?.orientation?.orientation) {
    console.error('[Rotation] Viewer or perspective state/orientation not ready for rotation.', window.viewer?.perspectiveNavigationState);
    return;
  }
  if (currentAxis === axis && currentAnimationFrame !== null) {
    stopCurrentRotation();
    return;
  }
  stopCurrentRotation();

  currentAxis = axis;
  currentAngle = 0;
  try {
    initialOrientation = new Float32Array(window.viewer.perspectiveNavigationState.pose.orientation.orientation);
    console.log('[Rotation] Initial orientation captured:', initialOrientation);
  } catch (error) {
    console.error('[Rotation] Failed to get initial orientation:', error);
    currentAxis = null;
    return;
  }

  const stopBtn = document.getElementById('stopButton');
  if (stopBtn) stopBtn.style.display = 'block';

  const updateRotation = () => {
    if (currentAxis !== axis || currentAnimationFrame === null) {
      console.log('[Rotation Update] Stopping loop: Axis changed or animation cancelled.');
      if (currentAnimationFrame !== null) cancelAnimationFrame(currentAnimationFrame);
      currentAnimationFrame = null;
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
      stopCurrentRotation();
    }
  };

  console.log(`[Rotation] Starting animation loop for ${axis}-axis.`);
  currentAnimationFrame = requestAnimationFrame(updateRotation);
}

export function stopCurrentRotation(): void {
  if (currentAnimationFrame !== null) {
    cancelAnimationFrame(currentAnimationFrame);
    console.log(`[Rotation Stop] Stopped rotation animation for ${currentAxis || 'previous'}-axis.`);
    currentAnimationFrame = null;
  }
  currentAxis = null;
  const stopBtn = document.getElementById('stopButton');
  if (stopBtn) stopBtn.style.display = 'none';
}

