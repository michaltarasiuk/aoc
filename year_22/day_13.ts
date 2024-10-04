import {castArray} from 'lib/array.js';
import {getInputParagraphs} from 'lib/input.js';
import {isArray, isDefined, isNumber} from 'lib/predicate.js';

const paragraphs = await getInputParagraphs({year: 2022, day: 13});

type Packet = (Packet | number)[];

function parsePacketPair([a, b]: string[]): [Packet, Packet] {
  return [eval(a), eval(b)];
}

function isValidPacketPair([a, b]: [Packet, Packet]): boolean | void {
  for (const i of (a.length > b.length ? a : b).keys()) {
    if (!isDefined(a[i]) || !isDefined(b[i])) {
      return a.length < b.length;
    } else if (isArray(a[i]) || isArray(b[i])) {
      const isValid = isValidPacketPair([castArray(a[i]), castArray(b[i])]);
      if (isDefined(isValid)) {
        return isValid;
      }
    } else if (isNumber(a[i]) && isNumber(b[i])) {
      if (a[i] !== b[i]) {
        return a[i] < b[i];
      }
    }
  }
}

const indicesSum = paragraphs
  .map(parsePacketPair)
  .reduce((acc, packetPair, i) => {
    if (isValidPacketPair(packetPair)) {
      acc += i + 1;
    }
    return acc;
  }, 0);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(indicesSum).toBe(4734);
  });
}
