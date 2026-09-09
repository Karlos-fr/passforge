export const supportedLocales = ['fr', 'en', 'de', 'it', 'es', 'pt'] as const;
export type Locale = (typeof supportedLocales)[number];

const storageKey = 'passforge.locale';

export type I18nKey =
  | 'appTitle' | 'settingsTitle' | 'languageLabel' | 'themeLabel' | 'themeSystem'
  | 'themeLight' | 'themeDark' | 'charsetLegend' | 'includeDigits' | 'includeLowercase'
  | 'includeUppercase' | 'includeSpecial' | 'excludeSimilar' | 'passwordLengthLabel'
  | 'numberOfPasswordsLabel' | 'generateButton' | 'resetButton' | 'resultsTitle'
  | 'secureGeneration' | 'copyAllButton' | 'emptyState' | 'copyButton' | 'generatedSuccess'
  | 'copyAllSuccess' | 'copyFailure' | 'validationAtLeastOne' | 'validationLength'
  | 'validationCount' | 'copyOneSuccess' | 'expandApp' | 'collapseApp'
  | 'openSettings' | 'closeSettings';

type Dictionary = Record<I18nKey, string>;

export const dictionaries: Record<Locale, Dictionary> = {
  fr: {
    appTitle: 'PassForge', settingsTitle: 'Configuration', languageLabel: 'Langue', themeLabel: 'Thème',
    themeSystem: 'Système', themeLight: 'Clair', themeDark: 'Sombre', charsetLegend: 'Jeux de caractères',
    includeDigits: 'Chiffres', includeLowercase: 'Minuscules', includeUppercase: 'Majuscules',
    includeSpecial: 'Caractères spéciaux', excludeSimilar: 'Exclure les caractères similaires',
    passwordLengthLabel: 'Longueur', numberOfPasswordsLabel: 'Quantité', generateButton: 'Générer',
    resetButton: 'Réinitialiser', resultsTitle: 'Mots de passe générés', secureGeneration: 'Génération locale sécurisée',
    copyAllButton: 'Tout copier', emptyState: 'Configurez vos options puis générez vos mots de passe.',
    copyButton: 'Copier', generatedSuccess: 'Mots de passe générés.', copyAllSuccess: 'Tous les mots de passe sont copiés.',
    copyFailure: 'Impossible de copier.', validationAtLeastOne: 'Activez au moins un type de caractères.',
    validationLength: 'La longueur doit être comprise entre 1 et 128.', validationCount: 'La quantité doit être comprise entre 1 et 50.',
    copyOneSuccess: 'Mot de passe copié.', expandApp: 'Agrandir l’application', collapseApp: 'Réduire l’application',
    openSettings: 'Ouvrir la configuration', closeSettings: 'Fermer la configuration',
  },
  en: {
    appTitle: 'PassForge', settingsTitle: 'Configuration', languageLabel: 'Language', themeLabel: 'Theme',
    themeSystem: 'System', themeLight: 'Light', themeDark: 'Dark', charsetLegend: 'Character sets',
    includeDigits: 'Digits', includeLowercase: 'Lowercase', includeUppercase: 'Uppercase',
    includeSpecial: 'Special characters', excludeSimilar: 'Exclude similar characters',
    passwordLengthLabel: 'Length', numberOfPasswordsLabel: 'Quantity', generateButton: 'Generate',
    resetButton: 'Reset', resultsTitle: 'Generated passwords', secureGeneration: 'Secure local generation',
    copyAllButton: 'Copy all', emptyState: 'Choose your options, then generate your passwords.',
    copyButton: 'Copy', generatedSuccess: 'Passwords generated.', copyAllSuccess: 'All passwords copied.',
    copyFailure: 'Unable to copy.', validationAtLeastOne: 'Enable at least one character type.',
    validationLength: 'Length must be between 1 and 128.', validationCount: 'Quantity must be between 1 and 50.',
    copyOneSuccess: 'Password copied.', expandApp: 'Expand application', collapseApp: 'Collapse application',
    openSettings: 'Open configuration', closeSettings: 'Close configuration',
  },
  de: {
    appTitle: 'PassForge', settingsTitle: 'Konfiguration', languageLabel: 'Sprache', themeLabel: 'Design',
    themeSystem: 'System', themeLight: 'Hell', themeDark: 'Dunkel', charsetLegend: 'Zeichensätze',
    includeDigits: 'Ziffern', includeLowercase: 'Kleinbuchstaben', includeUppercase: 'Großbuchstaben',
    includeSpecial: 'Sonderzeichen', excludeSimilar: 'Ähnliche Zeichen ausschließen',
    passwordLengthLabel: 'Länge', numberOfPasswordsLabel: 'Anzahl', generateButton: 'Generieren',
    resetButton: 'Zurücksetzen', resultsTitle: 'Generierte Passwörter', secureGeneration: 'Sichere lokale Generierung',
    copyAllButton: 'Alle kopieren', emptyState: 'Optionen wählen und Passwörter generieren.',
    copyButton: 'Kopieren', generatedSuccess: 'Passwörter generiert.', copyAllSuccess: 'Alle Passwörter kopiert.',
    copyFailure: 'Kopieren nicht möglich.', validationAtLeastOne: 'Mindestens einen Zeichentyp aktivieren.',
    validationLength: 'Die Länge muss zwischen 1 und 128 liegen.', validationCount: 'Die Anzahl muss zwischen 1 und 50 liegen.',
    copyOneSuccess: 'Passwort kopiert.', expandApp: 'Anwendung vergrößern', collapseApp: 'Anwendung verkleinern',
    openSettings: 'Konfiguration öffnen', closeSettings: 'Konfiguration schließen',
  },
  it: {
    appTitle: 'PassForge', settingsTitle: 'Configurazione', languageLabel: 'Lingua', themeLabel: 'Tema',
    themeSystem: 'Sistema', themeLight: 'Chiaro', themeDark: 'Scuro', charsetLegend: 'Set di caratteri',
    includeDigits: 'Numeri', includeLowercase: 'Minuscole', includeUppercase: 'Maiuscole',
    includeSpecial: 'Caratteri speciali', excludeSimilar: 'Escludi caratteri simili',
    passwordLengthLabel: 'Lunghezza', numberOfPasswordsLabel: 'Quantità', generateButton: 'Genera',
    resetButton: 'Reimposta', resultsTitle: 'Password generate', secureGeneration: 'Generazione locale sicura',
    copyAllButton: 'Copia tutto', emptyState: 'Scegli le opzioni e genera le password.',
    copyButton: 'Copia', generatedSuccess: 'Password generate.', copyAllSuccess: 'Tutte le password sono state copiate.',
    copyFailure: 'Impossibile copiare.', validationAtLeastOne: 'Attiva almeno un tipo di carattere.',
    validationLength: 'La lunghezza deve essere tra 1 e 128.', validationCount: 'La quantità deve essere tra 1 e 50.',
    copyOneSuccess: 'Password copiata.', expandApp: 'Ingrandisci applicazione', collapseApp: 'Riduci applicazione',
    openSettings: 'Apri configurazione', closeSettings: 'Chiudi configurazione',
  },
  es: {
    appTitle: 'PassForge', settingsTitle: 'Configuración', languageLabel: 'Idioma', themeLabel: 'Tema',
    themeSystem: 'Sistema', themeLight: 'Claro', themeDark: 'Oscuro', charsetLegend: 'Conjuntos de caracteres',
    includeDigits: 'Números', includeLowercase: 'Minúsculas', includeUppercase: 'Mayúsculas',
    includeSpecial: 'Caracteres especiales', excludeSimilar: 'Excluir caracteres similares',
    passwordLengthLabel: 'Longitud', numberOfPasswordsLabel: 'Cantidad', generateButton: 'Generar',
    resetButton: 'Restablecer', resultsTitle: 'Contraseñas generadas', secureGeneration: 'Generación local segura',
    copyAllButton: 'Copiar todo', emptyState: 'Elige las opciones y genera tus contraseñas.',
    copyButton: 'Copiar', generatedSuccess: 'Contraseñas generadas.', copyAllSuccess: 'Todas las contraseñas copiadas.',
    copyFailure: 'No se pudo copiar.', validationAtLeastOne: 'Activa al menos un tipo de carácter.',
    validationLength: 'La longitud debe estar entre 1 y 128.', validationCount: 'La cantidad debe estar entre 1 y 50.',
    copyOneSuccess: 'Contraseña copiada.', expandApp: 'Ampliar aplicación', collapseApp: 'Reducir aplicación',
    openSettings: 'Abrir configuración', closeSettings: 'Cerrar configuración',
  },
  pt: {
    appTitle: 'PassForge', settingsTitle: 'Configuração', languageLabel: 'Idioma', themeLabel: 'Tema',
    themeSystem: 'Sistema', themeLight: 'Claro', themeDark: 'Escuro', charsetLegend: 'Conjuntos de caracteres',
    includeDigits: 'Números', includeLowercase: 'Minúsculas', includeUppercase: 'Maiúsculas',
    includeSpecial: 'Caracteres especiais', excludeSimilar: 'Excluir caracteres semelhantes',
    passwordLengthLabel: 'Comprimento', numberOfPasswordsLabel: 'Quantidade', generateButton: 'Gerar',
    resetButton: 'Repor', resultsTitle: 'Palavras-passe geradas', secureGeneration: 'Geração local segura',
    copyAllButton: 'Copiar tudo', emptyState: 'Escolha as opções e gere as palavras-passe.',
    copyButton: 'Copiar', generatedSuccess: 'Palavras-passe geradas.', copyAllSuccess: 'Todas as palavras-passe foram copiadas.',
    copyFailure: 'Não foi possível copiar.', validationAtLeastOne: 'Ative pelo menos um tipo de carácter.',
    validationLength: 'O comprimento deve estar entre 1 e 128.', validationCount: 'A quantidade deve estar entre 1 e 50.',
    copyOneSuccess: 'Palavra-passe copiada.', expandApp: 'Expandir aplicação', collapseApp: 'Reduzir aplicação',
    openSettings: 'Abrir configuração', closeSettings: 'Fechar configuração',
  },
};

export function resolvePathLocale(pathname: string): Locale | null {
  const candidate = pathname.split('/').filter(Boolean).at(-1);
  return supportedLocales.find((locale) => locale !== 'fr' && locale === candidate) ?? null;
}

export function readLocale(): Locale {
  const pathLocale = resolvePathLocale(window.location.pathname);
  if (pathLocale) return pathLocale;

  try {
    const saved = localStorage.getItem(storageKey);
    if (isLocale(saved)) return saved;
  } catch {
    // Browser language detection remains available without storage.
  }

  for (const language of navigator.languages ?? [navigator.language]) {
    const locale = language.toLowerCase().split('-')[0];
    if (isLocale(locale)) return locale;
  }
  return 'fr';
}

export function saveLocale(locale: Locale): void {
  try {
    localStorage.setItem(storageKey, locale);
  } catch {
    // The selected language still applies for the current session.
  }
}

function isLocale(value: string | null): value is Locale {
  return supportedLocales.some((locale) => locale === value);
}
