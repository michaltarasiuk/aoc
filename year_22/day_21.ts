import assert from 'node:assert';

import {getInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await getInput({year: 2022, day: 21});

function parseMonkeyJob(monkeyJob: string) {
  const monkeyJobRe = /^(\w{4}): (.+)$/;
  const [, name, description] =
    monkeyJobRe.exec(monkeyJob) ?? raise('Invalid monkey job');

  return [name, description] as const;
}

function calcYell(
  monkeyJobs: Record<string, string>,
  monkeyName: string
): number {
  const job = monkeyJobs[monkeyName];
  const parsedJob = Number(job);
  if (Number.isNaN(parsedJob)) {
    const [a, operator, b] = job.split(/\s/);
    return eval(calcYell(monkeyJobs, a) + operator + calcYell(monkeyJobs, b));
  }
  return parsedJob;
}

const monkeyJobs = Object.fromEntries(input.split(/\n/).map(parseMonkeyJob));
const rootYell = calcYell(monkeyJobs, 'root');

assert.strictEqual(rootYell, 142707821472432, 'Part 1 failed');
