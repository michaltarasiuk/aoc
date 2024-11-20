import {getInput} from 'lib/input.js';
import {stringToCodePoints} from 'lib/string.js';

const input = await getInput({year: 2015, day: 11});

function hasIncreasingStraightOf3Chars(s: string) {
  return stringToCodePoints(s).some((_, i, codePoints) => {
    const [a, b, c] = codePoints.slice(i, i + 3);
    return b - a === 1 && c - b === 1;
  });
}
function isValidPassword(s: string) {
  const hasValidChars = /^[^iol]*$/.test(s) && /^[a-z]*$/.test(s);
  const has2NonOverlappingPairs = /.*(\w)\1.*(\w)\2/.test(s);
  return (
    hasValidChars && has2NonOverlappingPairs && hasIncreasingStraightOf3Chars(s)
  );
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
  test('part 1', () => expect(newPassword).toBe('cqjxxyzz'));
  test('part 2', () => expect(newPassword2).toBe('cqkaabcc'));
}
