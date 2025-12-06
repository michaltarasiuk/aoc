import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2015, day: 14});

const RaceDuration = 2_503;

function parseReindeer(r: string) {
  const reindeer = Array.from(r.matchAll(/\d+/g), Number);
  assert(reindeer.length === 3);
  return reindeer as [number, number, number];
}

function calcDistance(speed: number, duration: number, rest: number) {
  let time = 0;
  let distance = 0;
  while (time < RaceDuration) {
    for (let i = 0; i < duration && time < RaceDuration; i++, time++) {
      distance += speed;
    }
    time += rest;
  }
  return distance;
}

const distances = input
  .split(/\n/)
  .map(parseReindeer)
  .map(r => calcDistance(...r));

assert.strictEqual(Math.max(...distances), 2640, 'Part 1 failed');
