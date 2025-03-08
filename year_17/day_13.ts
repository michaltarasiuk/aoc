import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await readInput({year: 2017, day: 13});

const layerRe = /^(\d+): (\d+)$/;
const firewallLayers = input.split('\n').map(l => {
  const [, depth, range] = l.match(layerRe) ?? raise('Invalid layer');
  return {depth: Number(depth), range: Number(range)};
});

let severity = 0;
for (const {depth, range} of firewallLayers) {
  if (depth % (2 * range - 2) === 0) {
    severity += depth * range;
  }
}

assert.strictEqual(severity, 3184, 'Part 1 failed');
