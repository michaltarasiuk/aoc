import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2017, day: 7});

type Program = ReturnType<typeof parseProgram>;

function parseProgram(program: string) {
  const programRe = /(\w+|\d+)/g;
  const [name, weight, ...children] = program.match(programRe)!;

  return {name, weight: Number(weight), children};
}

function findRoot(...programs: Program[]) {
  const children = new Set(programs.flatMap(p => p.children));

  for (const program of programs) {
    if (!children.has(program.name)) {
      return program;
    }
  }
}

const root = findRoot(...lines.map(parseProgram));

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(root?.name).toBe('rqwgj');
  });
}
