import {getInputLines} from 'lib/input.js';
import {frequencies} from 'lib/iterable.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2023, day: 7});

const Cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const HandType = {
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
      return HandType.fiveKind;
    case 4:
      return HandType.fourKind;
    case 3:
      return frequency.size === 2 ? HandType.fullHouse : HandType.threeKind;
    case 2:
      return frequency.size === 3 ? HandType.twoPair : HandType.pair;
    default:
      return HandType.highCard;
  }
}

function compareHands(a: string, b: string) {
  for (const [i, card] of Array.from(a).entries()) {
    if (card !== b[i]) {
      return Cards.indexOf(card) - Cards.indexOf(b[i]);
    }
  }
  return 0;
}

const hands = lines
  .map(l => {
    const [hand, bid] = l.split(/\s/);
    return {hand, bid: Number(bid), type: classifyHand(hand)};
  })
  .toSorted((a, b) => {
    if (a.type === b.type) {
      return compareHands(a.hand, b.hand);
    }
    return a.type - b.type;
  });

const totalWinnings = sum(
  ...hands.map(({bid}, i) => {
    const rank = i + 1;
    return bid * rank;
  })
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(totalWinnings).toBe(251106089));
}
