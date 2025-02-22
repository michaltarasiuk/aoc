import assert from 'node:assert';

import {chunkEvery} from 'lib/chunk_every.js';
import {readInput} from 'lib/input.js';
import {isKeyof} from 'lib/is_keyof.js';
import {z} from 'zod';

const input = await readInput({year: 2024, day: 17});

function calcComboValue(
  operand: number,
  registers: {a: number; b: number; c: number}
) {
  if (operand <= 3) {
    return operand;
  }
  const operandMap = {
    4: registers.a,
    5: registers.b,
    6: registers.c,
  };
  assert(isKeyof(operandMap, operand));
  return operandMap[operand];
}

const InputSchema = z.object({
  a: z.string().transform(Number),
  b: z.string().transform(Number),
  c: z.string().transform(Number),
  program: z.string().transform(s => chunkEvery(s.split(',').map(Number), 2)),
});
const inputRe = new RegExp(`Register A: (?<a>\\d+)
Register B: (?<b>\\d+)
Register C: (?<c>\\d+)

Program: (?<program>.*)`);

const {program, ...registers} = InputSchema.parse(inputRe.exec(input)?.groups);
const output: number[] = [];

let pointer = 0;
outer: while (pointer < program.length) {
  const [opcode, operand] = program[pointer];
  switch (opcode) {
    case 0:
      registers.a = Math.floor(
        registers.a / Math.pow(2, calcComboValue(operand, registers))
      );
      break;
    case 1:
      registers.b ^= operand;
      break;
    case 2:
      registers.b = calcComboValue(operand, registers) % 8;
      break;
    case 3:
      if (registers.a !== 0) {
        pointer = operand;
        continue outer;
      }
      break;
    case 4:
      registers.b ^= registers.c;
      break;
    case 5:
      output.push(calcComboValue(operand, registers) % 8);
      break;
    case 6:
      registers.a = Math.floor(
        registers.b / Math.pow(2, calcComboValue(operand, registers))
      );
      break;
    case 7:
      registers.c = Math.floor(
        registers.a / Math.pow(2, calcComboValue(operand, registers))
      );
      break;
    default:
      throw new Error(`Unknown opcode: ${opcode}`);
  }
  pointer += 1;
}

assert.strictEqual(output.join(','), '1,5,0,3,7,3,0,3,1', 'Part 1 failed');
