export type Locale = 'fr' | 'en';

export type I18nKey =
  | 'kicker'
  | 'appTitle'
  | 'appTagline'
  | 'settingsTitle'
  | 'languageLabel'
  | 'charsetLegend'
  | 'includeDigits'
  | 'includeLowercase'
  | 'includeUppercase'
  | 'includeSpecial'
  | 'excludeSimilar'
  | 'passwordLengthLabel'
  | 'numberOfPasswordsLabel'
  | 'generateButton'
  | 'resetButton'
  | 'resultsTitle'
  | 'copyAllButton'
  | 'emptyState'
  | 'copyButton'
  | 'copySuccess'
  | 'copyAllSuccess'
  | 'copyFailure'
  | 'validationAtLeastOne'
  | 'validationLength'
  | 'validationCount'
  | 'copyOneSuccess';

export interface I18nDict {
  [key: string]: string;
}

export const dictionaries: Record<Locale, I18nDict> = {
  fr: {
    kicker: 'PassForge',
    appTitle: 'Forge à mots de passe',
    appTagline: 'Générez des secrets uniques avec une interface propre et maîtrisée.',
    settingsTitle: 'Configuration',
    languageLabel: 'Langue',
    charsetLegend: 'Jeux de caractères',
    includeDigits: 'Inclure les chiffres',
    includeLowercase: 'Inclure les minuscules',
    includeUppercase: 'Inclure les majuscules',
    includeSpecial: 'Inclure les caractères spéciaux',
    excludeSimilar: 'Exclure les caractères similaires',
    passwordLengthLabel: 'Longueur du mot de passe',
    numberOfPasswordsLabel: 'Nombre de mots de passe',
    generateButton: 'Générer',
    resetButton: 'Réinitialiser',
    resultsTitle: 'Mots de passe générés',
    copyAllButton: 'Tout copier',
    emptyState: 'Aucun mot de passe généré.',
    copyButton: 'Copier',
    copySuccess: 'Copié avec succès.',
    copyAllSuccess: 'Lot copié dans le presse-papiers.',
    copyFailure: 'Impossible de copier.',
    validationAtLeastOne: 'Activez au moins un type de caractères.',
    validationLength: 'La longueur doit être >= 1.',
    validationCount: 'Le nombre doit être >= 1.',
    copyOneSuccess: 'Mot de passe copié.'
  },
  en: {
    kicker: 'PassForge',
    appTitle: 'Password Forge',
    appTagline: 'Generate unique secrets with a clean, controlled flow.',
    settingsTitle: 'Configuration',
    languageLabel: 'Language',
    charsetLegend: 'Character set',
    includeDigits: 'Include digits',
    includeLowercase: 'Include lowercase letters',
    includeUppercase: 'Include uppercase letters',
    includeSpecial: 'Include special characters',
    excludeSimilar: 'Exclude similar characters',
    passwordLengthLabel: 'Password length',
    numberOfPasswordsLabel: 'Number of passwords',
    generateButton: 'Generate',
    resetButton: 'Reset',
    resultsTitle: 'Generated passwords',
    copyAllButton: 'Copy all',
    emptyState: 'No passwords yet.',
    copyButton: 'Copy',
    copySuccess: 'Copied to clipboard.',
    copyAllSuccess: 'All passwords copied to clipboard.',
    copyFailure: 'Unable to copy.',
    validationAtLeastOne: 'Enable at least one character type.',
    validationLength: 'Password length must be >= 1.',
    validationCount: 'Password count must be >= 1.',
    copyOneSuccess: 'Password copied.'
  }
};

export function resolveLocaleFromBrowser(): Locale {
  const candidates = (navigator.languages && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language]) as string[];

  const first = candidates
    .map((value) => (value || '').toLowerCase())
    .find((value) => value.startsWith('fr') || value.startsWith('en'));

  if (!first) {
    return 'fr';
  }

  return first.startsWith('en') ? 'en' : 'fr';
}

export function saveLocale(locale: Locale): void {
  localStorage.setItem('passforge-locale', locale);
}

export function readLocale(): Locale {
  const saved = localStorage.getItem('passforge-locale') as Locale | null;
  if (saved === 'en' || saved === 'fr') {
    return saved;
  }
  return resolveLocaleFromBrowser();
}
