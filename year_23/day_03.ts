import {getInputLines} from 'lib/input.js';
import {isDefined} from 'lib/predicate.js';

const lines = await getInputLines({year: 2023, day: 3});

function range(n: number, x: number) {
  const Offset = 1;
  return [Math.max(x - Offset, 0), x + String(n).length + Offset] as const;
}

const Offsets = [-1, 0, 1];
const nsLayers = lines
  .map(l =>
    l
      .matchAll(/\d+/g)
      .map(({0: n, index}) => [Number(n), index] as const)
      .toArray()
  )
  .map((ns, y) =>
    ns.map(([n, x]) =>
      Offsets.map(offset => lines[offset + y]?.slice(...range(n, x)))
    )
  );

const symbolRe = /[^\d.]/;
const sumOfPartNumbers = nsLayers.flat().reduce((acc, segments) => {
  if (segments.filter(isDefined).some(s => symbolRe.test(s))) {
    acc += Number(segments[1].replace(/\D/g, ''));
  }
  return acc;
}, 0);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(sumOfPartNumbers).toBe(531561);
  });
}
