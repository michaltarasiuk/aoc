import {getInput} from 'lib/input';
import {stringToCodePoints} from 'lib/string_to_code_points';

const input = await getInput({year: 2015, day: 11});

function isValidPassword(password: string) {
  return (
    containsValidChars(password) &&
    contains2NonOverlappingPairs(password) &&
    hasIncreasingStraightOf3Chars(password)
  );
}

function containsValidChars(s: string) {
  return /^[^iol]*$/.test(s) && /^[a-z]*$/.test(s);
}

function contains2NonOverlappingPairs(s: string) {
  return /.*(\w)\1.*(\w)\2/.test(s);
}

function hasIncreasingStraightOf3Chars(s: string) {
  return stringToCodePoints(s).some((_, i, codePoints) => {
    const [a, b, c] = codePoints.slice(i, i + 3);
    return b - a === 1 && c - b === 1;
  });
}

function findNewPassword(password: string) {
  let int = parseInt(password, 36);
  let newPassword = int.toString(36);

  do {
    int++;
    newPassword = int.toString(36);
  } while (!isValidPassword(newPassword));

  return newPassword;
}

const newPassword = findNewPassword(input);
const newPassword2 = findNewPassword(newPassword);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(newPassword).toBe('cqjxxyzz');
  });

  test('part 2', () => {
    expect(newPassword2).toBe('cqkaabcc');
  });
}
