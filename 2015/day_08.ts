import {getInputLns} from 'lib/input';
import {sum} from 'lib/sum';

const lns = await getInputLns({year: 2015, day: 8});

const ns = lns.map(({length}) => length);

const ns2 = (<string[]>eval(`[${lns.join()}]`)).map(({length}) => length);
const result = sum(...ns) - sum(...ns2);

const ns3 = lns.map((ln) => JSON.stringify(ln).length);
const result2 = sum(...ns3) - sum(...ns);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(result).toBe(1350);
  });

  test('part 2', () => {
    expect(result2).toBe(2085);
  });
}
