import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2018, day: 7});

function parseStep(step: string) {
  const stepRe = /^Step (\w) must be finished before step (\w) can begin.$/;
  const [, before, after] = stepRe.exec(step)!;

  return {before, after};
}

const steps = lines
  .map(parseStep)
  .reduce<Map<string, Set<string>>>((acc, {before, after}) => {
    if (!acc.has(before)) acc.set(before, new Set());
    if (!acc.has(after)) acc.set(after, new Set());

    acc.get(after)!.add(before);
    return acc;
  }, new Map());

const order: string[] = [];
while (steps.size > 0) {
  const [step] = [...steps.keys()]
    .filter(k => [...steps.get(k)!].every(step => order.includes(step)))
    .toSorted();

  steps.delete(step);
  order.push(step);
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(order.join('')).toBe('JDEKPFABTUHOQSXVYMLZCNIGRW');
  });
}
