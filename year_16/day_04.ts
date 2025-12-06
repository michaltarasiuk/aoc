import assert from 'node:assert';

import {frequencies} from '#lib/frequencies.js';
import {fetchInput} from '#lib/input.js';
import {raise} from '#lib/raise.js';
import {stringToCodePoints} from '#lib/string_to_code_points.js';

const input = await fetchInput({year: 2016, day: 4});

function calcChecksum(...chars: string[]) {
  return [...frequencies(chars)]
    .sort(([a, countA], [b, countB]) => countB - countA || a.localeCompare(b))
    .slice(0, 5)
    .map(([char]) => char)
    .join('');
}

function shiftAlphabetCodePoint(codePoint: number, shift: number) {
  return ((codePoint - 97 + shift) % 26) + 97;
}

const roomRe = /^([\w-]+)-(\d+)\[(\w+)\]$/;
const rooms = input.split(/\n/).map(l => {
  const [, name, id, checksum] = roomRe.exec(l) ?? raise('Invalid room');
  return {name: name.replace(/-/g, ''), id: Number(id), checksum};
});

const realRoomSectorIDsSum = rooms
  .filter(({name, checksum}) => checksum === calcChecksum(...name))
  .reduce((acc, {id}) => acc + id, 0);

const northPoleSector = rooms.find(({name, id}) => {
  const decryptedName = String.fromCodePoint(
    ...stringToCodePoints(name, codePoint =>
      shiftAlphabetCodePoint(codePoint, id)
    )
  );
  return decryptedName === 'northpoleobjectstorage';
});

assert.strictEqual(realRoomSectorIDsSum, 409147, 'Part 1 failed');
assert.strictEqual(northPoleSector?.id, 991, 'Part 2 failed');
