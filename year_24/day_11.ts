import assert from 'node:assert';

import {getInput} from 'lib/input.js';
import {frequencies} from 'lib/iterable.js';

const input = await getInput({year: 2024, day: 11});

function getNextStones(stone: number) {
  let newStones: number[];
  if (stone === 0) {
    newStones = [1];
  } else if (String(stone).length % 2 === 0) {
    const stringStone = String(stone);
    newStones = [
      stringStone.slice(0, stringStone.length / 2),
      stringStone.slice(stringStone.length / 2),
    ].map(Number);
  } else {
    newStones = [stone * 2024];
  }
  return newStones;
}

function blink(stonesRecord: Map<number, number>, blinkCount: number) {
  const newRecord = new Map(stonesRecord);
  while (blinkCount--) {
    for (const [stone, stoneCount] of new Map(newRecord)) {
      const nextStones = getNextStones(stone);
      for (const nextStone of nextStones) {
        newRecord.set(nextStone, (newRecord.get(nextStone) ?? 0) + stoneCount);
      }
      newRecord.set(stone, (newRecord.get(stone) ?? 0) - stoneCount);
    }
  }
  return newRecord;
}

const stones = input.split(/\s/).map(Number);

const part1 = blink(frequencies(stones), 25)
  .values()
  .reduce((acc, count) => acc + count, 0);

const part2 = blink(frequencies(stones), 75)
  .values()
  .reduce((acc, count) => acc + count, 0);

assert.strictEqual(part1, 194482, 'Part 1 failed');
assert.strictEqual(part2, 232454623677743, 'Part 2 failed');