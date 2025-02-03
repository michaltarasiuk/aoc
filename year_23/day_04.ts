import assert from 'node:assert';

import {extractInts} from 'lib/extract_ints.js';
import {getInput} from 'lib/input.js';

const input = await getInput({year: 2023, day: 4});

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
  input.split(/\n/).map(l => {
    const [[id, ...a], b] = l.split('|').map(l => extractInts(l));
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

assert.strictEqual(points, 26218, 'Part 1 failed');
assert.strictEqual(totalCardsCount, 9997537, 'Part 2 failed');
