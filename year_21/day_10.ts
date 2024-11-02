import {assert} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';
import {isDefined, isKeyOf} from 'lib/predicate.js';

const lines = await getInputLines({year: 2021, day: 10});

const SyntaxErrorPoints = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const AutocompletePoints = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
};

function analyzeLineSyntax(l: string) {
  const stack: string[] = [];

  for (const char of l) {
    switch (char) {
      case '(':
      case '[':
      case '{':
      case '<': {
        stack.push(char);
        break;
      }
      case ')':
      case ']':
      case '}':
      case '>': {
        const last = stack.pop();
        if (!isDefined(last) || !isMatchingPair(last, char)) {
          return {
            status: 'SYNTAX_ERROR',
            score: SyntaxErrorPoints[char],
          } as const;
        }
        break;
      }
    }
  }
  return {status: 'INCOMPLETE', stack} as const;
}
function isMatchingPair(open: string, close: string) {
  return (
    (open === '(' && close === ')') ||
    (open === '[' && close === ']') ||
    (open === '{' && close === '}') ||
    (open === '<' && close === '>')
  );
}

function calcAutocompleteScore(stack: string[]) {
  return stack.toReversed().reduce((acc, char) => {
    assert(isKeyOf(AutocompletePoints, char));
    return 5 * acc + AutocompletePoints[char];
  }, 0);
}

const parsedLines = lines.map(analyzeLineSyntax);

const totalSyntaxErrorScore = sum(
  ...parsedLines
    .filter(l => l.status === 'SYNTAX_ERROR')
    .map(({score}) => score)
);

const scores = parsedLines
  .filter(l => l.status === 'INCOMPLETE')
  .map(({stack}) => calcAutocompleteScore(stack))
  .toSorted((a, b) => a - b);
const middleScore = scores.at(Math.floor(scores.length / 2));

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(totalSyntaxErrorScore).toBe(323613);
  });

  test('part 2', () => {
    expect(middleScore).toBe(3103006161);
  });
}
