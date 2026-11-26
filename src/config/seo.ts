export const CANONICAL_ORIGIN = 'https://correosopgame.bastelar.com';
export const CANONICAL_URL = `${CANONICAL_ORIGIN}/`;
export const DEFAULT_LOCALE = 'es';

export function getCanonicalUrl(): string {
  return CANONICAL_URL;
}

function upsertHeadLink(rel: string, href: string, hreflang?: string): void {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (hreflang) {
      el.hreflang = hreflang;
    }
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertMetaProperty(property: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.content = content;
}

export function syncHeadSeo(): void {
  if (typeof document === 'undefined') return;
  const canonical = getCanonicalUrl();
  document.documentElement.lang = DEFAULT_LOCALE;
  upsertHeadLink('canonical', canonical);
  upsertHeadLink('alternate', canonical, 'es');
  upsertHeadLink('alternate', canonical, 'x-default');
  upsertMetaProperty('og:url', canonical);
}
