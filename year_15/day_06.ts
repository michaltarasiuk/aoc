import {assert} from 'lib/assert';
import {create2dArr} from 'lib/create_2d_arr';
import {getInputLines} from 'lib/input';
import {isKeyOf} from 'lib/is_key_of';
import {sum} from 'lib/math';

const lines = await getInputLines({year: 2015, day: 6});

function parseInstruction(instruction: string) {
  const instructionRe = /^(.*) (\d+),(\d+) through (\d+),(\d+)$/;
  const [, action, ...dimensions] = instruction.match(instructionRe)!;

  return [action, ...dimensions.map(Number)] as const;
}

function countLights(
  actions: Record<'turn on' | 'turn off' | 'toggle', (val: number) => number>
) {
  const lights = create2dArr(1_000, 0);

  for (const line of lines) {
    const [action, x1, y1, x2, y2] = parseInstruction(line);

    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        assert(isKeyOf(actions, action));
        lights[y][x] = actions[action](lights[y][x]);
      }
    }
  }
  return sum(lights.flat());
}

const litLightsCount = countLights({
  'turn on': () => 1,
  'turn off': () => 0,
  toggle: val => +!val,
});

const totalBrightness = countLights({
  'turn on': val => val + 1,
  'turn off': val => Math.max(val - 1, 0),
  toggle: val => val + 2,
});

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(litLightsCount).toBe(400410);
  });

  test('part 2', () => {
    expect(totalBrightness).toBe(15343601);
  });
}
