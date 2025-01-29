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
  if (/^0{5}/.test(hash)) {
    password += hash[5];
  }
}

let password2 = '_'.repeat(8);
for (let i = 0; password2.includes('_'); i++) {
  const hash = md5(doorId + i);
  if (!/^0{5}/.test(hash)) {
    continue;
  }
  const [pos, val] = [Number(hash[5]), hash[6]];
  if (!password2[pos] || password2[pos] !== '_') {
    continue;
  }
  password2 = [...password2].toSpliced(pos, 1, val).join('');
}

assert.strictEqual(password, 'f97c354d', 'Part 1 failed');
assert.strictEqual(password2, '863dde27', 'Part 2 failed');
