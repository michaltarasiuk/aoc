import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2021, day: 2});

const commands = input
  .split(/\n/)
  .map(l => l.split(/\s/))
  .map(([name, units]) => ({name, units: Number(units)}));

{
  let horizontal = 0;
  let depth = 0;
  for (const {name, units} of commands) {
    switch (name) {
      case 'forward':
        horizontal += units;
        break;
      case 'down':
        depth += units;
        break;
      case 'up':
        depth -= units;
        break;
    }
  }
  assert.strictEqual(horizontal * depth, 1714950, 'Part 1 failed');
}

{
  let horizontal = 0;
  let depth = 0;
  let aim = 0;
  for (const {name, units} of commands) {
    switch (name) {
      case 'forward':
        horizontal += units;
        depth += aim * units;
        break;
      case 'down':
        aim += units;
        break;
      case 'up':
        aim -= units;
        break;
    }
  }
  assert.strictEqual(horizontal * depth, 1281977850, 'Part 2 failed');
}
