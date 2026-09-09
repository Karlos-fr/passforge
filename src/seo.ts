import seoContent from './seo-content.json';
import { resolvePathLocale, type Locale } from './i18n';

const defaultOrigin = 'https://example.com';
const siteOrigin = normalizeOrigin(import.meta.env.VITE_SITE_ORIGIN || defaultOrigin);
const basePath = '/passforge/';

export async function updateSeoMetadata(locale: Locale, updateUrl = false): Promise<void> {
  const content = seoContent[locale];
  const canonical = canonicalUrl(locale);
  document.documentElement.lang = locale;
  document.title = content.title;
  setMeta('meta[name="description"]', content.description);
  setMeta('meta[property="og:title"]', content.title);
  setMeta('meta[property="og:description"]', content.description);
  setMeta('meta[property="og:url"]', canonical);
  setMeta('meta[property="og:image"]', `${siteOrigin}${basePath}icon-512.png`);
  setMeta('meta[property="og:locale"]', openGraphLocale(locale));
  setMeta('meta[name="twitter:title"]', content.title);
  setMeta('meta[name="twitter:description"]', content.description);
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', canonical);

  const structuredData = document.querySelector<HTMLScriptElement>('#structured-data');
  if (structuredData) {
    structuredData.textContent = JSON.stringify(structuredDataFor(locale, content.description));
  }

  if (updateUrl) {
    const nextPath = localePath(window.location.pathname, locale);
    window.history.replaceState(null, '', `${nextPath}${window.location.search}${window.location.hash}`);
  }
}

export function canonicalUrl(locale: Locale): string {
  return `${siteOrigin}${basePath}${locale === 'fr' ? '' : `${locale}/`}`;
}

function localePath(pathname: string, locale: Locale): string {
  const currentLocale = resolvePathLocale(pathname);
  const root = currentLocale
    ? pathname.slice(0, -`${currentLocale}/`.length)
    : pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${root}${locale === 'fr' ? '' : `${locale}/`}`;
}

function structuredDataFor(locale: Locale, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'PassForge',
    url: canonicalUrl(locale),
    description,
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Any',
    inLanguage: locale,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  };
}

function setMeta(selector: string, content: string): void {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
}

function normalizeOrigin(origin: string): string {
  return origin.trim().replace(/\/+$/, '');
}

function openGraphLocale(locale: Locale): string {
  return { fr: 'fr_FR', en: 'en_US', de: 'de_DE', it: 'it_IT', es: 'es_ES', pt: 'pt_PT' }[locale];
}
