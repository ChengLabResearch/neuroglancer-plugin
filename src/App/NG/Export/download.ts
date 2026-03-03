export function downloadTextAsFile(filename: string, text: string) {
  try {
    const blob = new Blob([text], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  } catch (error) {
    console.warn('[atlas-export] Failed to trigger download', error);
  }
}

export function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
  } else {
    legacyCopy(text);
  }
}

function legacyCopy(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
  } catch (error) {
    console.warn('[atlas-export] Fallback clipboard copy failed', error);
  }
  textarea.remove();
}
