import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2025, day: 10});

const LIGHT_ON = '#';
const LIGHT_OFF = '.';

const EXCLUDE_JOLTAGE_REQUIREMENTS = -1;

const machines = input.split(/\n/).map(l => {
  const [goalState, ...buttons] = l
    .split(/\s/)
    .slice(0, EXCLUDE_JOLTAGE_REQUIREMENTS)
    .map(v => v.slice(1, -1));
  return {
    goalState,
    buttons: buttons.map(b => b.split(',').map(Number)),
  };
});

let totalPresses = 0;
for (const {goalState, buttons} of machines) {
  const startState = LIGHT_OFF.repeat(goalState.length);
  const visited = new Set([startState]);
  const queue = [{state: startState, pressCount: 0}];
  outer: while (queue.length > 0) {
    const {state, pressCount} = queue.shift()!;
    for (const b of buttons) {
      const nextState = toggleLights(state, b);
      if (nextState === goalState) {
        totalPresses += pressCount + 1;
        break outer;
      } else if (!visited.has(nextState)) {
        visited.add(nextState);
        queue.push({state: nextState, pressCount: pressCount + 1});
      }
    }
  }
}

assert.strictEqual(totalPresses, 484, 'Part 1 failed');

function toggleLights([...lights]: string, indices: number[]) {
  for (const i of indices) {
    lights[i] = lights[i] === LIGHT_OFF ? LIGHT_ON : LIGHT_OFF;
  }
  return lights.join('');
}
