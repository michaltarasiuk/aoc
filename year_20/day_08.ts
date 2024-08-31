import {getInputLines} from 'lib/input';

const lines = await getInputLines({year: 2020, day: 8});

function runProgram(...instructions: {op: string; arg: number}[]) {
  let acc = 0;
  let ip = 0;
  const seen = new Set<number>();

  while (true) {
    if (seen.has(ip)) {
      break;
    } else {
      seen.add(ip);
    }
    const {op, arg} = instructions[ip];

    switch (op) {
      case 'acc':
        acc += arg;
        ip++;
        break;
      case 'jmp':
        ip += arg;
        break;
      case 'nop':
        ip++;
        break;
    }
  }
  return acc;
}

const acc = runProgram(
  ...lines.map((line) => {
    const [op, arg] = line.split(/\s/);
    return {op, arg: Number(arg)};
  }),
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(acc).toBe(1782);
  });
}
