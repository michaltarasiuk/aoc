import {getInputParagraphs} from 'lib/input.js';
import {extractInts} from 'lib/parse.js';

const [[seeds], ...paragraphs] = await getInputParagraphs({year: 2023, day: 5});

function findLocation([...maps]: number[][][], value: number) {
  const map = maps.shift();
  if (!map) {
    return value;
  }

  for (const [destination, source, length] of map) {
    if (value >= source && value < source + length) {
      return findLocation(maps, destination + (value - source));
    }
  }
  return findLocation(maps, value);
}

const maps = paragraphs.map(([, ...maps]) => maps.map(extractInts));
const lowestLocation = Math.min(
  ...extractInts(seeds).map(seed => findLocation(maps, seed))
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(lowestLocation).toBe(323142486);
  });
}
