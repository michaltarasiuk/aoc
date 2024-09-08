import {getInputLines} from 'lib/input.js';
import {chunkEvery} from 'lib/iterable.js';

const lines = await getInputLines({year: 2022, day: 3});

function splitRucksack(rucksack: string) {
  return [
    rucksack.slice(0, rucksack.length / 2),
    rucksack.slice(rucksack.length / 2),
  ] as const;
}

function calcPriority(char: string) {
  const codePoint = char.codePointAt(0)!;

  if (char >= 'a' && char <= 'z') {
    return codePoint - 'a'.codePointAt(0)! + 1;
  } else if (char >= 'A' && char <= 'Z') {
    return codePoint - 'A'.codePointAt(0)! + 27;
  }
  throw new Error(`Invalid char: ${char}`);
}

const prioritiesSum = lines.reduce((acc, rucksack) => {
  const [a, b] = splitRucksack(rucksack);
  const [char] = new Set(a).intersection(new Set(b));

  return acc + calcPriority(char);
}, 0);

const prioritiesSum2 = chunkEvery(lines, 3).reduce((acc, [a, b, c]) => {
  const [char] = new Set(a).intersection(new Set(b)).intersection(new Set(c));
  return acc + calcPriority(char);
}, 0);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(prioritiesSum).toBe(8153);
  });

  test('part 2', () => {
    expect(prioritiesSum2).toBe(2342);
  });
}
