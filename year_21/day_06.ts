import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2021, day: 6});

function simulateLanternfishGrowth([...fishTimers]: number[], days: number) {
  for (let day = 1; day <= days; day++) {
    const spawningFish = fishTimers.shift()!;
    fishTimers[6] += spawningFish;
    fishTimers[8] = spawningFish;
  }
  return fishTimers.reduce((total, count) => total + count, 0);
}

const timers = Array<number>(9).fill(0);
for (const lanternfish of input.split('').map(Number)) {
  timers[lanternfish]++;
}

assert.strictEqual(simulateLanternfishGrowth(timers, 80), 385391, 'Part 1');
assert.strictEqual(
  simulateLanternfishGrowth(timers, 256),
  1728611055389,
  'Part 2'
);
