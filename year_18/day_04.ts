import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';
import {isDefined} from 'lib/predicate.js';

const lines = await getInputLines({year: 2018, day: 4});

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

const Events = {falls: 'falls asleep', wakes: 'wakes up'};
const records = lines
  .map(parseRecord)
  .toSorted((a, b) => Number(a.date) - Number(b.date));

type Guard = number[];
const guards: Record<string, Guard> = {};

let currentGuard: Guard | null = null;
let sleepStart: Date | null = null;

for (const {event, date} of records) {
  const shift = parseShift(event);
  if (isDefined(shift)) {
    currentGuard = guards[shift.id] ??= createShift();
  } else if (event === Events.falls) {
    sleepStart = date;
  } else if (event === Events.wakes) {
    for (let i = sleepStart!.getMinutes(); i < date.getMinutes(); i++) {
      currentGuard![i]++;
    }
  }
}

const [id, minutes] = Object.entries(guards).reduce((acc, guard) =>
  sum(...acc[1]) > sum(...guard[1]) ? acc : guard
);
const maxMinute = minutes.indexOf(Math.max(...minutes));

assert.strictEqual(Number(id) * maxMinute, 115167, 'Part 1 failed');
