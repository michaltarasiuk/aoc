import {getInputCols} from 'lib/input';
import {frequencies} from 'lib/iterable';

const cols = await getInputCols({year: 2016, day: 6});

function getErrorCorrectedMessage(comparefn = (a: number, b: number) => a - b) {
  return cols.reduce((acc, chars) => {
    const charsCount = frequencies(chars);
    const [[char]] = Array.from(charsCount).toSorted((a, b) =>
      comparefn(a[1], b[1])
    );

    return acc + char;
  }, '');
}

const errorCorrectedMessage = getErrorCorrectedMessage((a, b) => b - a);
const orginalErrorCorrectedMessage = getErrorCorrectedMessage();

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(errorCorrectedMessage).toBe('cyxeoccr');
  });

  test('part 2', () => {
    expect(orginalErrorCorrectedMessage).toBe('batwpask');
  });
}
