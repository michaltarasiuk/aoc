import {getInputLines} from 'lib/input';

const lines = await getInputLines({year: 2017, day: 7});

function parseProgram(program: string) {
  const programRe = /(\w+|\d+)/g;
  const [name, weight, ...children] = program.match(programRe)!;

  return {name, weight: Number(weight), children};
}

function findRoot(programs: ReturnType<typeof parseProgram>[]) {
  const children = new Set(programs.flatMap(p => p.children));

  for (const program of programs) {
    if (!children.has(program.name)) {
      return program;
    }
  }
  throw new Error('Root not found');
}

const programs = lines.map(parseProgram);
const root = findRoot(programs);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(root.name).toBe('rqwgj');
  });
}
