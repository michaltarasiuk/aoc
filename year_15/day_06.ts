import {assert} from 'lib/assert';
import {getInputLines} from 'lib/input';
import {sum} from 'lib/math';
import {isKeyOf} from 'lib/predicate';

const lines = await getInputLines({year: 2015, day: 6});

type Instruction = [action: string, ...dimensions: number[]];
type Actions = Record<'turn on' | 'turn off' | 'toggle', (v: number) => number>;

function parseInstruction(instruction: string): Instruction {
  const instructionRe = /^(.*) (\d+),(\d+) through (\d+),(\d+)$/;
  const [, action, ...dimensions] = instruction.match(instructionRe)!;

  return [action, ...dimensions.map(Number)] as const;
}

function setLights(actions: Actions, ...instructions: Instruction[]) {
  const SIZE = 1_000;
  const lights = [...Array(SIZE)].map(() => Array(SIZE).fill(0));

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

const instructions = lines.map(parseInstruction);

const lights = setLights(
  {'turn on': () => 1, 'turn off': () => 0, toggle: v => Number(!v)},
  ...instructions
);
const brightness = setLights(
  {'turn on': v => ++v, 'turn off': v => Math.max(0, --v), toggle: v => v + 2},
  ...instructions
);

const litLightsCount = sum(lights.flat());
const totalBrightness = sum(brightness.flat());

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(litLightsCount).toBe(400410);
  });

  test('part 2', () => {
    expect(totalBrightness).toBe(15343601);
  });
}
