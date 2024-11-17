import {raise} from 'lib/assert.js';
import {getInputParagraphs} from 'lib/input.js';
import {parseNumbers} from 'lib/parse.js';

const [stacks, instructs] = await getInputParagraphs({year: 2022, day: 5});

function createStacks([...rawStacks]: string[]) {
  const ids = rawStacks.pop() ?? raise('No stack IDs found');
  const stacks = Object.fromEntries(
    parseNumbers(ids).map(id => {
      const i = ids.indexOf(String(id));
      return [
        id,
        rawStacks.flatMap(crates => (/\s/.test(crates[i]) ? [] : crates[i])),
      ];
    })
  );

  return {
    move([count, from, to]: number[], fn = (crates: string[]) => crates) {
      stacks[to].unshift(...fn(stacks[from].splice(0, count)));
      return this;
    },
    toString() {
      return Object.values(stacks)
        .map(([crate]) => crate)
        .join('');
    },
  };
}

const parsedInstructs = instructs.map(instruct => parseNumbers(instruct));

const serializedStacks = parsedInstructs
  .reduce(
    (stacks, instruct) => stacks.move(instruct, crates => crates.toReversed()),
    createStacks(stacks)
  )
  .toString();
const serializedStacks2 = parsedInstructs
  .reduce((stacks, instruct) => stacks.move(instruct), createStacks(stacks))
  .toString();

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(serializedStacks).toBe('QGTHFZBHV'));
  test('part 2', () => expect(serializedStacks2).toBe('MGDMPSZTM'));
}
