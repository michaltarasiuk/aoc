import assert from 'node:assert';
import crypto from 'node:crypto';

import {getInput} from 'lib/input.js';

const doorId = await getInput({year: 2016, day: 5});

function md5(binaryLike: crypto.BinaryLike) {
  return crypto.createHash('md5').update(binaryLike).digest('hex');
}

let password = '';
for (let i = 0; password.length < 8; i++) {
  const hash = md5(doorId + i);
  if (hash.startsWith('00000')) {
    password += hash[5];
  }
}

assert.strictEqual(password, 'f97c354d', 'Part 1 failed');
