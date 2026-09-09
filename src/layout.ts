const storageKey = 'passforge.expanded';

export function createLayoutStore(storage: Storage | null) {
  return {
    read(): boolean {
      try {
        return storage?.getItem(storageKey) === 'true';
      } catch {
        return false;
      }
    },
    write(expanded: boolean): void {
      try {
        storage?.setItem(storageKey, String(expanded));
      } catch {
        // The layout remains usable without persistent storage.
      }
    },
  };
}
