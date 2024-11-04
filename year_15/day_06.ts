import {assert, raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';
import {isKeyOf} from 'lib/predicate.js';

const lines = await getInputLines({year: 2015, day: 6});

type Instruction = ReturnType<typeof parseInstruction>;
type Actions = Record<'turn on' | 'turn off' | 'toggle', (v: number) => number>;

function parseInstruction(instruction: string) {
  const instructionRe = /^(.*) (\d+),(\d+) through (\d+),(\d+)$/;
  const [, action, ...dimensions] =
    instruction.match(instructionRe) ?? raise('Invalid instruction');

  return [action, ...dimensions.map(Number)] as const;
}

function setLights(actions: Actions, ...instructions: Instruction[]) {
  const Size = 1_000;
  const lights = [...Array(Size)].map(() => Array(Size).fill(0));

  for (const [action, x1, y1, x2, y2] of instructions) {
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        assert(isKeyOf(actions, action));
        lights[y][x] = actions[action](lights[y][x]);
      }
    }
  }
  return lights;
}

const TurnOn = 'turn on';
const TurnOff = 'turn off';
const LightModes = {
  binarySwitch: {
    [TurnOn]: () => 1,
    [TurnOff]: () => 0,
    toggle: v => Number(!v),
  },
  brightness: {
    [TurnOn]: v => v + 1,
    [TurnOff]: v => Math.max(0, v - 1),
    toggle: v => v + 2,
  },
} satisfies Record<string, Actions>;

const instructions = lines.map(parseInstruction);
const [totalLights, totalBrightness] = Object.values(LightModes).map(actions =>
  sum(setLights(actions, ...instructions).flat())
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(totalLights).toBe(400410));
  test('part 2', () => expect(totalBrightness).toBe(15343601));
}
