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

const programs = new Map(
  lines.map((line) => {
    const {id, connections} = parseProgram(line);
    return [id, connections];
  }),
);

const group0 = findGroup(programs, '0');

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(group0.size).toBe(145);
  });
}
