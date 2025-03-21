import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await readInput({year: 2017, day: 12});

function parseProgram(program: string) {
  const [id, connections] = program.split(' <-> ');
  return {id, connections: connections.split(', ')};
}

function findGroup(programs: Map<string, string[]>, start: string) {
  const group = new Set<string>();
  const stack = [start];
  while (stack.length > 0) {
    const current = stack.shift() ?? raise('Empty stack');
    group.add(current);
    for (const connection of programs.get(current) ?? []) {
      if (!group.has(connection)) {
        stack.push(connection);
      }
    }
  }
  return group;
}

function countGroups(programs: Map<string, string[]>) {
  const groups = new Set<string>();
  for (const id of programs.keys()) {
    groups.add([...findGroup(programs, id)].sort().join());
  }
  return groups.size;
}

const programs = new Map(
  input.split(/\n/).map(l => {
    const {id, connections} = parseProgram(l);
    return [id, connections];
  })
);

const group0 = findGroup(programs, '0');
const groupsCount = countGroups(programs);

assert.strictEqual(group0.size, 145, 'Part 1 failed');
assert.strictEqual(groupsCount, 207, 'Part 2 failed');
