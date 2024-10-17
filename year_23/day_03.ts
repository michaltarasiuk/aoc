import {getInputLines} from 'lib/input.js';
import {extractUints} from 'lib/parse.js';
import {isDefined} from 'lib/predicate.js';

const lines = await getInputLines({year: 2023, day: 3});

function range(n: number, x: number) {
  const Padding = 1;
  return [Math.max(x - Padding, 0), x + String(n).length + Padding] as const;
}

const VerticalOffsets = [-1, 0, 1];
const nsLayers = lines
  .map(l =>
    l
      .matchAll(/\d+/g)
      .map(({0: n, index}) => [Number(n), index] as const)
      .toArray()
  )
  .map((ns, y) =>
    ns.map(([n, x]) =>
      VerticalOffsets.map(offset => lines[offset + y]?.slice(...range(n, x)))
    )
  );

const symbolRe = /[^\d.]/;
const sumOfPartNumbers = nsLayers.flat().reduce((acc, segments) => {
  if (segments.filter(isDefined).some(s => symbolRe.test(s))) {
    acc += extractUints(segments[1])[0];
  }
  return acc;
}, 0);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(sumOfPartNumbers).toBe(531561);
  });
}
