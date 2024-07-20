import {frequencies} from 'lib/frequencies';
import {getInputCols} from 'lib/input';

const cols = await getInputCols({year: 2016, day: 6});

function getErrorCorrectedMessage(compareFn: (a: number, b: number) => number) {
  return cols.reduce((acc, chars) => {
    const charsCount = frequencies(chars);
    const [[char]] = Array.from(charsCount).toSorted((a, b) =>
      compareFn(a[1], b[1]),
    );

    return acc + char;
  }, '');
}

const errorCorrectedMessage = getErrorCorrectedMessage((a, b) => b - a);
const orginalErrorCorrectedMessage = getErrorCorrectedMessage((a, b) => a - b);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(errorCorrectedMessage).toBe('cyxeoccr');
  });

  test('part 2', () => {
    expect(orginalErrorCorrectedMessage).toBe('batwpask');
  });
}
