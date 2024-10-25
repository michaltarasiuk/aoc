import {getInputCols} from 'lib/input.js';
import {frequencies} from 'lib/iterable.js';

const columns = await getInputCols({year: 2016, day: 6});

function decodeMessage(compareFn = (a: number, b: number) => a - b) {
  return columns.reduce((decodedMessage, columnChars) => {
    const charFrequencies = frequencies(columnChars);
    const [[mostFrequentChar]] = Array.from(charFrequencies).toSorted((a, b) =>
      compareFn(a[1], b[1])
    );

    return decodedMessage + mostFrequentChar;
  }, '');
}

const mostFrequentMessage = decodeMessage((a, b) => b - a);
const leastFrequentMessage = decodeMessage();

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(mostFrequentMessage).toBe('cyxeoccr');
  });

  test('part 2', () => {
    expect(leastFrequentMessage).toBe('batwpask');
  });
}
