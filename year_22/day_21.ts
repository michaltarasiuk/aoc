import {getInputLines} from 'lib/input';
import {raise} from 'lib/raise';

const lines = await getInputLines({year: 2022, day: 21});

type Monkeys = Map<string, string>;

function yell(monkeys: Monkeys, name: string): number {
  const job = monkeys.get(name) ?? raise(`No job for ${name}`);
  const parsed = Number(job);

  if (Number.isNaN(parsed)) {
    const [a, op, b] = job.split(/\s/);
    return eval(yell(monkeys, a) + op + yell(monkeys, b));
  }
  return parsed;
}

const monkeys: Monkeys = new Map(
  lines.map(line => {
    const monkeyRe = /^(\w{4}): (.+)$/;
    const [, name, job] = monkeyRe.exec(line)!;

    return [name, job];
  })
);

const number = yell(monkeys, 'root');

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(number).toBe(142707821472432);
  });
}
