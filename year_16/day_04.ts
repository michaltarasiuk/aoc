import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {frequencies} from 'lib/iterable.js';
import {stringToCodePoints} from 'lib/string.js';

const lines = await getInputLines({year: 2016, day: 4});

function parseRoom(room: string) {
  const roomRe = /^([\w-]+)-(\d+)\[(\w+)\]$/;
  const [, name, id, checksum] = room.match(roomRe) ?? raise('Invalid room');

  return {name: name.replace(/-/g, ''), id: Number(id), checksum};
}

function calcChecksum(...chars: string[]) {
  return Array.from(frequencies(chars))
    .toSorted(([charA, countA], [charB, countB]) => {
      return countB - countA || charA.localeCompare(charB);
    })
    .slice(0, 5)
    .map(([char]) => char)
    .join('');
}

function shiftAlphabetCodePoint(codePoint: number, shift: number) {
  return ((codePoint - 97 + shift) % 26) + 97;
}
function findSectorID(
  storage: string,
  ...rooms: ReturnType<typeof parseRoom>[]
) {
  const room = rooms.find(
    ({name, id}) =>
      storage ===
      String.fromCodePoint(
        ...stringToCodePoints(name, codePoint =>
          shiftAlphabetCodePoint(codePoint, id)
        )
      )
  );
  return room?.id ?? raise('Sector ID not found');
}

const rooms = lines.map(parseRoom);

const realRoomSectorIDsSum = rooms.reduce((acc, {name, id, checksum}) => {
  if (checksum === calcChecksum(...name)) {
    acc += id;
  }
  return acc;
}, 0);
const NorthPoleObjectStorage = 'northpoleobjectstorage';
const northPoleSectorID = findSectorID(NorthPoleObjectStorage, ...rooms);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(realRoomSectorIDsSum).toBe(409147));
  test('part 2', () => expect(northPoleSectorID).toBe(991));
}
