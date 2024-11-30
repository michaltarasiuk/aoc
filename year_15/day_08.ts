import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2015, day: 8});

const ns = lines.map(({length}) => length);

const ns2 = (<string[]>eval(`[${lines.join()}]`)).map(({length}) => length);
const stringLiteralMemoryDiff = sum(...ns) - sum(...ns2);

const ns3 = lines.map(line => JSON.stringify(line).length);
const stringLiteralMemoryDiff2 = sum(...ns3) - sum(...ns);

assert.strictEqual(stringLiteralMemoryDiff, 1350, 'Part 1 failed');
assert.strictEqual(stringLiteralMemoryDiff2, 2085, 'Part 2 failed');
