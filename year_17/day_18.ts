import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';
import {raise} from '#lib/raise.js';

const input = await fetchInput({year: 2017, day: 18});

const instructionRe = /^(\w{3}) (\w)(?: (\S+))?$/;
const instructions = input.split(/\n/).map(l => {
  const [, operation, register, val] =
    instructionRe.exec(l) ?? raise('Invalid instruction');
  return {operation, register, val};
});

const registers: Record<string, number> = {};

let i = 0;
let lastSound = 0;
outer: while (true) {
  const {operation, register, val} = instructions[i];
  const parsedValue = Number(registers[val] ?? val);

  switch (operation) {
    case 'snd':
      lastSound = registers[register];
      break;
    case 'set':
      registers[register] = parsedValue;
      break;
    case 'add':
      registers[register] += parsedValue;
      break;
    case 'mul':
      registers[register] *= parsedValue;
      break;
    case 'mod':
      registers[register] %= parsedValue;
      break;
    case 'rcv':
      if (registers[register] !== 0) {
        break outer;
      }
      break;
    case 'jgz':
      if (registers[register] > 0) {
        i += parsedValue;
        continue;
      }
      break;
  }
  i++;
}

assert.strictEqual(lastSound, 7071, 'Part 1 failed');
