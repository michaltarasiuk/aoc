import crypto from 'node:crypto';

import {getInput} from 'lib/input.js';

const s = await getInput({year: 2015, day: 4});

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

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(coin).toBe(346386);
  });

  test('part 2', () => {
    expect(coin2).toBe(9958218);
  });
}
