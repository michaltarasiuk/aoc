import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2017, day: 18});

function parseJumpInstruction(instruction: string) {
  const instructionRe = /^(\w{3}) (\w)(?: (\S+))?$/;
  const [, operation, register, value] =
    instructionRe.exec(instruction) ?? raise('Invalid instruction');

  return {operation, register, value};
}

const registers: Record<string, number> = {};
const jumpInstructions = lines.map(parseJumpInstruction);

let i = 0;
let lastSound = 0;

outer: while (true) {
  const {operation, register, value} = jumpInstructions[i];
  const parsedValue = Number(registers[value] ?? value);

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

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(lastSound).toBe(7071));
}
