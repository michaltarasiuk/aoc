import {assert} from 'lib/assert';
import {getInputLines} from 'lib/input';
import {isKeyOf} from 'lib/is_key_of';

const commands = await getInputLines({year: 2021, day: 2});

function calcDistance<T extends Record<string, number>>(
  instructs: Record<
    'forward' | 'down' | 'up',
    (position: T, units: number) => void
  >,
  position: T,
) {
  const {horizontal, depth} = commands.reduce((acc, command) => {
    const [instruct, units] = command.split(/\s/);

    assert(isKeyOf(instructs, instruct));
    instructs[instruct](acc, Number(units));
    return acc;
  }, position);

  return horizontal * depth;
}

const distance = calcDistance(
  {
    forward(acc, units) {
      acc.horizontal += units;
    },
    down(acc, units) {
      acc.depth += units;
    },
    up(acc, units) {
      acc.depth -= units;
    },
  },
  {horizontal: 0, depth: 0},
);

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
