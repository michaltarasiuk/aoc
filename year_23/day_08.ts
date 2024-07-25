import {getInputParagraphs} from 'lib/input';

const [[instructions], maps] = await getInputParagraphs({year: 2023, day: 8});

const parsedMaps = maps.reduce<Record<string, [string, string]>>((acc, map) => {
  const mapRe = /^(\w{3}) = \((\w{3}), (\w{3})\)$/;
  const [, name, left, right] = map.match(mapRe)!;

  acc[name] = [left, right];
  return acc;
}, {});

const START_NODE = 'AAA';
const TARGET_NODE = 'ZZZ';

let node = START_NODE;
let steps = 0;

while (node !== TARGET_NODE) {
  const instruction = instructions[steps % instructions.length];
  const [left, right] = parsedMaps[node];

  node = instruction === 'L' ? left : right;
  steps++;
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(steps).toBe(20569);
  });
}
