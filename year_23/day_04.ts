import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';
import {extractInts} from 'lib/parse.js';

const lines = await getInputLines({year: 2023, day: 4});

type Cards = Map<number, Set<number>>;

function getScratchcards(cards: Cards, id: number) {
  return Array(cards.get(id)!.size)
    .fill(1)
    .map((v, i) => v + i + id);
}

function countTotalCards(cards: Cards, ids = Array.from(cards.keys())): number {
  return sum(
    ids.length,
    ...ids.map(id => countTotalCards(cards, getScratchcards(cards, id)))
  );
}

const cards = new Map(
  lines.map(line => {
    const [[id, ...a], b] = line.split('|').map(extractInts);
    return [id, new Set(a).intersection(new Set(b))] as const;
  })
);

let points = 0;
for (const matches of cards.values()) {
  if (matches.size) {
    points += Math.pow(2, matches.size - 1);
  }
}

const totalCardsCount = countTotalCards(cards);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(points).toBe(26218);
  });

  test('part 2', () => {
    expect(totalCardsCount).toBe(9997537);
  });
}
