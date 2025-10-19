import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2015, day: 14});

const RaceDuration = 2_503;

function parseReindeer(line: string) {
  return Array.from(line.matchAll(/\d+/g), Number);
}

function calcDistance(speed: number, flyTime: number, restTime: number) {
  const cycleTime = flyTime + restTime;
  const fullCycles = Math.floor(RaceDuration / cycleTime);
  const leftover = RaceDuration % cycleTime;
  return speed * (fullCycles * flyTime + Math.min(flyTime, leftover));
}

const distances = input
  .split(/\n/)
  .map(parseReindeer)
  .map(([speed, flyTime, restTime]) => calcDistance(speed, flyTime, restTime));

assert.strictEqual(Math.max(...distances), 2640, 'Part 1 failed');
