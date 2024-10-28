import {raise} from 'lib/assert.js';
import {getInputParagraphs} from 'lib/input.js';
import {extractInts} from 'lib/parse.js';

const [stacks, instructions] = await getInputParagraphs({year: 2022, day: 5});

function parseCrate(crate: string) {
  const emptyCrateRe = /\s/;
  return emptyCrateRe.test(crate) ? undefined : crate;
}

type Stacks = ReturnType<typeof parseStacks>;

function parseStacks([...stacks]: string[]) {
  const ids = stacks.pop() ?? raise('No stack IDs found');

  return Object.fromEntries(
    extractInts(ids).map(id => {
      const i = ids.indexOf(String(id));
      return [id, stacks.flatMap(crates => parseCrate(crates[i]) ?? [])];
    })
  );
}

function stacksToString(stacks: Stacks) {
  return Object.values(stacks)
    .map(([crate]) => crate)
    .join('');
}

function rearrangeStacks(
  stacks: Stacks,
  instructions: number[][],
  fn = (crates: string[]) => crates
) {
  return instructions.reduce((acc, [count, from, to]) => {
    const crates = acc[from].splice(0, count);

    acc[to].unshift(...fn(crates));
    return acc;
  }, structuredClone(stacks));
}

const parsedStacks = parseStacks(stacks);
const parsedInstructions = instructions.map(extractInts);

const serializedStacks = stacksToString(
  rearrangeStacks(parsedStacks, parsedInstructions, crates =>
    crates.toReversed()
  )
);
const serializedStacks2 = stacksToString(
  rearrangeStacks(parsedStacks, parsedInstructions)
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(serializedStacks).toBe('QGTHFZBHV');
  });

  test('part 2', () => {
    expect(serializedStacks2).toBe('MGDMPSZTM');
  });
}
