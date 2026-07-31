export interface PasswordOptions {
  includeDigits: boolean;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeSpecial: boolean;
  excludeSimilar: boolean;
  passwordLength: number;
  numberOfPasswords: number;
}

export type ValidationError =
  | 'validationAtLeastOne'
  | 'validationLength'
  | 'validationCount';

const DIGITS = '0123456789';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SPECIAL = '!@#$%^&*()-_=+[]{};:,.?/';
const SIMILAR = 'il1Lo0O';

function stripSimilar(characters: string): string {
  return characters
    .split('')
    .filter((character) => !SIMILAR.includes(character))
    .join('');
}

function randomIndex(max: number): number {
  const array = new Uint32Array(1);
  const limit = 0xffffffff - (0xffffffff % max);
  let randomValue = 0;

  do {
    crypto.getRandomValues(array);
    randomValue = array[0];
  } while (randomValue >= limit);

  return randomValue % max;
}

export function buildAlphabet(options: PasswordOptions): string {
  let alphabet = '';

  if (options.includeDigits) {
    alphabet += DIGITS;
  }
  if (options.includeLowercase) {
    alphabet += LOWERCASE;
  }
  if (options.includeUppercase) {
    alphabet += UPPERCASE;
  }
  if (options.includeSpecial) {
    alphabet += SPECIAL;
  }

  if (options.excludeSimilar) {
    alphabet = stripSimilar(alphabet);
  }

  return alphabet;
}

export function validateOptions(options: PasswordOptions): ValidationError[] {
  const errors: ValidationError[] = [];

  const hasSet =
    options.includeDigits ||
    options.includeLowercase ||
    options.includeUppercase ||
    options.includeSpecial;

  if (!hasSet) {
    errors.push('validationAtLeastOne');
  }

  if (!Number.isInteger(options.passwordLength) || options.passwordLength < 1) {
    errors.push('validationLength');
  }

  if (!Number.isInteger(options.numberOfPasswords) || options.numberOfPasswords < 1) {
    errors.push('validationCount');
  }

  return errors;
}

export function generatePassword(options: PasswordOptions, alphabet: string): string {
  const characters = new Array<string>(options.passwordLength);

  for (let i = 0; i < options.passwordLength; i += 1) {
    const index = randomIndex(alphabet.length);
    characters[i] = alphabet[index];
  }

  return characters.join('');
}

export function generatePasswords(options: PasswordOptions): string[] {
  const errors = validateOptions(options);
  if (errors.length > 0) {
    throw new Error('INVALID_OPTIONS');
  }

  const alphabet = buildAlphabet(options);
  if (alphabet.length === 0) {
    throw new Error('EMPTY_ALPHABET');
  }

  return Array.from({ length: options.numberOfPasswords }, () =>
    generatePassword(options, alphabet)
  );
}
