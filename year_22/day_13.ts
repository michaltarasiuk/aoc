import {castArray} from 'lib/cast_array';
import {getInputParagraphs} from 'lib/input';
import {isArray} from 'lib/is_array';
import {isDefined} from 'lib/is_defined';
import {isNumber} from 'lib/is_number';
import {sum} from 'lib/math';

const paragraphs = await getInputParagraphs({year: 2022, day: 13});

type Packet = (number | Packet)[];

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

const sumOfIndices = sum(
  ...paragraphs
    .map(parsePacketPair)
    .map((packetPair, i) => (isValidPacketPair(packetPair) ? i + 1 : 0))
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(sumOfIndices).toBe(4734);
  });
}
