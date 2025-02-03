import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2015, day: 14});

function parseReindeerDescription(description: string) {
  const match = (description.match(/\d+/g) ?? []).map(Number);
  assert(match.length === 3, 'Invalid reindeer description');
  return match as [number, number, number];
}

function calcFlyingDistance(
  raceDuration: number,
  flyingTime: number,
  restingTime: number
) {
  const completeCycles = Math.floor(raceDuration / (flyingTime + restingTime));
  const remainingTime = raceDuration % (flyingTime + restingTime);

  return completeCycles * flyingTime + Math.min(flyingTime, remainingTime);
}

const RaceDuration = 2_503;
const distances = input.split(/\n/).map(l => {
  const [speed, flyingTime, restingTime] = parseReindeerDescription(l);
  return speed * calcFlyingDistance(RaceDuration, flyingTime, restingTime);
});

assert.strictEqual(Math.max(...distances), 2640, 'Part 1 failed');
