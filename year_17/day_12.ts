import {getInputLines} from 'lib/input';

const lines = await getInputLines({year: 2017, day: 12});

function parseProgram(program: string) {
  const [id, connections] = program.split(' <-> ');
  return {id, connections: connections.split(', ')};
}

function findGroup(programs: Map<string, string[]>, start: string) {
  const group = new Set<string>();
  const stack = [start];

  while (stack.length > 0) {
    const current = stack.pop()!;
    group.add(current);

    for (const connection of programs.get(current) ?? []) {
      if (!group.has(connection)) {
        stack.push(connection);
      }
    }
  }
  return group;
}

function countGroups(init: Map<string, string[]>) {
  const programs = new Map(init);
  let count = 0;

  while (programs.size > 0) {
    const start = programs.keys().next().value;
    const group = findGroup(programs, start);

    for (const id of group) {
      programs.delete(id);
    }
    count++;
  }
  return count;
}

const programs = new Map(
  lines.map((line) => {
    const {id, connections} = parseProgram(line);
    return [id, connections];
  }),
);

const group0 = findGroup(programs, '0');
const groupsCount = countGroups(programs);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(group0.size).toBe(145);
  });

  test('part 2', () => {
    expect(groupsCount).toBe(207);
  });
}
