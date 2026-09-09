import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const seo = JSON.parse(await readFile(resolve(root, 'src/seo-content.json'), 'utf8'));
const defaultOrigin = 'https://example.com';
const origin = normalizeOrigin(process.env.VITE_SITE_ORIGIN || defaultOrigin);
const source = (await readFile(resolve(dist, 'index.html'), 'utf8')).replaceAll(defaultOrigin, origin);
const basePath = '/passforge/';
const ogLocales = { fr: 'fr_FR', en: 'en_US', de: 'de_DE', it: 'it_IT', es: 'es_ES', pt: 'pt_PT' };

for (const [locale, content] of Object.entries(seo)) {
  const url = `${origin}${basePath}${locale === 'fr' ? '' : `${locale}/`}`;
  let html = source
    .replace(/<html lang="[^"]+">/, `<html lang="${locale}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(content.title)}</title>`);

  html = replaceAttribute(html, 'description', 'content', content.description);
  html = replaceAttribute(html, 'canonical', 'href', url);
  html = replaceAttribute(html, 'og-title', 'content', content.title);
  html = replaceAttribute(html, 'og-description', 'content', content.description);
  html = replaceAttribute(html, 'og-url', 'content', url);
  html = replaceAttribute(html, 'og-locale', 'content', ogLocales[locale]);
  html = replaceAttribute(html, 'twitter-title', 'content', content.title);
  html = replaceAttribute(html, 'twitter-description', 'content', content.description);
  html = html.replace(
    /(<script id="structured-data" type="application\/ld\+json">).*?(<\/script>)/,
    `$1${JSON.stringify(structuredData(locale, content.description, url))}$2`,
  );

  if (locale === 'fr') {
    await writeFile(resolve(dist, 'index.html'), html);
  } else {
    const localeDirectory = resolve(dist, locale);
    await mkdir(localeDirectory, { recursive: true });
    await writeFile(resolve(localeDirectory, 'index.html'), html);
  }
}

for (const filename of ['robots.txt', 'sitemap.xml']) {
  const path = resolve(dist, filename);
  await writeFile(path, (await readFile(path, 'utf8')).replaceAll(defaultOrigin, origin));
}

function replaceAttribute(html, tag, attribute, value) {
  const pattern = new RegExp(`(<[^>]+data-seo="${tag}"[^>]*\\s${attribute}=")[^"]*(")`);
  return html.replace(pattern, `$1${escapeHtml(value)}$2`);
}

function structuredData(locale, description, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'PassForge',
    url,
    description,
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Any',
    inLanguage: locale,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  };
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function normalizeOrigin(value) {
  const normalized = value.trim().replace(/\/+$/, '');
  const url = new URL(normalized);
  if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/') {
    throw new Error('VITE_SITE_ORIGIN must be an HTTP(S) origin without a path.');
  }
  return normalized;
}
