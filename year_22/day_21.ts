import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await readInput({year: 2022, day: 21});

function parseJob(monkeyJob: string) {
  const jobRe = /^(\w{4}): (.+)$/;
  const [, name, description] = jobRe.exec(monkeyJob) ?? raise('Invalid job');

  return [name, description] as const;
}

function calcYell(jobs: Record<string, string>, name: string): number {
  const job = jobs[name];
  const parsedJob = Number(job);
  if (Number.isNaN(parsedJob)) {
    const [a, operator, b] = job.split(/\s/);
    return eval(calcYell(jobs, a) + operator + calcYell(jobs, b));
  }
  return parsedJob;
}

const jobs = Object.fromEntries(input.split(/\n/).map(parseJob));
const rootYell = calcYell(jobs, 'root');

assert.strictEqual(rootYell, 142707821472432, 'Part 1 failed');
