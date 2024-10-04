import {getInput} from 'lib/input.js';
import {sum} from 'lib/math.js';
import {isObject} from 'lib/predicate.js';

const input = await getInput({year: 2015, day: 12});

const ns: number[] = [];
const ns2: number[] = [];

const parsed = JSON.parse(input, (_, v: unknown) => {
  if (typeof v === 'number') {
    ns.push(v);
  }
  return v;
});

JSON.stringify(parsed, (_, v: unknown) => {
  if (isObject(v)) {
    for (const color of Object.values(v)) {
      if (color === 'red') return;
    }
  } else if (typeof v === 'number') {
    ns2.push(v);
  }

  return v;
});

const documentNsSum = sum(...ns);
const documentNsSum2 = sum(...ns2);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(documentNsSum).toBe(191164);
  });

  test('part 2', () => {
    expect(documentNsSum2).toBe(87842);
  });
}
