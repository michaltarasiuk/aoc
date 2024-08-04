import {getInputInts} from 'lib/input';
import {isDefined} from 'lib/is_defined';

const ns = await getInputInts({year: 2020, day: 1});

function findTwoNumbers(ns: number[], target: number) {
  const seen = new Set<number>();

  for (const n of ns) {
    const diff = target - n;

    if (seen.has(diff)) {
      return [n, diff];
    }
    seen.add(n);
  }
  return [];
}

function findThreeNumbers(ns: number[], target: number) {
  for (const i of ns.keys()) {
    const [a, b] = findTwoNumbers(ns.slice(i + 1), target - ns[i]);

    if (isDefined(a) && isDefined(b)) {
      return [ns[i], a, b];
    }
  }
  return [];
}

const [a, b] = findTwoNumbers(ns, 2020);
const [c, d, e] = findThreeNumbers(ns, 2020);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(a * b).toBe(482811);
  });

  test('part 2', () => {
    expect(c * d * e).toBe(193171814);
  });
}
