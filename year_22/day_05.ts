import assert from 'node:assert';

import {getInputParagraphs} from 'lib/input.js';

const [stacks, instructions] = await getInputParagraphs({year: 2022, day: 5});
const [stackIds, ...crateStacks] = stacks.toReversed();

function parseInstruction(i: string) {
  const instructionRe = /^move (\d+) from (\d+) to (\d+)$/;
  const [_, amount, from, to] = instructionRe.exec(i) ?? [];
  return [Number(amount), Number(from), Number(to)];
}
function cratesToString(crates: Record<string, string[]>) {
  return Object.values(crates)
    .map(([crate]) => crate)
    .join('');
}

const stackIdMap = Object.fromEntries(
  stackIds.matchAll(/\d/g).map(m => [m.index, m[0]])
);

const cratesPart1: Record<string, string[]> = {};
for (const s of crateStacks) {
  for (const m of s.matchAll(/\w+/g)) {
    cratesPart1[stackIdMap[m.index]] ??= [];
    cratesPart1[stackIdMap[m.index]].unshift(m[0]);
  }
}
const cratesPart2 = structuredClone(cratesPart1);

for (const i of instructions) {
  const [amount, from, to] = parseInstruction(i);
  cratesPart1[to].unshift(...cratesPart1[from].splice(0, amount).toReversed());
  cratesPart2[to].unshift(...cratesPart2[from].splice(0, amount));
}

assert.strictEqual(cratesToString(cratesPart1), 'QGTHFZBHV', 'Part 1 failed');
assert.strictEqual(cratesToString(cratesPart2), 'MGDMPSZTM', 'Part 2 failed');
