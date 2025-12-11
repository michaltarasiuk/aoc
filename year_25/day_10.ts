import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2025, day: 10});

const LIGHT_ON = '#';
const LIGHT_OFF = '.';

const EXCLUDE_JOLTAGE_REQUIREMENTS = -1;

const machines = input.split(/\n/).map(l => {
  const [targetLights, ...buttons] = l
    .split(/\s/)
    .slice(0, EXCLUDE_JOLTAGE_REQUIREMENTS);
  return {
    targetLights: targetLights.slice(1, -1),
    buttons: buttons.map(parseButton),
  };
});

let totalButtonPresses = 0;
for (const {targetLights, buttons} of machines) {
  const initialLights = LIGHT_OFF.repeat(targetLights.length);
  const visited = new Set([initialLights]);
  const queue = [{lights: initialLights, presses: 0}];
  outer: while (queue.length > 0) {
    const {lights, presses} = queue.shift()!;
    for (const b of buttons) {
      const newLights = toggleLights(lights, b);
      if (newLights === targetLights) {
        totalButtonPresses += presses + 1;
        break outer;
      } else if (!visited.has(newLights)) {
        visited.add(newLights);
        queue.push({lights: newLights, presses: presses + 1});
      }
    }
  }
}

assert.strictEqual(totalButtonPresses, 484, 'Part 1 failed');

function toggleLights([...lights]: string, button: number[]) {
  for (const i of button) {
    lights[i] = lights[i] === LIGHT_OFF ? LIGHT_ON : LIGHT_OFF;
  }
  return lights.join('');
}

function parseButton(b: string) {
  return b.slice(1, -1).split(',').map(Number);
}
