import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await fetchInput({year: 2017, day: 13});

function isCaught({depth, range}: {depth: number; range: number}, delay = 0) {
  return (depth + delay) % (2 * range - 2) === 0;
}

const layerRe = /^(\d+): (\d+)$/;
const firewallLayers = input.split('\n').map(l => {
  const [, depth, range] = l.match(layerRe) ?? raise('Invalid layer');
  return {depth: Number(depth), range: Number(range)};
});

const severity = firewallLayers.reduce((acc, layer) => {
  if (isCaught(layer)) {
    acc += layer.depth * layer.range;
  }
  return acc;
}, 0);

let delay = 0;
while (firewallLayers.some(l => isCaught(l, delay))) {
  delay++;
}

assert.strictEqual(severity, 3184, 'Part 1 failed');
assert.strictEqual(delay, 3878062, 'Part 2 failed');
