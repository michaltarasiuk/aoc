import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {stringToCodePoints} from 'lib/string_to_code_points.js';

const input = await readInput({year: 2015, day: 11});

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
  let int = Number.parseInt(password, 36);
  let newPassword = int.toString(36);
  do {
    int++;
    newPassword = int.toString(36);
  } while (!isValidPassword(newPassword));
  return newPassword;
}

const newPassword = findNewPassword(input);
const newPassword2 = findNewPassword(newPassword);

assert.strictEqual(newPassword, 'cqjxxyzz', 'Part 1 failed');
assert.strictEqual(newPassword2, 'cqkaabcc', 'Part 2 failed');
