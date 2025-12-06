import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2024, day: 23});

function* permuteConnections(
  connections: string[],
  arrayLength: number
): Generator<string[]> {
  if (arrayLength === 0) {
    yield [];
    return;
  }
  for (const connection of connections) {
    for (const arr of permuteConnections(connections, arrayLength - 1)) {
      yield [connection, ...arr];
    }
  }
}

const connections = input
  .split(/\n/)
  .map(l => l.split('-'))
  .reduce<Record<string, Set<string>>>((acc, [a, b]) => {
    (acc[a] ??= new Set()).add(b);
    (acc[b] ??= new Set()).add(a);
    return acc;
  }, {});

const setsOfThree = new Set<string>();
for (const connection of Object.keys(connections)) {
  for (const [a, b] of permuteConnections([...connections[connection]], 2)) {
    if (connections[a].has(b)) {
      setsOfThree.add([connection, a, b].sort().join('-'));
    }
  }
}

const setsContainingT = setsOfThree
  .values()
  .filter(s => /t\w/.test(s))
  .toArray().length;

assert.strictEqual(setsContainingT, 1423, 'Part 1 failed');
