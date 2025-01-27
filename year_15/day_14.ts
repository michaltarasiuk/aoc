import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';
import {extractInts} from 'lib/parse.js';

const reindeerDescriptions = await getInputLines({year: 2015, day: 14});

function calcFlyingTime(
  totalRaceTime: number,
  flyingDuration: number,
  restingDuration: number
) {
  const fullCycles = Math.floor(
    totalRaceTime / (flyingDuration + restingDuration)
  );
  const remainingTime = totalRaceTime % (flyingDuration + restingDuration);

  return fullCycles * flyingDuration + Math.min(flyingDuration, remainingTime);
}

const RaceDuration = 2_503;
const distances = reindeerDescriptions
  .map(description => extractInts(description))
  .map(
    ([speed, flyingDuration, restingDuration]) =>
      speed * calcFlyingTime(RaceDuration, flyingDuration, restingDuration)
  );

assert.strictEqual(Math.max(...distances), 2640, 'Part 1 failed');
