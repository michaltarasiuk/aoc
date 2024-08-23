import {getInputParagraphs} from 'lib/input';
import {matchInts} from 'lib/ints';

const [stacks, instructions] = await getInputParagraphs({year: 2022, day: 5});

function parseCrate(crate: string) {
  const emptyCrateRe = /\s/;
  return emptyCrateRe.test(crate) ? undefined : crate;
}

function parseStacks([ids, ...supplies]: string[]) {
  return matchInts(ids).reduce<Record<string, string[]>>((acc, id) => {
    const i = ids.indexOf(String(id));

    acc[id] = supplies.flatMap((crates) => parseCrate(crates[i]) ?? []);
    return acc;
  }, {});
}

function stacksToString(stacks: Record<string, string[]>) {
  return Object.values(stacks)
    .flatMap((crates) => crates.at(-1) ?? [])
    .join('');
}

function rearrangStacks(stacks: string[], fn = (crates: string[]) => crates) {
  return instructions.reduce((acc, instruction) => {
    const [count, from, to] = matchInts(instruction);
    const crates = acc[from].splice(-count);

    acc[to].push(...fn(crates));
    return acc;
  }, parseStacks(stacks));
}

const reversedStacks = stacks.toReversed();

const rearrangedStacks = rearrangStacks(reversedStacks, (crates) =>
  crates.toReversed(),
);
const rearrangedStacks2 = rearrangStacks(reversedStacks);

const serializedStacks = stacksToString(rearrangedStacks);
const serializedStacks2 = stacksToString(rearrangedStacks2);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(serializedStacks).toBe('QGTHFZBHV');
  });

  test('part 2', () => {
    expect(serializedStacks2).toBe('MGDMPSZTM');
  });
}
