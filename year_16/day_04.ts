import {getInputLines} from 'lib/input.js';
import {frequencies} from 'lib/iterable.js';
import {stringToCodePoints} from 'lib/string.js';

const lines = await getInputLines({year: 2016, day: 4});

function parseRoom(room: string) {
  const roomRe = /^([\w-]+)-(\d+)\[(\w+)\]$/;
  const [, name, id, checksum] = room.match(roomRe)!;

  return {name: name.replace(/-/g, ''), id: Number(id), checksum};
}

function calcChecksum(...chars: string[]) {
  const charsCount = frequencies(chars);

  return Array.from(charsCount)
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
  for (const {name, id} of rooms) {
    const decoded = String.fromCodePoint(
      ...stringToCodePoints(name, codePoint =>
        shiftAlphabetCodePoint(codePoint, id)
      )
    );
    if (storage === decoded) {
      return id;
    }
  }
}

const rooms = lines.map(parseRoom);

const realRoomSectorIDsSum = rooms.reduce((acc, {name, id, checksum}) => {
  if (checksum === calcChecksum(...name)) {
    acc += id;
  }
  return acc;
}, 0);
const northPoleSectorID = findSectorID('northpoleobjectstorage', ...rooms);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(realRoomSectorIDsSum).toBe(409147);
  });

  test('part 2', () => {
    expect(northPoleSectorID).toBe(991);
  });
}
