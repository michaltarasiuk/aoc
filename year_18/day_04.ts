import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';
import {isDefined} from '#lib/is_defined.js';
import {raise} from '#lib/raise.js';

const input = await fetchInput({year: 2018, day: 4});

function parseRecord(record: string) {
  const recordRe = /^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2})\] (.+)$/;
  const [, time, event] = recordRe.exec(record) ?? raise('Invalid record');

  return {event, date: new Date(time)};
}

function parseShift(guard: string) {
  const shiftRe = /^Guard #(\d+) begins shift$/;
  const id = shiftRe.exec(guard)?.[1];

  return isDefined(id) ? {id: Number(id)} : null;
}
function createShift() {
  const MinutesInHour = 60;
  return Array(MinutesInHour).fill(0);
}

const EVENTS = {falls: 'falls asleep', wakes: 'wakes up'};
const records = input
  .split(/\n/)
  .map(parseRecord)
  .sort((a, b) => Number(a.date) - Number(b.date));

type Guard = number[];
const guards: Record<string, Guard> = {};

let currentGuard: Guard | null = null;
let sleepStart: Date | null = null;

for (const {event, date} of records) {
  const shift = parseShift(event);
  if (isDefined(shift)) {
    currentGuard = guards[shift.id] ??= createShift();
  } else if (event === EVENTS.falls) {
    sleepStart = date;
  } else if (event === EVENTS.wakes) {
    for (let i = sleepStart!.getMinutes(); i < date.getMinutes(); i++) {
      currentGuard![i]++;
    }
  }
}

const [id, minutes] = Object.entries(guards).reduce((acc, guard) =>
  acc[1].reduce((a, b) => a + b) > guard[1].reduce((a, b) => a + b)
    ? acc
    : guard
);
const maxMinute = minutes.indexOf(Math.max(...minutes));

assert.strictEqual(Number(id) * maxMinute, 115167, 'Part 1 failed');
