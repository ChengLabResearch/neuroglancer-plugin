// @ts-nocheck

export function match2DTo3DView() {
      if (!window.viewer?.perspectiveNavigationState?.pose?.orientation?.orientation ||
        !window.viewer?.navigationState?.pose?.orientation?.orientation) {
        console.error("[Sync Orient] Viewer state components for orientation sync not ready.");
        return;
      }
      console.log("[Sync Orient] Matching 2D Slice orientation to 3D View orientation.");
      const current3DOrientation = window.viewer.perspectiveNavigationState.pose.orientation.orientation;

      // Use atomic updates for safety
      window.viewer.navigationState.atomic = true;
      try {
        window.viewer.navigationState.pose.orientation.orientation.set(current3DOrientation);
        window.viewer.navigationState.pose.orientation.changed.dispatch(); // Notify NG
      } catch (e) {
        console.error("[Sync Orient] Error setting 2D orientation:", e);
      } finally {
        window.viewer.navigationState.atomic = false;
      }
    }

    /**
     * Reads the current 2D cross-section orientation and applies it
     * to the 3D perspective camera orientation.
     */
    export function match3DTo2DView() {
      if (!window.viewer?.perspectiveNavigationState?.pose?.orientation?.orientation ||
        !window.viewer?.navigationState?.pose?.orientation?.orientation) {
        console.error("[Sync Orient] Viewer state components for orientation sync not ready.");
        return;
      }
      console.log("[Sync Orient] Matching 3D View orientation to 2D Slice orientation.");
      const current2DOrientation = window.viewer.navigationState.pose.orientation.orientation;

      // Use atomic updates for safety
      window.viewer.perspectiveNavigationState.atomic = true;
      try {
        window.viewer.perspectiveNavigationState.pose.orientation.orientation.set(current2DOrientation);
        window.viewer.perspectiveNavigationState.pose.orientation.changed.dispatch(); // Notify NG
      } catch (e) {
        console.error("[Sync Orient] Error setting 3D orientation:", e);
      } finally {
        window.viewer.perspectiveNavigationState.atomic = false;
      }
    }

