import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2021, day: 10});

const SyntaxErrorPoints = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

function calcSyntaxErrorScore(line: string) {
  const stack: string[] = [];

  for (const char of line) {
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
        if (!last || !isMatchingPair(last, char)) {
          return SyntaxErrorPoints[char];
        }
        break;
      }
    }
  }
  return 0;
}
function isMatchingPair(open: string, close: string) {
  return (
    (open === '(' && close === ')') ||
    (open === '[' && close === ']') ||
    (open === '{' && close === '}') ||
    (open === '<' && close === '>')
  );
}

const totalSyntaxErrorScore = sum(...lines.map(calcSyntaxErrorScore));

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(totalSyntaxErrorScore).toBe(323613);
  });
}
