import {
  dictionaries,
  readLocale,
  saveLocale,
  type Locale,
} from './i18n';
import {
  type PasswordOptions,
  validateOptions,
  generatePasswords,
} from './generator';

type UiState = {
  locale: Locale;
};

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
  app: document.querySelector<HTMLSelectElement>('#localeSelect'),
  form: document.querySelector<HTMLFormElement>('#generatorForm'),
  digits: document.querySelector<HTMLInputElement>('#digits'),
  lowercase: document.querySelector<HTMLInputElement>('#lowercase'),
  uppercase: document.querySelector<HTMLInputElement>('#uppercase'),
  specials: document.querySelector<HTMLInputElement>('#specials'),
  excludeSimilar: document.querySelector<HTMLInputElement>('#excludeSimilar'),
  length: document.querySelector<HTMLInputElement>('#length'),
  count: document.querySelector<HTMLInputElement>('#count'),
  generateButton: document.querySelector<HTMLButtonElement>('#generateBtn'),
  resetButton: document.querySelector<HTMLButtonElement>('#resetBtn'),
  copyAllButton: document.querySelector<HTMLButtonElement>('#copyAllBtn'),
  list: document.querySelector<HTMLUListElement>('#passwordList'),
  emptyState: document.querySelector<HTMLParagraphElement>('#emptyState'),
  status: document.querySelector<HTMLElement>('#status'),
};

const state: UiState = {
  locale: readLocale(),
};

const appState = {
  lastGenerated: [] as string[],
};

if (elements.app) {
  elements.app.value = state.locale;
}

function translate(key: string): string {
  return dictionaries[state.locale][key] ?? dictionaries.fr[key] ?? key;
}

function applyLocaleUI(): void {
  document
    .querySelectorAll<HTMLElement>('[data-i18n]')
    .forEach((element) => {
      const key = element.getAttribute('data-i18n');
      if (!key) {
        return;
      }
      const value = translate(key);
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.setAttribute('placeholder', value);
        return;
      }
      if (element.tagName === 'BUTTON') {
        element.textContent = value;
        return;
      }
      element.textContent = value;
    });

  document.documentElement.lang = state.locale;
  document.title = translate('appTitle');
}

function showStatus(messageKey: string, asError = false): void {
  if (!elements.status) {
    return;
  }
  elements.status.textContent = translate(messageKey);
  elements.status.className = asError ? 'error' : '';
  if (!asError) {
    window.setTimeout(() => {
      if (elements.status) {
        elements.status.textContent = '';
        elements.status.className = '';
      }
    }, 1400);
  }
}

function collectOptions(): PasswordOptions {
  return {
    includeDigits: elements.digits?.checked ?? DEFAULTS.includeDigits,
    includeLowercase: elements.lowercase?.checked ?? DEFAULTS.includeLowercase,
    includeUppercase: elements.uppercase?.checked ?? DEFAULTS.includeUppercase,
    includeSpecial: elements.specials?.checked ?? DEFAULTS.includeSpecial,
    excludeSimilar: elements.excludeSimilar?.checked ?? DEFAULTS.excludeSimilar,
    passwordLength: Number(elements.length?.value ?? DEFAULTS.passwordLength),
    numberOfPasswords: Number(elements.count?.value ?? DEFAULTS.numberOfPasswords),
  };
}

function updateGenerateAvailability(): void {
  if (!elements.generateButton) {
    return;
  }

  const options = collectOptions();
  const errors = validateOptions(options);
  elements.generateButton.disabled = errors.length > 0;
}

function createPasswordItem(password: string, index: number): HTMLLIElement {
  const li = document.createElement('li');
  li.className = 'password-item';

  const value = document.createElement('code');
  value.className = 'password-value';
  value.textContent = `${index + 1}. ${password}`;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'password-copy';
  button.textContent = translate('copyButton');
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(password);
      showStatus('copyOneSuccess');
    } catch {
      showStatus('copyFailure', true);
    }
  });

  li.append(value, button);
  return li;
}

function renderPasswords(passwords: string[]): void {
  if (!elements.list || !elements.emptyState) {
    return;
  }

  elements.list.textContent = '';

  if (passwords.length === 0) {
    elements.emptyState.hidden = false;
    appState.lastGenerated = [];
    return;
  }

  appState.lastGenerated = passwords;
  passwords.forEach((password, index) => {
    elements.list.append(createPasswordItem(password, index));
  });

  elements.emptyState.hidden = true;
  showStatus('copySuccess');
}

function onGenerate(event: Event): void {
  event.preventDefault();
  const options = collectOptions();
  const errors = validateOptions(options);

  if (errors.length > 0) {
    const first = errors[0];
    showStatus(first, true);
    return;
  }

  try {
    const passwords = generatePasswords(options);
    renderPasswords(passwords);
  } catch {
    showStatus('copyFailure', true);
  }
}

function resetToDefaults(): void {
  if (elements.digits) elements.digits.checked = DEFAULTS.includeDigits;
  if (elements.lowercase) elements.lowercase.checked = DEFAULTS.includeLowercase;
  if (elements.uppercase) elements.uppercase.checked = DEFAULTS.includeUppercase;
  if (elements.specials) elements.specials.checked = DEFAULTS.includeSpecial;
  if (elements.excludeSimilar)
    elements.excludeSimilar.checked = DEFAULTS.excludeSimilar;
  if (elements.length) elements.length.value = String(DEFAULTS.passwordLength);
  if (elements.count) elements.count.value = String(DEFAULTS.numberOfPasswords);

  renderPasswords([]);
  updateGenerateAvailability();
}

function bindEvents(): void {
  elements.form?.addEventListener('submit', onGenerate);
  elements.resetButton?.addEventListener('click', resetToDefaults);

  [
    elements.digits,
    elements.lowercase,
    elements.uppercase,
    elements.specials,
    elements.excludeSimilar,
    elements.length,
    elements.count,
  ].forEach((element) => {
    element?.addEventListener('input', updateGenerateAvailability);
  });

  elements.app?.addEventListener('change', () => {
    const value = elements.app?.value;
    if (value === 'fr' || value === 'en') {
      state.locale = value;
      saveLocale(state.locale);
      applyLocaleUI();
      renderPasswords(appState.lastGenerated);
      updateGenerateAvailability();
    }
  });

  elements.copyAllButton?.addEventListener('click', async () => {
    if (appState.lastGenerated.length === 0) {
      showStatus('emptyState', true);
      return;
    }

    try {
      await navigator.clipboard.writeText(appState.lastGenerated.join('\n'));
      showStatus('copyAllSuccess');
    } catch {
      showStatus('copyFailure', true);
    }
  });
}

function initializeForm(): void {
  if (elements.length) {
    elements.length.value = String(DEFAULTS.passwordLength);
  }

  if (elements.count) {
    elements.count.value = String(DEFAULTS.numberOfPasswords);
  }

  if (elements.digits) {
    elements.digits.checked = DEFAULTS.includeDigits;
  }

  if (elements.lowercase) {
    elements.lowercase.checked = DEFAULTS.includeLowercase;
  }

  if (elements.uppercase) {
    elements.uppercase.checked = DEFAULTS.includeUppercase;
  }

  if (elements.specials) {
    elements.specials.checked = DEFAULTS.includeSpecial;
  }
}

applyLocaleUI();
initializeForm();
bindEvents();
updateGenerateAvailability();
if (elements.emptyState) {
  elements.emptyState.hidden = false;
  elements.emptyState.textContent = translate('emptyState');
}
