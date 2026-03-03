let urlUpdatesEnabled = true;
const originalReplaceState = window.history.replaceState.bind(window.history);

function replaceStateGuard(state: unknown, title: string, url?: string | URL | null): void {
  if (!urlUpdatesEnabled) {
    return;
  }
  originalReplaceState(state, title, url as any);
}

window.history.replaceState = replaceStateGuard as typeof window.history.replaceState;

export function setUrlUpdatesEnabled(enabled: boolean): void {
  urlUpdatesEnabled = enabled;
}

export function getParam(name: string): string | null {
  try {
    const url = new URL(window.location.href);
    const value = url.searchParams.get(name);
    return value && value.trim() !== '' ? value : null;
  } catch (_) {
    return null;
  }
}

export function setParam(
  name: string,
  value: string | null | undefined,
  { replace = true }: { replace?: boolean } = {}
): void {
  try {
    const url = new URL(window.location.href);
    if (value === null || value === undefined || value === '') {
      url.searchParams.delete(name);
    } else {
      url.searchParams.set(name, value);
    }
    if (replace) {
      window.history.replaceState({}, '', url.toString());
    } else {
      window.location.href = url.toString();
    }
  } catch (error) {
    console.error('setParam failed', error);
  }
}

export function getParameterByName(name: string): string | null {
  const url = window.location.href;
  const paramName = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${paramName}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results || !results[2]) {
    return null;
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
