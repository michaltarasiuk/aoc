import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2020, day: 8});

const instructions = input
  .split(/\n/)
  .map(l => l.split(/\s/))
  .map(([operation, argument]) => ({operation, argument: Number(argument)}));

const executedInstructions = new Set<number>();

let accumulator = 0;
let instructionPointer = 0;

while (true) {
  if (executedInstructions.has(instructionPointer)) {
    break;
  } else {
    executedInstructions.add(instructionPointer);
  }
  const {operation, argument} = instructions[instructionPointer];
  switch (operation) {
    case 'acc':
      accumulator += argument;
      instructionPointer++;
      break;
    case 'jmp':
      instructionPointer += argument;
      break;
    case 'nop':
      instructionPointer++;
      break;
  }
}

assert.strictEqual(accumulator, 1782, 'Part 1 failed');
