import {assertHasOwn} from 'lib/assert_has_own';
import {getInputLns} from 'lib/input';

const commands = await getInputLns({year: 2021, day: 2});

function calcDistance<Position extends {horizontal: number; depth: number}>(
  instructs: Record<
    'forward' | 'down' | 'up',
    (position: Position, units: number) => void
  >,
  position = {horizontal: 0, depth: 0} as Position,
) {
  const {horizontal, depth} = commands.reduce((acc, command) => {
    const [instruct, units] = command.split(/\s/);

    assertHasOwn(instructs, instruct);
    instructs[instruct](acc, Number(units));
    return acc;
  }, position);

  return horizontal * depth;
}

const distance = calcDistance({
  forward(acc, units) {
    acc.horizontal += units;
  },
  down(acc, units) {
    acc.depth += units;
  },
  up(acc, units) {
    acc.depth -= units;
  },
});

const distance2 = calcDistance(
  {
    forward(acc, units) {
      acc.horizontal += units;
      acc.depth += acc.aim * units;
    },
    down(acc, units) {
      acc.aim += units;
    },
    up(acc, units) {
      acc.aim -= units;
    },
  },
  {horizontal: 0, depth: 0, aim: 0},
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(distance).toBe(1714950);
  });

  test('part 2', () => {
    expect(distance2).toBe(1281977850);
  });
}
