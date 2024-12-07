import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2024, day: 7});

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
  return operands.reduce(
    (acc, operand, i) => eval(acc + operators[i] + operand),
    initialValue
  );
}

const equations = lines.map(l => l.split(/:? /).map(Number));
const totalCalibration = equations.reduce((acc, [result, ...operands]) => {
  const isValidEquation = permuteOperators(operands.length, '+', '*').some(
    operators => result === evaluateLeftToRight(operands, operators)
  );
  return acc + (isValidEquation ? result : 0);
}, 0);

assert.strictEqual(totalCalibration, 1545311493300, 'Part 1 failed');
