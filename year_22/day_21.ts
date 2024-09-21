import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2022, day: 21});

type Monkey = ReturnType<typeof parseMonkey>;
type Monkeys = Map<Monkey['name'], Monkey['job']>;

function parseMonkey(monkey: string) {
  const monkeyRe = /^(\w{4}): (.+)$/;
  const [, name, job] = monkeyRe.exec(monkey)!;

  return {name, job};
}

function yell(monkeys: Monkeys, name: Monkey['name']): number {
  const job = monkeys.get(name)!;
  const parsedJob = Number(job);

  if (Number.isNaN(parsedJob)) {
    const [a, op, b] = job.split(/\s/);
    return eval(yell(monkeys, a) + op + yell(monkeys, b));
  }
  return parsedJob;
}

const monkeys: Monkeys = new Map(
  lines.map(line => {
    const {name, job} = parseMonkey(line);
    return [name, job];
  })
);

const n = yell(monkeys, 'root');

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(n).toBe(142707821472432);
  });
}
