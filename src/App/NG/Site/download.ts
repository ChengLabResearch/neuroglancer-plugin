export function downloadTextFile(
  filename: string,
  text: string,
  mime = 'text/plain;charset=utf-8'
): void {
  try {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  } catch (error) {
    console.error('downloadTextFile failed', error);
  }
}

export function downloadCurrentState(): void {
  try {
    const viewer = (window as any).viewer;
    if (!viewer?.state) {
      alert('Viewer is not ready yet.');
      return;
    }
    const state = viewer.state.toJSON();
    downloadTextFile(
      'octopus_view_state.json',
      JSON.stringify(state, null, 2),
      'application/json'
    );
  } catch (error) {
    console.error(error);
    alert('Could not download the current state.');
  }
}

export async function copyCurrentState(): Promise<boolean> {
  try {
    const viewer = (window as any).viewer;
    if (!viewer?.state) {
      alert('Viewer is not ready yet.');
      return false;
    }
    const state = viewer.state.toJSON();
    await navigator.clipboard.writeText(JSON.stringify(state));
    return true;
  } catch (error) {
    console.error(error);
    alert('Could not copy the current state.');
    return false;
  }
}
