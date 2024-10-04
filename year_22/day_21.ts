import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2022, day: 21});

type Monkeys = Record<string, string>;

function yell(monkeys: Monkeys, name: keyof Monkeys): number {
  const job = monkeys[name];
  const parsedJob = Number(job);

  if (Number.isNaN(parsedJob)) {
    const [a, op, b] = job.split(/\s/);
    return eval(yell(monkeys, a) + op + yell(monkeys, b));
  }
  return parsedJob;
}

const monkeys = lines.reduce<Monkeys>((acc, l) => {
  const monkeyRe = /^(\w{4}): (.+)$/;
  const [, name, job] = monkeyRe.exec(l)!;

  return {...acc, [name]: job};
}, {});

const n = yell(monkeys, 'root');

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(n).toBe(142707821472432);
  });
}
