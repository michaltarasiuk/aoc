import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {frequencies} from 'lib/iterable.js';
import {stringToCodePoints} from 'lib/string.js';

const lines = await getInputLines({year: 2016, day: 4});

function calcChecksum(...chars: string[]) {
  return [...frequencies(chars)]
    .sort(([charA, countA], [charB, countB]) => {
      return countB - countA || charA.localeCompare(charB);
    })
    .slice(0, 5)
    .map(([char]) => char)
    .join('');
}

function shiftAlphabetCodePoint(codePoint: number, shift: number) {
  return ((codePoint - 97 + shift) % 26) + 97;
}

const roomRe = /^([\w-]+)-(\d+)\[(\w+)\]$/;
const rooms = lines.map(l => {
  const [, name, id, checksum] = roomRe.exec(l) ?? raise('Invalid room');
  return {name: name.replace(/-/g, ''), id: Number(id), checksum};
});

const realRoomSectorIDsSum = rooms.reduce((acc, {name, id, checksum}) => {
  if (checksum === calcChecksum(...name)) {
    acc += id;
  }
  return acc;
}, 0);

const NorthPoleObjectStorage = 'northpoleobjectstorage';
const northPoleSector = rooms.find(
  ({name, id}) =>
    NorthPoleObjectStorage ===
    String.fromCodePoint(
      ...stringToCodePoints(name, codePoint =>
        shiftAlphabetCodePoint(codePoint, id)
      )
    )
);

assert.strictEqual(realRoomSectorIDsSum, 409147, 'Part 1 failed');
assert.strictEqual(northPoleSector?.id, 991, 'Part 2 failed');
