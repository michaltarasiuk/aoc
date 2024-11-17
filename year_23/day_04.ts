import {getInputLines} from 'lib/input.js';
import {parseNumbers} from 'lib/parse.js';

const lines = await getInputLines({year: 2023, day: 4});

function countTotalCards(
  cards: Map<number, Set<number>>,
  ids = cards.keys().toArray()
): number {
  return ids.reduce((acc, id) => {
    const scratchcards = Array(cards.get(id)?.size ?? 0)
      .fill(1)
      .map((v, i) => v + i + id);

    return acc + countTotalCards(cards, scratchcards);
  }, ids.length);
}

const cards = new Map(
  lines.map(l => {
    const [[id, ...a], b] = l.split('|').map(l => parseNumbers(l));
    return [id, new Set(a).intersection(new Set(b))] as const;
  })
);

const points = cards.values().reduce((acc, matches) => {
  if (matches.size) {
    acc += Math.pow(2, matches.size - 1);
  }
  return acc;
}, 0);
const totalCardsCount = countTotalCards(cards);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(points).toBe(26218));
  test('part 2', () => expect(totalCardsCount).toBe(9997537));
}
