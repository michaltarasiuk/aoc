import assert from 'node:assert';

import {getInput} from 'lib/input.js';
import {sum} from 'lib/math.js';
import {isObject} from 'lib/predicate.js';

const input = await getInput({year: 2015, day: 12});

const ns: number[] = [];
const ns2: number[] = [];

const parsed = JSON.parse(input, (_, val: unknown) => {
  if (typeof val === 'number') {
    ns.push(val);
  }
  return val;
});
JSON.stringify(parsed, (_, val: unknown) => {
  if (isObject(val)) {
    for (const v of Object.values(val)) {
      if (v === 'red') return;
    }
  } else if (typeof val === 'number') {
    ns2.push(val);
  }
  return val;
});

const documentNsSum = sum(...ns);
const documentNsSum2 = sum(...ns2);

assert.strictEqual(documentNsSum, 191164, 'Part 1 failed');
assert.strictEqual(documentNsSum2, 87842, 'Part 2 failed');
