import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2025, day: 10});

const ExcludeJoltageRequirements = -1;

const machines = input.split(/\n/).map(l => {
  const [targetLights, ...buttonWirings] = l
    .split(/\s/)
    .slice(0, ExcludeJoltageRequirements);
  return {
    targetLights: parseTargetLights(targetLights),
    buttons: parseButtonWirings(buttonWirings),
  };
});

let totalButtonPresses = 0;
for (const {targetLights, buttons} of machines) {
  const initialLights = getInitialLights(targetLights.length);
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

function getInitialLights(length: number) {
  return '.'.repeat(length);
}

function toggleLights([...lights]: string, button: number[]) {
  return lights
    .map((l, i) => (button.includes(i) ? (l === '.' ? '#' : '.') : l))
    .join('');
}

function parseTargetLights(encoded: string) {
  return encoded.slice(1, -1);
}

function parseButtonWirings(wirings: string[]) {
  return wirings.map(w => w.slice(1, -1).split(',').map(Number));
}
