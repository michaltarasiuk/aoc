import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2015, day: 14});

const RaceDuration = 2_503;

function parseReindeer(r: string) {
  const reindeer = Array.from(r.matchAll(/\d+/g), Number);
  assert(reindeer.length === 3);
  return reindeer as [number, number, number];
}

function calcDistance(speed: number, duration: number, rest: number) {
  let distance = 0;
  for (let second = 1; second <= RaceDuration; second += duration + rest) {
    distance += speed * Math.min(duration, RaceDuration - second);
  }
  return distance;
}

const distances = input
  .split(/\n/)
  .map(parseReindeer)
  .map(r => calcDistance(...r));

assert.strictEqual(Math.max(...distances), 2640, 'Part 1 failed');
