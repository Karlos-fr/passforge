import type { PasswordOptions } from './generator';

const storageKey = 'passforge.options';

export function createOptionsStore(storage: Storage | null, defaults: PasswordOptions) {
  return {
    read(): PasswordOptions {
      try {
        const value = JSON.parse(storage?.getItem(storageKey) ?? 'null') as Partial<PasswordOptions> | null;
        if (!value || typeof value !== 'object') return { ...defaults };

        return {
          includeDigits: booleanOr(value.includeDigits, defaults.includeDigits),
          includeLowercase: booleanOr(value.includeLowercase, defaults.includeLowercase),
          includeUppercase: booleanOr(value.includeUppercase, defaults.includeUppercase),
          includeSpecial: booleanOr(value.includeSpecial, defaults.includeSpecial),
          excludeSimilar: booleanOr(value.excludeSimilar, defaults.excludeSimilar),
          passwordLength: integerInRange(value.passwordLength, 1, 128, defaults.passwordLength),
          numberOfPasswords: integerInRange(value.numberOfPasswords, 1, 50, defaults.numberOfPasswords),
        };
      } catch {
        return { ...defaults };
      }
    },
    write(options: PasswordOptions): void {
      try {
        storage?.setItem(storageKey, JSON.stringify(options));
      } catch {
        // Configuration remains active for the current session.
      }
    },
  };
}

function booleanOr(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

function integerInRange(value: unknown, minimum: number, maximum: number, fallback: number): number {
  return typeof value === 'number' && Number.isInteger(value) && value >= minimum && value <= maximum
    ? value
    : fallback;
}
