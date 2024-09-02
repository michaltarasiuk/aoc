import {frequencies} from 'lib/frequencies';
import {getInputLines} from 'lib/input';
import {sum} from 'lib/math';

const lines = await getInputLines({year: 2023, day: 7});

const HAND_TYPE = {
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
      return HAND_TYPE.fiveKind;
    case 4:
      return HAND_TYPE.fourKind;
    case 3:
      return frequency.size === 2 ? HAND_TYPE.fullHouse : HAND_TYPE.threeKind;
    case 2:
      return frequency.size === 3 ? HAND_TYPE.twoPair : HAND_TYPE.pair;
    default:
      return HAND_TYPE.highCard;
  }
}

const CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

function compareHands(a: string, b: string) {
  for (const [i, card] of Array.from(a).entries()) {
    if (card === b[i]) {
      continue;
    }
    return CARDS.indexOf(card) - CARDS.indexOf(b[i]);
  }
  return 0;
}

const hands = lines
  .map(line => {
    const [hand, bid] = line.split(/\s/);
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

  test('part 1', () => {
    expect(totalWinnings).toBe(251106089);
  });
}
