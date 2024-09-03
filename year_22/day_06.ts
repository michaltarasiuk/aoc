import {getInput} from 'lib/input';
import {uniq} from 'lib/iterable';

const input = await getInput({year: 2022, day: 6});

function findLastIndexOfMarker([...chars]: string, length: number) {
  for (const i of chars.keys()) {
    const lastIndex = i + length;
    const marker = uniq(input.slice(i, lastIndex));

    if (marker.length === length) {
      return lastIndex;
    }
  }
  return -1;
}

const lastIndex = findLastIndexOfMarker(input, 4);
const lastIndex2 = findLastIndexOfMarker(input, 14);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(lastIndex).toBe(1343);
  });

  test('part 2', () => {
    expect(lastIndex2).toBe(2193);
  });
}
