// @ts-nocheck

export function createHelpPopover(styleButton: (button: HTMLButtonElement | null) => void) {
  const helpButton = document.createElement('button');
  helpButton.innerText = 'Help (?)';
  styleButton(helpButton);
  helpButton.id = 'helpButton';
  helpButton.style.marginTop = '8px';

  const helpPopover = document.createElement('div');
  helpPopover.className = 'tool-help-popover hidden';
  helpPopover.innerHTML = `
    <strong>Viewer Shortcuts</strong>
    <ul>
      <li><b>Rotation</b>: spin/orbit the 3D view, adjust speed, and switch axes.</li>
      <li><b>View State</b>: save/restore view + match 2D and 3D orientations.</li>
      <li><b>Plane Tilt</b>: nudge 2D slice planes precisely (supports anchors + roll).</li>
      <li><b>Annotation Tools</b>: Points ↔ Lines, Path Ride, Plane Align.</li>
      <li><b>Hover & Focus</b>: auto-focus ontology on viewer hover/click.</li>
      <li><b>Mute Non-Image</b>: hides meshes/segmentations (Ctrl+Space).</li>
      <li>Use the bottom-left <b>Ontology</b> toggle to reveal the segment hierarchy.</li>
    </ul>
  `;

  const closeHelpPopover = (event: MouseEvent) => {
    if (!helpPopover.contains(event.target as Node) && event.target !== helpButton) {
      helpPopover.classList.add('hidden');
      document.removeEventListener('click', closeHelpPopover);
    }
  };

  helpButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const willShow = helpPopover.classList.contains('hidden');
    helpPopover.classList.toggle('hidden');
    if (willShow) {
      document.addEventListener('click', closeHelpPopover);
    } else {
      document.removeEventListener('click', closeHelpPopover);
    }
  });

  return {
    button: helpButton,
    popover: helpPopover,
  };
}
