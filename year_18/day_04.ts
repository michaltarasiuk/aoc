import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';
import {isDefined} from 'lib/predicate.js';

const lines = await getInputLines({year: 2018, day: 4});

function parseRecord(record: string) {
  const recordRe = /^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2})\] (.+)$/;
  const [, time, event] = recordRe.exec(record)!;

  return {event, date: new Date(time)};
}

function parseShift(guard: string) {
  const shiftRe = /^Guard #(\d+) begins shift$/;
  const id = shiftRe.exec(guard)?.[1];

  return isDefined(id) ? {id: Number(id)} : null;
}

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
    currentGuard = guards[shift.id] ??= Array(60).fill(0);
  } else if (event === 'falls asleep') {
    sleepStart = date;
  } else if (event === 'wakes up') {
    for (let i = sleepStart!.getMinutes(); i < date.getMinutes(); i++) {
      currentGuard![i]++;
    }
  }
}

const [id, minutes] = Object.entries(guards).reduce((acc, guard) =>
  sum(...acc[1]) > sum(...guard[1]) ? acc : guard
);
const maxMinute = minutes.indexOf(Math.max(...minutes));

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(Number(id) * maxMinute).toBe(115167);
  });
}
