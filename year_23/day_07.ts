import assert from 'node:assert';

import {frequencies} from '#lib/frequencies.js';
import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2023, day: 7});

const CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const HAND_TYPES = {
  fiveKind: 6,
  fourKind: 5,
  fullHouse: 4,
  threeKind: 3,
  twoPair: 2,
  pair: 1,
  highCard: 0,
};

function classifyHand(hand: string) {
  const frequency = frequencies(hand);
  switch (Math.max(...frequency.values())) {
    case 5:
      return HAND_TYPES.fiveKind;
    case 4:
      return HAND_TYPES.fourKind;
    case 3:
      return frequency.size === 2 ? HAND_TYPES.fullHouse : HAND_TYPES.threeKind;
    case 2:
      return frequency.size === 3 ? HAND_TYPES.twoPair : HAND_TYPES.pair;
    default:
      return HAND_TYPES.highCard;
  }
}
function compareHands(a: string, b: string) {
  for (const [i, card] of [...a].entries()) {
    if (card !== b[i]) {
      return CARDS.indexOf(card) - CARDS.indexOf(b[i]);
    }
  }
  return 0;
}

const hands = input
  .split(/\n/)
  .map(l => l.split(/\s/))
  .map(([hand, bit]) => ({hand, bid: Number(bit), type: classifyHand(hand)}))
  .sort((a, b) => a.type - b.type || compareHands(a.hand, b.hand));

const totalWinnings = hands
  .map(({bid}, i) => ({bid, rank: i + 1}))
  .map(({bid, rank}) => bid * rank)
  .reduce((a, b) => a + b);

assert.strictEqual(totalWinnings, 251106089, 'Part 1 failed');
