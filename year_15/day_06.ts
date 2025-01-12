import assert from 'node:assert';

console.log(assert);

import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2015, day: 6});

function parseInstruction(instruction: string) {
  const instructionRe = /^(.*) (\d+),(\d+) through (\d+),(\d+)$/;
  const [, action, ...dimensions] = instruction.match(instructionRe)!;

  return [action, ...dimensions.map(Number)] as const;
}

function setLights(
  actions: Record<string, (v: number) => number>,
  ...instructions: ReturnType<typeof parseInstruction>[]
) {
  const Size = 1_000;
  const lights = [...Array(Size)].map(() => Array(Size).fill(0));

  for (const [action, x1, y1, x2, y2] of instructions) {
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        lights[y][x] = actions[action](lights[y][x]);
      }
    }
  }
  return lights;
}

const Actions = {turnOn: 'turn on', turnOff: 'turn off', toggle: 'toggle'};
const instructions = lines.map(parseInstruction);

const lights = setLights(
  {
    [Actions.turnOn]: () => 1,
    [Actions.turnOff]: () => 0,
    [Actions.toggle]: v => Number(!v),
  },
  ...instructions
);
const brightness = setLights(
  {
    [Actions.turnOn]: v => v + 1,
    [Actions.turnOff]: v => Math.max(0, v - 1),
    [Actions.toggle]: v => v + 2,
  },
  ...instructions
);

assert.strictEqual(sum(lights.flat()), 400410, 'Part 1 failed');
assert.strictEqual(sum(brightness.flat()), 15343601, 'Part 2 failed');
