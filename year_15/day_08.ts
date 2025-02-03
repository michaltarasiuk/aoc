import assert from 'node:assert';

import {add} from 'lib/add.js';
import {getInput} from 'lib/input.js';

const input = await getInput({year: 2015, day: 8});

const lines = input.split(/\n/);

const memoryStrings = <string[]>eval(`[${lines.join()}]`);
const encodedStrings = lines.map(line => JSON.stringify(line));

const codeLength = lines.map(line => line.length).reduce(add);
const memoryLength = memoryStrings.map(str => str.length).reduce(add);
const encodedLength = encodedStrings.map(str => str.length).reduce(add);

assert.strictEqual(codeLength - memoryLength, 1350, 'Part 1 failed');
assert.strictEqual(encodedLength - codeLength, 2085, 'Part 2 failed');
