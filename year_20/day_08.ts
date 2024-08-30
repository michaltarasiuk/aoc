import {getInputLines} from 'lib/input';

const lines = await getInputLines({year: 2020, day: 8});

function runProgram(instructions: {op: string; arg: number}[]) {
  const state = {acc: 0, ip: 0};
  const seen = new Set<number>();

  while (true) {
    if (seen.has(state.ip)) {
      break;
    } else {
      seen.add(state.ip);
    }

    const {op, arg} = instructions[state.ip];
    switch (op) {
      case 'acc':
        state.acc += arg;
        state.ip++;
        break;
      case 'jmp':
        state.ip += arg;
        break;
      case 'nop':
        state.ip++;
        break;
    }
  }
  return state.acc;
}

const instructions = lines.map((line) => {
  const [op, arg] = line.split(/\s/);
  return {op, arg: Number(arg)};
});

const acc = runProgram(instructions);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(acc).toBe(1782);
  });
}
