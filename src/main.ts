import {
  Check,
  Copy,
  Maximize2,
  Minimize2,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  X,
  createIcons,
} from 'lucide';
import { generatePasswords, validateOptions, type PasswordOptions } from './generator';
import { dictionaries, readLocale, saveLocale, supportedLocales, type I18nKey, type Locale } from './i18n';
import { createLayoutStore } from './layout';
import { updateSeoMetadata } from './seo';
import { createThemeController, type ThemeMode } from './theme';
import './styles.css';

const DEFAULTS: PasswordOptions = {
  includeDigits: true,
  includeLowercase: true,
  includeUppercase: true,
  includeSpecial: true,
  excludeSimilar: false,
  passwordLength: 16,
  numberOfPasswords: 5,
};

const elements = {
  shell: required<HTMLElement>('.app-shell'),
  sidebar: required<HTMLElement>('.settings-sidebar'),
  form: required<HTMLFormElement>('#generatorForm'),
  locale: required<HTMLSelectElement>('#localeSelect'),
  theme: required<HTMLSelectElement>('#themeSelect'),
  digits: required<HTMLInputElement>('#digits'),
  lowercase: required<HTMLInputElement>('#lowercase'),
  uppercase: required<HTMLInputElement>('#uppercase'),
  specials: required<HTMLInputElement>('#specials'),
  excludeSimilar: required<HTMLInputElement>('#excludeSimilar'),
  length: required<HTMLInputElement>('#length'),
  count: required<HTMLInputElement>('#count'),
  generate: required<HTMLButtonElement>('#generateBtn'),
  reset: required<HTMLButtonElement>('#resetBtn'),
  copyAll: required<HTMLButtonElement>('#copyAllBtn'),
  list: required<HTMLUListElement>('#passwordList'),
  empty: required<HTMLElement>('#emptyState'),
  status: required<HTMLElement>('#status'),
  layout: required<HTMLButtonElement>('#layoutToggle'),
  openSettings: required<HTMLButtonElement>('#openSettings'),
  closeSettings: required<HTMLButtonElement>('#closeSettings'),
  backdrop: required<HTMLButtonElement>('#settingsBackdrop'),
};

const storage = getStorage();
const theme = createThemeController(document.documentElement, storage);
const layout = createLayoutStore(storage);
const state = {
  locale: readLocale(),
  passwords: [] as string[],
  expanded: layout.read(),
  statusTimer: 0,
};

function translate(key: I18nKey): string {
  return dictionaries[state.locale][key];
}

function applyLocaleUI(updateUrl = false): void {
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n as I18nKey | undefined;
    if (key) element.textContent = translate(key);
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-aria-label]').forEach((element) => {
    const key = element.dataset.i18nAriaLabel as I18nKey | undefined;
    if (key) {
      const label = translate(key);
      element.setAttribute('aria-label', label);
      element.setAttribute('title', label);
    }
  });

  elements.locale.value = state.locale;
  updateLayoutButton();
  void updateSeoMetadata(state.locale, updateUrl);
}

function collectOptions(): PasswordOptions {
  return {
    includeDigits: elements.digits.checked,
    includeLowercase: elements.lowercase.checked,
    includeUppercase: elements.uppercase.checked,
    includeSpecial: elements.specials.checked,
    excludeSimilar: elements.excludeSimilar.checked,
    passwordLength: Number(elements.length.value),
    numberOfPasswords: Number(elements.count.value),
  };
}

function updateGenerateAvailability(): void {
  elements.generate.disabled = validateOptions(collectOptions()).length > 0;
}

function renderPasswords(): void {
  elements.list.replaceChildren();
  elements.empty.hidden = state.passwords.length > 0;
  elements.copyAll.disabled = state.passwords.length === 0;

  state.passwords.forEach((password, index) => {
    const item = document.createElement('li');
    item.className = 'password-item';

    const position = document.createElement('span');
    position.className = 'password-index';
    position.textContent = String(index + 1).padStart(2, '0');

    const value = document.createElement('code');
    value.className = 'password-value';
    value.textContent = password;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'icon-button password-copy';
    button.setAttribute('aria-label', translate('copyButton'));
    button.setAttribute('title', translate('copyButton'));
    button.innerHTML = '<i data-lucide="copy"></i>';
    button.addEventListener('click', async () => {
      if (await copyText(password)) {
        button.innerHTML = '<i data-lucide="check"></i>';
        renderIcons();
        showStatus('copyOneSuccess');
        window.setTimeout(() => {
          button.innerHTML = '<i data-lucide="copy"></i>';
          renderIcons();
        }, 1200);
      } else {
        showStatus('copyFailure', true);
      }
    });

    item.append(position, value, button);
    elements.list.append(item);
  });
  renderIcons();
}

function generate(event: SubmitEvent): void {
  event.preventDefault();
  const options = collectOptions();
  const errors = validateOptions(options);
  if (errors.length > 0) {
    showStatus(errors[0], true);
    return;
  }

  state.passwords = generatePasswords(options);
  renderPasswords();
  showStatus('generatedSuccess');
  closeSettings();
}

function reset(): void {
  elements.digits.checked = DEFAULTS.includeDigits;
  elements.lowercase.checked = DEFAULTS.includeLowercase;
  elements.uppercase.checked = DEFAULTS.includeUppercase;
  elements.specials.checked = DEFAULTS.includeSpecial;
  elements.excludeSimilar.checked = DEFAULTS.excludeSimilar;
  elements.length.value = String(DEFAULTS.passwordLength);
  elements.count.value = String(DEFAULTS.numberOfPasswords);
  state.passwords = [];
  renderPasswords();
  updateGenerateAvailability();
}

function showStatus(key: I18nKey, error = false): void {
  window.clearTimeout(state.statusTimer);
  elements.status.textContent = translate(key);
  elements.status.classList.toggle('is-error', error);
  state.statusTimer = window.setTimeout(() => {
    elements.status.textContent = '';
    elements.status.classList.remove('is-error');
  }, 1800);
}

function updateLayoutButton(): void {
  elements.shell.classList.toggle('is-expanded', state.expanded);
  const key: I18nKey = state.expanded ? 'collapseApp' : 'expandApp';
  elements.layout.setAttribute('aria-label', translate(key));
  elements.layout.setAttribute('title', translate(key));
  elements.layout.innerHTML = `<i data-lucide="${state.expanded ? 'minimize-2' : 'maximize-2'}"></i>`;
  renderIcons();
}

function openSettings(): void {
  elements.shell.classList.add('settings-open');
  elements.sidebar.setAttribute('aria-hidden', 'false');
  elements.closeSettings.focus();
}

function closeSettings(): void {
  if (!elements.shell.classList.contains('settings-open')) return;
  elements.shell.classList.remove('settings-open');
  if (window.matchMedia('(max-width: 760px)').matches) {
    elements.sidebar.setAttribute('aria-hidden', 'true');
    elements.openSettings.focus();
  }
}

async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

function bindEvents(): void {
  elements.form.addEventListener('submit', generate);
  elements.reset.addEventListener('click', reset);
  [elements.digits, elements.lowercase, elements.uppercase, elements.specials, elements.excludeSimilar, elements.length, elements.count]
    .forEach((element) => element.addEventListener('input', updateGenerateAvailability));

  elements.locale.addEventListener('change', () => {
    const locale = supportedLocales.find((candidate) => candidate === elements.locale.value);
    if (!locale) return;
    state.locale = locale;
    saveLocale(locale);
    applyLocaleUI(true);
    renderPasswords();
  });

  elements.theme.addEventListener('change', () => {
    const value = elements.theme.value;
    if (value === 'system' || value === 'light' || value === 'dark') {
      theme.setMode(value as ThemeMode);
    }
  });

  elements.layout.addEventListener('click', () => {
    state.expanded = !state.expanded;
    layout.write(state.expanded);
    updateLayoutButton();
  });

  elements.copyAll.addEventListener('click', async () => {
    if (state.passwords.length === 0) return;
    const copied = await copyText(state.passwords.join('\n'));
    showStatus(copied ? 'copyAllSuccess' : 'copyFailure', !copied);
  });
  elements.openSettings.addEventListener('click', openSettings);
  elements.closeSettings.addEventListener('click', closeSettings);
  elements.backdrop.addEventListener('click', closeSettings);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeSettings();
  });

  const mobile = window.matchMedia('(max-width: 760px)');
  mobile.addEventListener('change', ({ matches }) => {
    elements.sidebar.setAttribute('aria-hidden', String(matches));
    if (!matches) elements.shell.classList.remove('settings-open');
  });
}

function renderIcons(): void {
  createIcons({
    icons: { Check, Copy, Maximize2, Minimize2, RotateCcw, ShieldCheck, SlidersHorizontal, Sparkles, X },
    attrs: { 'aria-hidden': 'true', 'stroke-width': 1.8 },
  });
}

function getStorage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function required<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing required element: ${selector}`);
  return element;
}

elements.theme.value = theme.getMode();
elements.shell.classList.toggle('is-expanded', state.expanded);
if (window.matchMedia('(max-width: 760px)').matches) {
  elements.sidebar.setAttribute('aria-hidden', 'true');
}
applyLocaleUI();
bindEvents();
reset();
renderIcons();
