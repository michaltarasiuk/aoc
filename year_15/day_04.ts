import assert from 'node:assert';
import crypto from 'node:crypto';

import {fetchInput} from 'lib/input.js';

const s = await fetchInput({year: 2015, day: 4});

function md5(data: crypto.BinaryLike) {
  return crypto.createHash('md5').update(data).digest('hex');
}
function waitUntilStartsWith(
  {s, searchString}: {s: string; searchString: string},
  init = 0
) {
  let n = init;
  while (!md5(s + n).startsWith(searchString)) n++;
  return n;
}

const coin = waitUntilStartsWith({s, searchString: '0'.repeat(5)});
const coin2 = waitUntilStartsWith({s, searchString: '0'.repeat(6)}, coin);

assert.strictEqual(coin, 346386, 'Part 1 failed');
assert.strictEqual(coin2, 9958218, 'Part 2 failed');
