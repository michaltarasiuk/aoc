import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputParagraphs} from 'lib/input.js';
import {parseNumbers} from 'lib/parse.js';

const [rawStacks, instructs] = await getInputParagraphs({year: 2022, day: 5});

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

const stacks = createStacks(rawStacks);
const stacks2 = createStacks(rawStacks);
for (const instruct of instructs.map(instruct => parseNumbers(instruct))) {
  stacks.move(instruct, crates => crates.toReversed());
  stacks2.move(instruct);
}

assert.strictEqual(stacks.toString(), 'QGTHFZBHV', 'Part 1 failed');
assert.strictEqual(stacks2.toString(), 'MGDMPSZTM', 'Part 2 failed');
