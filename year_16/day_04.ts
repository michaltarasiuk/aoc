import {getInputLines} from 'lib/input';
import {frequencies} from 'lib/iterable';
import {sum} from 'lib/math';
import {stringToCodePoints} from 'lib/string';

const lines = await getInputLines({year: 2016, day: 4});

type Room = ReturnType<typeof parseRoom>;

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

function findSectorID(storage: string, ...rooms: Room[]) {
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

const realRoomSectorIDsSum = sum(
  ...rooms.map(({name, id, checksum}) =>
    checksum === calcChecksum(...name) ? id : 0
  )
);
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
