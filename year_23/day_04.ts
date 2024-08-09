import {getInputLines} from 'lib/input';
import {matchInts} from 'lib/ints';

const lines = await getInputLines({year: 2023, day: 4});

const cards = new Map(
  lines.map((line) => {
    const [[id, ...a], b] = line.split('|').map(matchInts);
    return [id, new Set(a).intersection(new Set(b))] as const;
  }),
);

let points = 0;
for (const [, matches] of cards) {
  if (matches.size) {
    points += Math.pow(2, matches.size - 1);
  }
}

function findTotalCards(ids = Array.from(cards.keys())) {
  let count = 0;

  for (const id of ids) {
    const scratchcards = Array.from(
      {length: cards.get(id)!.size},
      (_, i) => id + i + 1,
    );
    count += findTotalCards(scratchcards);
  }
  return count + ids.length;
}

const totalCards = findTotalCards();

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(points).toBe(26218);
  });

  test('part 2', () => {
    expect(totalCards).toBe(9997537);
  });
}
