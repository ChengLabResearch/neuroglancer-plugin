// Unified shim: pull everything from layers
export { toggleMuteNonImageLayers, isMuteActive, initialiseMuteButton } from '../Layers/mute';
export { styleButton } from '../Layers/muteStyle';
export function withTempCheckboxSuspend(fn: () => void): void { try { fn(); } catch {} }
