import {extractInts} from 'lib/extract_ints';
import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2023, day: 4});

const cards = new Map(
  lns.map((ln) => {
    const [[id, ...a], b] = ln.split('|').map(extractInts);
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
