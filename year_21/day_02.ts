import {strictEqual} from 'node:assert';

import {assert} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {isKeyOf} from 'lib/predicate.js';

const commands = await getInputLines({year: 2021, day: 2});

function calcDistance<T extends Record<string, number>>(
  instructs: Record<
    'forward' | 'down' | 'up',
    (position: T, units: number) => void
  >,
  position: T
) {
  const {horizontal, depth} = commands
    .map(command => command.split(/\s/))
    .reduce((acc, [instruct, units]) => {
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
  {horizontal: 0, depth: 0}
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
  {horizontal: 0, depth: 0, aim: 0}
);

strictEqual(distance, 1714950, 'Part 1 failed');
strictEqual(distance2, 1281977850, 'Part 2 failed');
