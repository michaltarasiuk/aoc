import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {isKeyof} from 'lib/is_keyof.js';

const input = await readInput({year: 2024, day: 7});

const Operators = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
  '||': (a, b) => Number(a + String(b)),
} satisfies Record<string, (a: number, b: number) => number>;

function* permuteOperators(
  arrayLength: number,
  operators = Object.keys(Operators) as (keyof typeof Operators)[]
): Generator<string[]> {
  if (arrayLength === 0) {
    yield [];
    return;
  }
  for (const op of operators) {
    for (const arr of permuteOperators(arrayLength - 1, operators)) {
      yield [op, ...arr];
    }
  }
}
function evaluateLeftToRight(
  [initialValue, ...operands]: number[],
  operators: string[]
) {
  return operands.reduce((acc, operand, i) => {
    assert(isKeyof(Operators, operators[i]));
    return Operators[operators[i]](acc, operand);
  }, initialValue);
}

const equations = input.split(/\n/).map(l => l.split(/:? /).map(Number));

const totalCalibration = equations.reduce((acc, [result, ...operands]) => {
  const isValidEquation = permuteOperators(operands.length, ['+', '*']).some(
    operators => result === evaluateLeftToRight(operands, operators)
  );
  return acc + (isValidEquation ? result : 0);
}, 0);

const totalCalibration2 = equations.reduce((acc, [result, ...operands]) => {
  const isValidEquation = permuteOperators(operands.length).some(
    operators => result === evaluateLeftToRight(operands, operators)
  );
  return acc + (isValidEquation ? result : 0);
}, 0);

assert.strictEqual(totalCalibration, 1545311493300, 'Part 1 failed');
assert.strictEqual(totalCalibration2, 169122112716571, 'Part 2 failed');
