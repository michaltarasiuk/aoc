import {strictEqual} from 'node:assert';

import {assert} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {omit} from 'lib/object.js';
import {isKeyOf} from 'lib/predicate.js';

const lines = await getInputLines({year: 2024, day: 7});

const Operators = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
  '||': (a, b) => Number(String(a) + String(b)),
} satisfies Record<string, (a: number, b: number) => number>;

function* permuteOperators(
  arrayLength: number,
  ...operators: string[]
): Generator<string[]> {
  if (arrayLength === 0) {
    yield [];
    return;
  }
  for (const op of operators) {
    for (const arr of permuteOperators(arrayLength - 1, ...operators)) {
      yield [op, ...arr];
    }
  }
}
function evaluateLeftToRight(
  [initialValue, ...operands]: number[],
  operators: string[]
) {
  return operands.reduce((acc, operand, i) => {
    assert(isKeyOf(Operators, operators[i]));
    return Operators[operators[i]](acc, operand);
  }, initialValue);
}

const equations = lines.map(l => l.split(/:? /).map(Number));

const totalCalibration = equations.reduce((acc, [result, ...operands]) => {
  const operators = Object.keys(omit(Operators, '||'));
  const isValidEquation = permuteOperators(operands.length, ...operators).some(
    operators => result === evaluateLeftToRight(operands, operators)
  );
  return acc + (isValidEquation ? result : 0);
}, 0);
const totalCalibration2 = equations.reduce((acc, [result, ...operands]) => {
  const operators = Object.keys(Operators);
  const isValidEquation = permuteOperators(operands.length, ...operators).some(
    operators => result === evaluateLeftToRight(operands, operators)
  );
  return acc + (isValidEquation ? result : 0);
}, 0);

strictEqual(totalCalibration, 1545311493300, 'Part 1 failed');
strictEqual(totalCalibration2, 169122112716571, 'Part 2 failed');
