import {extractInts} from 'lib/extract_ints';
import {getInputParagraphs} from 'lib/input';

const [[seeds], ...paragraphs] = await getInputParagraphs({year: 2023, day: 5});

const maps = paragraphs.map(([, ...maps]) => maps.map(extractInts));

function findLocation(value: number, level = 0) {
  if (level === maps.length) {
    return value;
  }

  for (const [destination, source, length] of maps[level]) {
    if (value >= source && value < source + length) {
      return findLocation(destination + (value - source), level + 1);
    }
  }
  return findLocation(value, level + 1);
}

const lowestLocation = Math.min(
  ...extractInts(seeds).map((seed) => findLocation(seed)),
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(lowestLocation).toBe(323142486);
  });
}
