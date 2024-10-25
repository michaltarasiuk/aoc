import {getInput} from 'lib/input.js';
import {sum} from 'lib/math.js';
import {isObject} from 'lib/predicate.js';

const input = await getInput({year: 2015, day: 12});

const allNumbers: number[] = [];
const nonRedNumbers: number[] = [];

const parsedDocument = JSON.parse(input, (_, value: unknown) => {
  if (typeof value === 'number') {
    allNumbers.push(value);
  }
  return value;
});

JSON.stringify(parsedDocument, (_, value: unknown) => {
  if (isObject(value)) {
    for (const propertyValue of Object.values(value)) {
      if (propertyValue === 'red') return;
    }
  } else if (typeof value === 'number') {
    nonRedNumbers.push(value);
  }

  return value;
});

const totalSum = sum(...allNumbers);
const nonRedSum = sum(...nonRedNumbers);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(totalSum).toBe(191164);
  });

  test('part 2', () => {
    expect(nonRedSum).toBe(87842);
  });
}
