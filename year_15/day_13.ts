import {adjacentAt} from 'lib/adjacent_at';
import {getInputLines} from 'lib/input';
import {permute} from 'lib/permutate';
import {sum} from 'lib/sum';

const seats = await getInputLines({year: 2015, day: 13});

function parseSeatingHappiness(seatingHappiness: string) {
  return [
    ...seatingHappiness.match(/([A-Z])\w+/g)!,
    ...seatingHappiness.match(/(gain|lose|\d+)/g)!,
  ];
}

function createGuests(seats: string[]) {
  const guests = seats.reduce<Record<string, Record<string, number>>>(
    (acc, seat) => {
      const [a, b, type, val] = parseSeatingHappiness(seat);

      acc[a] ??= {};
      acc[a][b] = Number(val) * (type === 'gain' ? 1 : -1);
      return acc;
    },
    {},
  );

  function addGuest(newGuest: string, score = 0) {
    guests[newGuest] = {};
    for (const guest of Object.keys(guests)) {
      guests[guest][newGuest] = score;
      guests[newGuest][guest] = score;
    }
  }

  function calcHappiness(seats: string[]) {
    const happiness = seats.flatMap((seat, i) =>
      adjacentAt(seats, i).map((adjacent) => guests[seat][adjacent]),
    );
    return sum(...happiness);
  }

  function calcMaxHappiness() {
    const guestNames = Object.keys(guests);
    return Math.max(...permute(guestNames).map(calcHappiness));
  }

  return {addGuest, calcMaxHappiness};
}

const guests = createGuests(seats);

const maxHappiness = guests.calcMaxHappiness();

guests.addGuest('Me');
const maxHappiness2 = guests.calcMaxHappiness();

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(maxHappiness).toBe(664);
  });

  test('part 2', () => {
    expect(maxHappiness2).toBe(640);
  });
}
