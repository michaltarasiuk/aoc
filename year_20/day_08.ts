import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2020, day: 8});

const instructions = input
  .split(/\n/)
  .map(l => l.split(/\s/))
  .map(([operation, arg]) => ({operation, arg: Number(arg)}));

const executed = new Set<number>();

let acc = 0;
let pointer = 0;
while (true) {
  if (executed.has(pointer)) {
    break;
  } else {
    executed.add(pointer);
  }
  const {operation, arg} = instructions[pointer];
  switch (operation) {
    case 'acc':
      acc += arg;
      pointer++;
      break;
    case 'jmp':
      pointer += arg;
      break;
    case 'nop':
      pointer++;
      break;
  }
}

assert.strictEqual(acc, 1782, 'Part 1 failed');
