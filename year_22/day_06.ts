import {getInput} from 'lib/input';
import {uniq} from 'lib/uniq';

const input = await getInput({year: 2022, day: 6});

function findLastIndexOfMarker([...characters]: string, length: number) {
  let lastIndex: number | undefined;

  for (const i of characters.keys()) {
    if (uniq(input.slice(i, i + length)).length === length) {
      lastIndex = i + length;
      break;
    }
  }
  return lastIndex;
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
