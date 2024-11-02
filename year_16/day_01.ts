import {getInput} from 'lib/input.js';

const input = await getInput({year: 2016, day: 1});

function createCoordinates() {
  const coordinates = {n: 0, e: 0, s: 0, w: 0};
  const directions = Object.keys(coordinates) as (keyof typeof coordinates)[];
  let direction = directions[0];

  return {
    set(turn: string, steps: number) {
      const i = directions.indexOf(direction);
      const l = directions.at(i - 1)!;
      const r = directions.at((i + 1) % directions.length)!;

      direction = turn === 'L' ? l : r;
      coordinates[direction] += steps;
      return this;
    },
    calcDistance() {
      const {n, e, s, w} = coordinates;
      return Math.abs(n - s) + Math.abs(e - w);
    },
  };
}

const distance = input
  .matchAll(/([LR])(\d+)/g)
  .map(([, turn, steps]) => ({turn, steps: Number(steps)}))
  .reduce((acc, {turn, steps}) => acc.set(turn, steps), createCoordinates())
  .calcDistance();

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(distance).toBe(273));
}
