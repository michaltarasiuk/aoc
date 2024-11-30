import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2022, day: 21});

function parseMonkeyJob(monkeyJob: string) {
  const monkeyJobRe = /^(\w{4}): (.+)$/;
  const [, monkeyName, jobDescription] =
    monkeyJobRe.exec(monkeyJob) ?? raise('Invalid monkey job');

  return [monkeyName, jobDescription] as const;
}

function calcYell(
  monkeyJobs: Record<string, string>,
  monkeyName: string
): number {
  const jobDescription = monkeyJobs[monkeyName];
  const numericJob = Number(jobDescription);

  if (Number.isNaN(numericJob)) {
    const [firstMonkey, operator, secondMonkey] = jobDescription.split(/\s/);
    return eval(
      calcYell(monkeyJobs, firstMonkey) +
        operator +
        calcYell(monkeyJobs, secondMonkey)
    );
  }
  return numericJob;
}

const monkeyJobs = Object.fromEntries(lines.map(parseMonkeyJob));
const rootYell = calcYell(monkeyJobs, 'root');

assert.strictEqual(rootYell, 142707821472432, 'Part 1 failed');
