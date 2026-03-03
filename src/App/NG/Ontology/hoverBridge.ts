import { OntologyUI } from './ui';

let globalOntologyUI: OntologyUI | null = null;

export function registerOntologyUI(instance: OntologyUI | null | undefined): void {
  globalOntologyUI = instance ?? null;
}

export function showInfoForHoveredSegment(
  segmentIdStr: string | number | bigint | null | undefined,
  sourceLayerName?: string
): void {
  if (!globalOntologyUI || segmentIdStr == null) return;
  const idStr = String(segmentIdStr);
  try {
    globalOntologyUI.showInfo(idStr, sourceLayerName);
  } catch (err) {
    console.warn('[HoverBridge] Failed to show info for hovered segment', { idStr, sourceLayerName, err });
  }
}
