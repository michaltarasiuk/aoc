import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2025, day: 7});

const Start = 'S';
const Beam = '|';
const Splitter = '^';

const manifold = input
  .split(/\n/)
  .map(l => [...l])
  .map(l => l.map(symbol => ({symbol, timelines: 0})));

let state = manifold[0];
let splits = 0;
for (const i of manifold.keys().drop(1)) {
  const nextState = structuredClone(manifold[i]);
  for (const j of manifold[i].keys()) {
    const incoming = state[j];
    if (incoming.symbol === Start) {
      nextState[j].symbol = Beam;
      nextState[j].timelines = 1;
    } else if (manifold[i][j].symbol === Splitter && incoming.symbol === Beam) {
      nextState[j - 1].symbol = Beam;
      nextState[j - 1].timelines += incoming.timelines;
      nextState[j + 1].symbol = Beam;
      nextState[j + 1].timelines += incoming.timelines;
      splits++;
    } else if (incoming.symbol === Beam) {
      nextState[j].symbol = Beam;
      nextState[j].timelines += incoming.timelines;
    }
  }
  state = nextState;
}

const activeTimelines = state
  .map(({timelines}) => timelines)
  .reduce((acc, timelines) => acc + timelines, 0);

assert.strictEqual(splits, 1602, 'Part 1 failed');
assert.strictEqual(activeTimelines, 135656430050438, 'Part 2 failed');
