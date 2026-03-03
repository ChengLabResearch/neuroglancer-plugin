// @ts-nocheck

import { styleButton } from '../Layers/mute';
import { ensureLayerLookup } from '../Viewer/ng';

let homeViewState: any = null;
let initialViewState: any = null;

export function setInitialViewState(state: any): void {
  initialViewState = state;
}

export function getInitialViewState(): any {
  return initialViewState;
}

export function getHomeViewState(): any {
  return homeViewState;
}

export function setHomeView(): void {
  const viewer = window.viewer;
  if (!viewer?.navigationState?.position?.value ||
      !viewer?.navigationState?.pose?.orientation?.orientation ||
      !viewer?.navigationState?.zoomFactor?.value ||
      !viewer?.perspectiveNavigationState?.pose?.orientation?.orientation ||
      !viewer?.perspectiveNavigationState?.zoomFactor?.value) {
    console.warn('[Set Home] Cannot set home view: Required viewer state components not fully available.');
    const setHomeButton = document.querySelector('#setHomeButton');
    if (setHomeButton) {
      setHomeButton.innerText = 'Error: State Missing';
      setTimeout(() => {
        const button = document.querySelector('#setHomeButton');
        if (button) {
          button.innerText = 'Set Home View';
          styleButton(button as HTMLButtonElement);
        }
      }, 2000);
    }
    return;
  }

  homeViewState = {
    position: new Float64Array(viewer.navigationState.position.value),
    projectionOrientation: new Float32Array(viewer.perspectiveNavigationState.pose.orientation.orientation),
    projectionScale: viewer.perspectiveNavigationState.zoomFactor.value,
    crossSectionOrientation: new Float32Array(viewer.navigationState.pose.orientation.orientation),
    crossSectionScale: viewer.navigationState.zoomFactor.value,
  };

  const setHomeButton = document.querySelector('#setHomeButton') as HTMLButtonElement | null;
  if (setHomeButton) {
    const originalText = setHomeButton.innerText;
    setHomeButton.innerText = 'Home View Set!';
    setHomeButton.style.backgroundColor = '#28a745';
    setTimeout(() => {
      const button = document.querySelector('#setHomeButton') as HTMLButtonElement | null;
      if (button) {
        button.innerText = originalText;
        styleButton(button);
      }
    }, 1500);
  }
}

export function restoreView(): void {
  const viewer = window.viewer;
  if (!viewer) {
    console.warn('[Restore View] Cannot restore view: viewer not ready.');
    return;
  }

  ensureLayerLookup(viewer);

  const applyState = (state: any) => {
    viewer.navigationState.atomic = true;
    viewer.perspectiveNavigationState.atomic = true;
    try {
      viewer.navigationState.position.value.set(state.position);
      viewer.navigationState.pose.orientation.orientation.set(state.crossSectionOrientation);
      viewer.navigationState.zoomFactor.value = state.crossSectionScale;
      viewer.perspectiveNavigationState.pose.orientation.orientation.set(state.projectionOrientation);
      viewer.perspectiveNavigationState.zoomFactor.value = state.projectionScale;

      viewer.navigationState.position.changed.dispatch();
      viewer.navigationState.pose.orientation.changed.dispatch();
      viewer.navigationState.zoomFactor.changed.dispatch();
      viewer.perspectiveNavigationState.pose.orientation.changed.dispatch();
      viewer.perspectiveNavigationState.zoomFactor.changed.dispatch();
    } catch (error) {
      console.error('[Restore View] Error applying view state:', error);
    } finally {
      viewer.navigationState.atomic = false;
      viewer.perspectiveNavigationState.atomic = false;
    }
  };

  if (homeViewState) {
    applyState(homeViewState);
    return;
  }

  if (initialViewState) {
    applyState(initialViewState);
    return;
  }

  viewer.navigationState.atomic = true;
  viewer.perspectiveNavigationState.atomic = true;
  try {
    viewer.perspectiveNavigationState.pose.orientation.reset?.();
    viewer.perspectiveNavigationState.zoomFactor.reset?.();
    viewer.navigationState.pose.orientation.reset?.();
    viewer.navigationState.zoomFactor.reset?.();
    viewer.navigationState.position.reset?.();
  } catch (error) {
    console.error('[Restore View] Error resetting view to defaults:', error);
  } finally {
    viewer.navigationState.atomic = false;
    viewer.perspectiveNavigationState.atomic = false;
  }
}
