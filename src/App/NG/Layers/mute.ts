// @ts-nocheck

export { styleButton } from './muteStyle';
export function isMuteActive(): boolean {
  const st = (window as any).__ngMuteState;
  return !!(st && st.active);
}

function applyMuteButtonState(button: HTMLButtonElement | null, active: boolean): void {
  if (!button) return;
  button.classList.toggle('active', active);
  if (active) {
    button.innerText = 'Unmute Layers';
    button.title = 'Restore visibility of non-image layers';
    button.style.backgroundColor = '#ffc107';
    button.style.color = '#001314';
    button.style.borderColor = 'transparent';
  } else {
    button.innerText = 'Mute Non-Image';
    button.title = 'Temporarily hide all non-image layers (segmentation, annotations, etc.)';
    button.style.backgroundColor = '#444';
    button.style.color = '#eee';
    button.style.borderColor = '#666';
  }
}

export function toggleMuteNonImageLayers(): void {
  console.log('[Mute Toggle ENTRY] via layers/mute.ts');
  const manager = (window as any)?.viewer?.layerManager;
  if (!manager) { console.warn('[Mute Toggle] LayerManager not available'); return; }
  (window as any).__ngMuteState = (window as any).__ngMuteState || { active:false, vis:new Map<string, boolean>() };
  const st = (window as any).__ngMuteState;
  const layers = manager.managedLayers || manager.layers || [];
  let changed = false;
  if (st.active) {
    for (const L of layers) {
      const prev = st.vis.get(L.name);
      if (typeof prev === 'boolean' && typeof L.visible === 'boolean') { L.visible = prev; changed = true; }
    }
    st.vis.clear(); st.active = false;
    if (changed) try{ manager?.layersChanged?.dispatch?.(); }catch{}
    console.log('[Mute Toggle DISPATCH] Unmuted (layersChanged dispatched if any).');
    applyMuteButtonState(document.getElementById('muteNonImageButton') as HTMLButtonElement | null, st.active);
    return;
  }
  st.vis.clear();
  for (const L of layers) {
    const t = (L.layer?.type ?? L.type ?? L.layer?.spec?.type ?? L.spec?.type ?? null);
    if (t === 'image') continue;
    if (typeof L.visible === 'boolean') {
      st.vis.set(L.name, L.visible);
      L.visible = false;
      changed = true;
    }
  }
  st.active = true;
  if (changed) try{ manager?.layersChanged?.dispatch?.(); }catch{}
  console.log('[Mute Toggle DISPATCH] Muted non-image (layersChanged dispatched if any).');
  applyMuteButtonState(document.getElementById('muteNonImageButton') as HTMLButtonElement | null, st.active);
}

export function initialiseMuteButton(button: HTMLButtonElement | null): void {
  try { styleButton(button as any); } catch {}
  if (!button) return;
  const apply = () => {
    applyMuteButtonState(button, isMuteActive());
  };
  apply();
  try {
    const obs = new MutationObserver(() => { try { apply(); } catch {} });
    obs.observe(button, { attributes: true, attributeFilter: ['disabled'] });
  } catch {}
}
