import {assert} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {isDefined, isKeyOf} from 'lib/predicate.js';

const lines = await getInputLines({year: 2023, day: 2});

function parseGame(game: string) {
  const gameRe = /(\d+)(?: (\w+))?/g;
  const gameMatch = game.matchAll(gameRe);

  return Array.from(
    gameMatch,
    ([, num, cube]) =>
      [Number(num), ...(isDefined(cube) ? [cube] : [])] as const
  );
}

function collectMaxCubeSizes(cubes: (readonly [number, ...string[]])[]) {
  return cubes.reduce(
    (acc, [count, cube]) => {
      assert(isKeyOf(acc, cube));

      acc[cube] = Math.max(acc[cube], count);
      return acc;
    },
    {red: 0, green: 0, blue: 0}
  );
}

const parsedGames = lines.map(parseGame);

const gamesIdsSum = parsedGames.reduce((acc, [[id], ...cubes]) => {
  const {red, green, blue} = collectMaxCubeSizes(cubes);
  const isGamePossible = red <= 12 && green <= 13 && blue <= 14;

  return acc + (isGamePossible ? id : 0);
}, 0);

const setsPowerSum = parsedGames.reduce((acc, [, ...cubes]) => {
  const {red, green, blue} = collectMaxCubeSizes(cubes);
  return acc + red * green * blue;
}, 0);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(gamesIdsSum).toBe(2545);
  });

  test('part 2', () => {
    expect(setsPowerSum).toBe(78111);
  });
}
