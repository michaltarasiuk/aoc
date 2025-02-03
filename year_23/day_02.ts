import assert from 'node:assert';

import {getInput} from 'lib/input.js';
import {isKeyof} from 'lib/is_keyof.js';

const input = await getInput({year: 2023, day: 2});

const games = input.split(/\n/).map(l =>
  l
    .matchAll(/(\d+) (r|g|b)/g)
    .map(([, n, color]) => [color, Number(n)] as const)
    .reduce(
      (acc, [k, v]) => {
        assert(isKeyof(acc, k));
        return {...acc, [k]: Math.max(acc[k], v)};
      },
      {r: 0, g: 0, b: 0}
    )
);

const gamesIdsSum = games
  .map((game, i) => ({id: i + 1, ...game}))
  .filter(({r, g, b}) => r <= 12 && g <= 13 && b <= 14)
  .reduce((acc, {id}) => acc + id, 0);

const setsPowerSum = games.reduce((acc, {r, g, b}) => acc + r * g * b, 0);

assert.strictEqual(gamesIdsSum, 2545, 'Part 1 failed');
assert.strictEqual(setsPowerSum, 78111, 'Part 2 failed');
