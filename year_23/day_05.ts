import {getInputParagraphs} from 'lib/input';
import {matchInts} from 'lib/ints';

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

const maps = paragraphs.map(([, ...maps]) => maps.map(matchInts));
const lowestLocation = Math.min(
  ...matchInts(seeds).map(seed => findLocation(maps, seed))
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(lowestLocation).toBe(323142486);
  });
}
