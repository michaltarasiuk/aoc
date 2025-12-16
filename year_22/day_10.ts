import assert from 'node:assert';

import {z} from 'zod';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2022, day: 10});

const instructionSchema = z.union([
  z.object({op: z.literal('addx'), arg: z.string().transform(Number)}),
  z.object({op: z.literal('noop')}),
]);
function parseInstruction(instruction: string) {
  const [op, arg] = instruction.split(/\s/);
  return instructionSchema.parse({op, arg});
}

function calcSignal(instructions: z.infer<typeof instructionSchema>[]) {
  return instructions.reduce(
    (acc, i) => (i.op === 'addx' ? acc + i.arg : acc),
    1
  );
}

const instructions = input
  .split(/\n/)
  .map(parseInstruction)
  .flatMap((instruction): z.infer<typeof instructionSchema>[] =>
    instruction.op === 'addx' ? [{op: 'noop'}, instruction] : [instruction]
  );

const cycles = [20, 60, 100, 140, 180, 220];
const sumOfSignals = cycles.reduce(
  (acc, c) => acc + c * calcSignal(instructions.slice(0, c - 1)),
  0
);

assert.strictEqual(sumOfSignals, 14540, 'Part 1 failed');
