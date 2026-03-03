// @ts-nocheck

export function styleButton(button: HTMLButtonElement | null): void {
  if (!button) return;

  const applyVisualState = () => {
    if (button.classList.contains('active')) {
      button.style.backgroundColor = 'var(--accent)';
      button.style.color = '#001314';
      button.style.borderColor = 'transparent';
      return;
    }
    button.style.backgroundColor = '#444';
    button.style.color = '#eee';
    button.style.borderColor = '#666';
  };

  button.style.padding = '5px 8px';
  button.style.fontSize = '12px';
  button.style.cursor = 'pointer';
  button.style.border = '1px solid #666';
  button.style.borderRadius = '3px';
  button.style.width = '100%';
  button.style.boxSizing = 'border-box';
  button.style.textAlign = 'left';
  button.style.marginBottom = '3px';
  button.style.transition = 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease';
  applyVisualState();

  button.addEventListener('mouseenter', () => {
    if (button.disabled || button.classList.contains('active')) return;
    button.style.backgroundColor = '#555';
  });
  button.addEventListener('mouseleave', () => {
    if (button.disabled) return;
    applyVisualState();
  });

  const observer = new MutationObserver(() => {
    applyVisualState();
  });
  observer.observe(button, { attributes: true, attributeFilter: ['class', 'disabled'] });
}
