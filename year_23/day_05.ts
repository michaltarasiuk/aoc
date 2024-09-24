import {getInputParagraphs} from 'lib/input.js';
import {extractInts} from 'lib/parse.js';

const [[seeds], ...paragraphs] = await getInputParagraphs({year: 2023, day: 5});

type Map = ReturnType<typeof parseMap>;

function parseMap(map: string) {
  const mapRe = /^(\d+) (\d+) (\d+)$/;
  const [, destination, source, length] = map.match(mapRe)!.map(Number);

  return {destination, source, length};
}

function findLocation([...mapLayers]: Map[][], value: number) {
  const mapLayer = mapLayers.shift();
  if (!mapLayer) {
    return value;
  }

  for (const {destination, source, length} of mapLayer) {
    if (value >= source && value < source + length) {
      return findLocation(mapLayers, destination + (value - source));
    }
  }
  return findLocation(mapLayers, value);
}

const mapLayers = paragraphs.map(([, ...mapLayer]) => mapLayer.map(parseMap));
const lowestLocation = Math.min(
  ...extractInts(seeds).map(seed => findLocation(mapLayers, seed))
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(lowestLocation).toBe(323142486);
  });
}
