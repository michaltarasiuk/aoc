import {getInputLines} from 'lib/input';
import {raise} from 'lib/raise';

const lines = await getInputLines({year: 2022, day: 21});

function workOutMonkeyNamed(jobs: Map<string, string>, name: string): number {
  const yell = jobs.get(name) ?? raise(`No job for ${name}`);
  const parsed = Number(yell);

  if (Number.isNaN(parsed)) {
    const [a, op, b] = yell.split(/\s/);
    return eval(workOutMonkeyNamed(jobs, a) + op + workOutMonkeyNamed(jobs, b));
  }
  return parsed;
}

const jobs = new Map(
  lines.map((line) => {
    const jobRe = /^(\w{4}): (.+)$/;
    const [, name, yell] = jobRe.exec(line)!;

    return [name, yell];
  }),
);

const yell = workOutMonkeyNamed(jobs, 'root');

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(yell).toBe(142707821472432);
  });
}
