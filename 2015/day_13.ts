import {adjacentAt} from 'lib/adjacent_at';
import {getInputLns} from 'lib/input';
import {permute} from 'lib/permutate';

const lns = await getInputLns({year: 2015, day: 13});

function parseSeatingHappiness(seatingHappiness: string) {
  return [
    ...seatingHappiness.match(/([A-Z])\w+/g)!,
    ...seatingHappiness.match(/(gain|lose|\d+)/g)!,
  ];
}

const guests = lns.reduce<Record<string, {[name: string]: number}>>(
  (acc, ln) => {
    const [a, b, type, val] = parseSeatingHappiness(ln);

    acc[a] ??= {};
    acc[a][b] = parseInt(val) * (type === 'gain' ? 1 : -1);
    return acc;
  },
  {},
);

function addGuest(name: string, score = 0) {
  guests[name] = {};
  for (const guest of Object.keys(guests)) {
    guests[guest][name] = score;
    guests[name][guest] = score;
  }
}

function calcHappiness(seats: string[]) {
  return seats.reduce((acc, seat, i) => {
    const [left, right] = adjacentAt(seats, i);
    return acc + guests[seat][left] + guests[seat][right];
  }, 0);
}

function calcMaxHappiness() {
  return Math.max(...permute(Object.keys(guests)).map(calcHappiness));
}

const maxHappiness = calcMaxHappiness();

addGuest('Me');
const maxHappiness2 = calcMaxHappiness();

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(maxHappiness).toBe(664);
  });

  test('part 2', () => {
    expect(maxHappiness2).toBe(640);
  });
}
