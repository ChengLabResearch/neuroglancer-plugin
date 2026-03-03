// @ts-nocheck

export class PreviewPane {
  private listRoot: HTMLElement;
  private pane: HTMLElement;
  private img: HTMLImageElement;
  private caption: HTMLElement;
  private quickStart: HTMLElement;

  private hoverTimer: number | null = null;
  private restoreTimer: number | null = null;
  private inflight: HTMLImageElement | null = null;
  private cache = new Map<string, HTMLImageElement>();

  constructor(opts: {
    listSelector: string;
    paneSelector: string;
    imgSelector: string;
    captionSelector: string;
    quickStartSelector: string;
  }) {
    const list = document.querySelector(opts.listSelector) as HTMLElement | null;
    const pane = document.querySelector(opts.paneSelector) as HTMLElement | null;
    const img = document.querySelector(opts.imgSelector) as HTMLImageElement | null;
    const caption = document.querySelector(opts.captionSelector) as HTMLElement | null;
    const quickStart = document.querySelector(opts.quickStartSelector) as HTMLElement | null;

    if (!list || !pane || !img || !caption || !quickStart) {
      throw new Error('[PreviewPane] Missing required elements');
    }

    this.listRoot = list;
    this.pane = pane;
    this.img = img;
    this.caption = caption;
    this.quickStart = quickStart;

    this.bind();
    this.preloadFirstN(8);
  }

  private bind(): void {
    this.listRoot.addEventListener(
      'pointerover',
      (event) => {
        const card = (event.target as HTMLElement | null)?.closest?.('.preset-card') as HTMLElement | null;
        if (!card) return;
        this.queueShow(card);
      },
      true
    );

    this.listRoot.addEventListener(
      'pointerout',
      (event) => {
        const to = (event as PointerEvent).relatedTarget as HTMLElement | null;
        if (to && this.listRoot.contains(to)) return;
        this.queueHide();
      },
      true
    );

    this.listRoot.addEventListener('focusin', (event) => {
      const card = (event.target as HTMLElement | null)?.closest?.('.preset-card') as HTMLElement | null;
      if (!card) return;
      this.queueShow(card);
    });

    this.listRoot.addEventListener('focusout', (event) => {
      const to = (event as FocusEvent).relatedTarget as HTMLElement | null;
      if (to && this.listRoot.contains(to)) return;
      this.queueHide();
    });
  }

  private queueShow(card: HTMLElement): void {
    const src = card.getAttribute('data-preview-img') || '';
    const caption = card.querySelector('.figure-panel-title')?.textContent || card.getAttribute('data-preview-key') || '';
    if (!src) return;

    if (this.restoreTimer) {
      clearTimeout(this.restoreTimer);
      this.restoreTimer = null;
    }
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
    }

    this.hoverTimer = window.setTimeout(() => this.show(src, caption), 110);
  }

  private queueHide(): void {
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    }
    if (this.restoreTimer) {
      clearTimeout(this.restoreTimer);
    }
    this.restoreTimer = window.setTimeout(() => this.hide(), 140);
  }

  private show(src: string, caption: string): void {
    const normalized = this.normalizeSrc(src);

    if (this.pane.hidden) {
      this.quickStart.hidden = true;
      this.pane.hidden = false;
    }

    const cached = this.cache.get(normalized);
    if (cached && cached.complete) {
      this.applyImage(cached, caption);
      return;
    }

    const img = new Image();
    img.decoding = 'async';
    img.loading = 'eager';
    img.src = normalized;
    this.inflight = img;

    img.onload = () => {
      this.cache.set(normalized, img);
      if (this.inflight !== img) return;
      this.applyImage(img, caption);
    };
  }

  private hide(): void {
    this.inflight = null;
    if (!this.pane.hidden) {
      this.pane.hidden = true;
      this.pane.classList.remove('fig-preview--loaded');
      this.img.removeAttribute('src');
      this.caption.textContent = '';
      this.quickStart.hidden = false;
    }
  }

  private applyImage(img: HTMLImageElement, caption: string): void {
    this.img.src = img.src;
    this.caption.textContent = caption;
    this.pane.classList.add('fig-preview--loaded');
  }

  private preloadFirstN(count: number): void {
    const cards = Array.from(this.listRoot.querySelectorAll('.preset-card')).slice(0, count) as HTMLElement[];
    cards.forEach((card) => {
      const src = card.getAttribute('data-preview-img');
      if (!src) return;
      const normalized = this.normalizeSrc(src);
      if (this.cache.has(normalized)) return;
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = normalized;
      this.cache.set(normalized, img);
    });
  }

  public refresh(count = 8): void {
    this.preloadFirstN(count);
  }

  private normalizeSrc(src: string): string {
    if (!src) return src;
    if (/^(?:https?:|data:|blob:|\.)/.test(src) || src.startsWith('/')) {
      return src;
    }
    return `./${src}`;
  }

  public disable(): void {
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    }
    if (this.restoreTimer) {
      clearTimeout(this.restoreTimer);
      this.restoreTimer = null;
    }
    this.inflight = null;
    this.hide();
  }
}
