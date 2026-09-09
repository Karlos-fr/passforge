const storageKey = 'passforge.theme';

export type ThemeMode = 'system' | 'light' | 'dark';

export function createThemeController(root: HTMLElement, storage: Storage | null) {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let mode = readMode(storage);

  const apply = () => {
    const resolved = mode === 'system' ? (media.matches ? 'dark' : 'light') : mode;
    root.dataset.themeMode = mode;
    root.dataset.theme = resolved;
  };

  media.addEventListener?.('change', () => {
    if (mode === 'system') apply();
  });
  apply();

  return {
    getMode: () => mode,
    setMode(nextMode: ThemeMode) {
      mode = nextMode;
      try {
        storage?.setItem(storageKey, mode);
      } catch {
        // The selected theme still applies for the current session.
      }
      apply();
    },
  };
}

function readMode(storage: Storage | null): ThemeMode {
  try {
    const value = storage?.getItem(storageKey);
    return value === 'light' || value === 'dark' || value === 'system' ? value : 'system';
  } catch {
    return 'system';
  }
}
