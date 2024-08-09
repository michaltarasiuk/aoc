import {assertHasOwn} from 'lib/assert_has_own';
import {getInputLines} from 'lib/input';
import {isDefined} from 'lib/is_defined';

const lines = await getInputLines({year: 2023, day: 2});

function parseGame(game: string) {
  const gameRe = /(\d+)(?: (\w+))?/g;
  const gameMatch = game.matchAll(gameRe);

  return Array.from(
    gameMatch,
    ([, num, cube]) =>
      [Number(num), ...(isDefined(cube) ? [cube] : [])] as const,
  );
}

function collectMaxCubeSizes(cubes: (readonly [number, ...string[]])[]) {
  return cubes.reduce(
    (acc, [count, cube]) => {
      assertHasOwn(acc, cube);

      acc[cube] = Math.max(acc[cube], count);
      return acc;
    },
    {red: 0, green: 0, blue: 0},
  );
}

const gamesIdsSum = lines.reduce((acc, game) => {
  const [[id], ...cubes] = parseGame(game);
  const {red, green, blue} = collectMaxCubeSizes(cubes);

  if (red <= 12 && green <= 13 && blue <= 14) {
    acc += id;
  }
  return acc;
}, 0);

const setsPowerSum = lines.reduce((acc, game) => {
  const [, ...cubes] = parseGame(game);
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
