import {getInput} from 'lib/input';

const input = await getInput({year: 2022, day: 6});

function findLastIndexOfMarker(markerSize: number) {
  let lastIndex: number | undefined;

  for (let i = 0; i < input.length; i++) {
    const marker = new Set(input.slice(i, i + markerSize));

    if (marker.size === markerSize) {
      lastIndex = i + markerSize;
      break;
    }
  }
  return lastIndex;
}

const lastIndex = findLastIndexOfMarker(4);
const lastIndex2 = findLastIndexOfMarker(14);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(lastIndex).toBe(1343);
  });

  test('part 2', () => {
    expect(lastIndex2).toBe(2193);
  });
}
