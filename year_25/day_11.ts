import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2025, day: 11});

const START = 'you';
const END = 'out';

const deviceConnections = Object.fromEntries(
  input.split(/\n/).map(l => {
    const [device, ...outputs] = l.matchAll(/\w+/g).map(([m]) => m);
    return [device, outputs];
  })
);

const visited = new Set([START]);
const queue = [[START]];
let pathCount = 0;
while (queue.length > 0) {
  const path = queue.shift()!;
  const last = path.at(-1)!;
  for (const device of deviceConnections[last]) {
    if (device === END) {
      pathCount++;
      continue;
    }
    const newPath = [...path, device];
    const pathKey = newPath.join();
    if (!visited.has(pathKey)) {
      visited.add(pathKey);
      queue.push(newPath);
    }
  }
}

assert.strictEqual(pathCount, 658, 'Part 1 failed');
