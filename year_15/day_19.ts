import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2015, day: 19});
const [replacements, molecule] = input.split('\n\n');

const distincts = new Set<string>();
for (const r of replacements.split('\n')) {
  const [a, b] = r.split(' => ');
  for (const m of molecule.matchAll(new RegExp(a, 'g'))) {
    distincts.add([...molecule].toSpliced(m.index, a.length, b).join(''));
  }
}

assert.strictEqual(distincts.size, 518, 'Part 1 failed');
