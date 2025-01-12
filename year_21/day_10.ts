import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';
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

const totalSyntaxErrorScore = parsedLines
  .flatMap(l => (l.status === 'SYNTAX_ERROR' ? [l.score] : []))
  .reduce((acc, score) => acc + score, 0);

const scores = parsedLines
  .flatMap(l =>
    l.status === 'INCOMPLETE' ? [calcAutocompleteScore(l.stack)] : []
  )
  .sort((a, b) => a - b);
const middleScore = scores.at(Math.floor(scores.length / 2));

assert.strictEqual(totalSyntaxErrorScore, 323613, 'Part 1 failed');
assert.strictEqual(middleScore, 3103006161, 'Part 2 failed');
