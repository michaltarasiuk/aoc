import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';
import {extractInts} from 'lib/parse.js';

const reindeerDescriptions = await getInputLines({year: 2015, day: 14});

function calcFlyingDistance(
  raceDuration: number,
  flyingTime: number,
  restingTime: number
) {
  const completeCycles = Math.floor(raceDuration / (flyingTime + restingTime));
  const remainingTime = raceDuration % (flyingTime + restingTime);

  return completeCycles * flyingTime + Math.min(flyingTime, remainingTime);
}

const raceDuration = 2_503;
const reindeerDistances = reindeerDescriptions
  .map(description => extractInts(description))
  .map(
    ([speed, flyingTime, restingTime]) =>
      speed * calcFlyingDistance(raceDuration, flyingTime, restingTime)
  );

assert.strictEqual(Math.max(...reindeerDistances), 2640, 'Part 1 failed');
