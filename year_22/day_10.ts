import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';
import {z} from 'zod';

const lines = await getInputLines({year: 2022, day: 10});

type Instruction = z.infer<typeof INSTRUCTION_SCHEMA>;

const INSTRUCTION_SCHEMA = z.union([
  z.object({op: z.literal('addx'), arg: z.string().transform(Number)}),
  z.object({op: z.literal('noop')}),
]);

function parseInstruction(instruction: string): Instruction {
  const [op, arg] = instruction.split(/\s/);
  return INSTRUCTION_SCHEMA.parse({op, arg});
}

function calcSignal(instructions: Instruction[]) {
  return instructions.reduce((acc, instruction) => {
    return instruction.op === 'addx' ? acc + instruction.arg : acc;
  }, 1);
}

const instructions = lines.flatMap((line): Instruction[] => {
  const instruction = parseInstruction(line);

  return instruction.op === 'addx'
    ? [{op: 'noop'}, instruction]
    : [instruction];
});

const CYCLES = [20, 60, 100, 140, 180, 220];
const sumOfSignals = sum(
  ...CYCLES.map(cycle => cycle * calcSignal(instructions.slice(0, cycle - 1)))
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(sumOfSignals).toBe(14540);
  });
}
