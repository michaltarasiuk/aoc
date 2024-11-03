import {raise} from 'lib/assert.js';
import {getInputParagraphs} from 'lib/input.js';
import {extractInts} from 'lib/parse.js';

const [stacks, instructions] = await getInputParagraphs({year: 2022, day: 5});

function parseCrate(crate: string) {
  const emptyCrateRe = /\s/;
  return emptyCrateRe.test(crate) ? undefined : crate;
}

function createStacks([...input]: string[]) {
  const ids = input.pop() ?? raise('No stack IDs found');
  const stacks = Object.fromEntries(
    extractInts(ids).map(id => {
      const i = ids.indexOf(String(id));
      return [id, input.flatMap(crates => parseCrate(crates[i]) ?? [])];
    })
  );

  return {
    move([count, from, to]: number[], fn = (crates: string[]) => crates) {
      const crates = stacks[from].splice(0, count);
      stacks[to].unshift(...fn(crates));
      return this;
    },
    toString() {
      return Object.values(stacks)
        .map(([crate]) => crate)
        .join('');
    },
  };
}

const parsedInstructions = instructions.map(extractInts);

const serializedStacks = parsedInstructions
  .reduce(
    (stacks, instruction) =>
      stacks.move(instruction, crates => crates.toReversed()),
    createStacks(stacks)
  )
  .toString();

const serializedStacks2 = parsedInstructions
  .reduce(
    (stacks, instruction) => stacks.move(instruction),
    createStacks(stacks)
  )
  .toString();

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(serializedStacks).toBe('QGTHFZBHV'));
  test('part 2', () => expect(serializedStacks2).toBe('MGDMPSZTM'));
}
