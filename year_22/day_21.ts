import {getInputLines} from 'lib/input';
import {raise} from 'lib/raise';

const jobs = await getInputLines({year: 2022, day: 21});

const jobsMap = new Map(
  jobs.map((job) => {
    const jobRe = /^(\w{4}): (.+)$/;
    const [, name, yell] = jobRe.exec(job)!;

    return [name, yell];
  }),
);

function workOutMonkeyNamed(name: string): number {
  const yell = jobsMap.get(name) ?? raise(`No job for ${name}`);
  const parsed = Number(yell);

  if (Number.isNaN(parsed)) {
    const [a, op, b] = yell.split(/\s/);
    return eval(workOutMonkeyNamed(a) + op + workOutMonkeyNamed(b));
  }
  return parsed;
}

const yell = workOutMonkeyNamed('root');

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(yell).toBe(142707821472432);
  });
}
