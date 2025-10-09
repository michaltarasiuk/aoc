import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2019, day: 2});

function runProgram([...ints]: number[], noun: number, verb: number) {
  ints[1] = noun;
  ints[2] = verb;
  for (let i = 0; i < ints.length; i += 4) {
    const opcode = ints[i];
    if (opcode === 99) {
      break;
    }
    const a = ints[ints[i + 1]];
    const b = ints[ints[i + 2]];
    const c = ints[i + 3];
    if (opcode === 1) {
      ints[c] = a + b;
    } else if (opcode === 2) {
      ints[c] = a * b;
    }
  }
  return ints[0];
}

const ints = input.split(',').map(Number);

assert.strictEqual(runProgram(ints, 12, 2), 3306701, 'Part 1 failed');

for (let i = 9; i < 99; i++) {
  for (let j = 9; j < 99; j++) {
    if (runProgram(ints, i, j) === 19690720) {
      assert.strictEqual(100 * i + j, 7621, 'Part 2 failed');
      break;
    }
  }
}
