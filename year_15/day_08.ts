import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2015, day: 8});

const lines = input.split(/\n/);

const memoryStrings = <string[]>eval(`[${lines.join()}]`);
const encodedStrings = lines.map(line => JSON.stringify(line));

const codeLength = lines.reduce((acc, l) => acc + l.length, 0);
const memoryLength = memoryStrings.reduce((acc, str) => acc + str.length, 0);
const encodedLength = encodedStrings.reduce((acc, str) => acc + str.length, 0);

assert.strictEqual(codeLength - memoryLength, 1350, 'Part 1 failed');
assert.strictEqual(encodedLength - codeLength, 2085, 'Part 2 failed');
