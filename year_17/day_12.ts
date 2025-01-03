import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2017, day: 12});

function parseProgram(program: string) {
  const [id, connections] = program.split(' <-> ');
  return {id, connections: connections.split(', ')};
}

function findGroup(programs: Map<string, string[]>, start: string) {
  const group = new Set<string>();
  const stack = [start];

  while (stack.length > 0) {
    const current = stack.pop() ?? raise('Empty stack');
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
  lines.map(l => {
    const {id, connections} = parseProgram(l);
    return [id, connections];
  })
);

const group0 = findGroup(programs, '0');
const groupsCount = countGroups(programs);

assert.strictEqual(group0.size, 145, 'Part 1 failed');
assert.strictEqual(groupsCount, 207, 'Part 2 failed');
