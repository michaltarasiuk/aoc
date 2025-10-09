import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2015, day: 14});

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
  const [speed, flyingTime, restingTime] = Array.from(
    l.matchAll(/\d+/g),
    Number
  );
  return speed * calcFlyingDistance(RaceDuration, flyingTime, restingTime);
});

assert.strictEqual(Math.max(...distances), 2640, 'Part 1 failed');
