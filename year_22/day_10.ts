import assert from 'node:assert';

import {getInput} from 'lib/input.js';
import {z} from 'zod';

const input = await getInput({year: 2022, day: 10});

const InstructionSchema = z.union([
  z.object({op: z.literal('addx'), arg: z.string().transform(Number)}),
  z.object({op: z.literal('noop')}),
]);
function parseInstruction(instruction: string) {
  const [op, arg] = instruction.split(/\s/);
  return InstructionSchema.parse({op, arg});
}

function calcSignal(instructions: z.infer<typeof InstructionSchema>[]) {
  return instructions.reduce((acc, instruction) => {
    return instruction.op === 'addx' ? acc + instruction.arg : acc;
  }, 1);
}

const instructions = input
  .split(/\n/)
  .map(parseInstruction)
  .flatMap((instruction): z.infer<typeof InstructionSchema>[] =>
    instruction.op === 'addx' ? [{op: 'noop'}, instruction] : [instruction]
  );

const Cycles = [20, 60, 100, 140, 180, 220];
const sumOfSignals = Cycles.reduce(
  (acc, cycle) => acc + cycle * calcSignal(instructions.slice(0, cycle - 1)),
  0
);

assert.strictEqual(sumOfSignals, 14540, 'Part 1 failed');
