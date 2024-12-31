import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2015, day: 8});

const ns = lines.map(l => l.length);

const ns2 = (<string[]>eval(`[${lines.join()}]`)).map(l => l.length);
const diff = ns.reduce((a, b) => a + b) - ns2.reduce((a, b) => a + b);

const ns3 = lines.map(l => JSON.stringify(l).length);
const diff2 = ns3.reduce((a, b) => a + b) - ns.reduce((a, b) => a + b);

assert.strictEqual(diff, 1350, 'Part 1 failed');
assert.strictEqual(diff2, 2085, 'Part 2 failed');
