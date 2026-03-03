import { getStorageItem, setStorageItem } from '../Utils/storage';

export const GA_ID = 'G-LB8CCKYGBT';
const GA_CONSENT_KEY = 'ga_consent';
const GA_CONSENT_LEGACY_KEYS = ['octo_ga_consent'];

function markGALoaded(): boolean {
  const flag = '__gaLoaded';
  if ((window as any)[flag]) {
    return false;
  }
  (window as any)[flag] = true;
  return true;
}

export function loadGA(): void {
  if (!GA_ID) return;
  if (!markGALoaded()) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  const dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer = dataLayer;

  function gtag(this: unknown, ..._args: unknown[]): void {
    dataLayer.push(arguments as unknown as any);
  }

  (window as any).gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
}

function persistConsent(value: string): void {
  setStorageItem(GA_CONSENT_KEY, value, { legacyKeys: GA_CONSENT_LEGACY_KEYS });
}

export function initConsent(): void {
  try {
    const bar = document.getElementById('cookieBar');
    if (!bar) return;
    const acceptBtn = document.getElementById('cookieAccept');
    const declineBtn = document.getElementById('cookieDecline');
    const stored = getStorageItem(GA_CONSENT_KEY, { legacyKeys: GA_CONSENT_LEGACY_KEYS });

    if (stored === 'accept') {
      loadGA();
    } else if (stored !== 'decline') {
      bar.classList.add('show');
    }

    acceptBtn?.addEventListener('click', () => {
      persistConsent('accept');
      bar.classList.remove('show');
      loadGA();
    });

    declineBtn?.addEventListener('click', () => {
      persistConsent('decline');
      bar.classList.remove('show');
    });
  } catch (error) {
    console.warn('Consent init failed', error);
  }
}
