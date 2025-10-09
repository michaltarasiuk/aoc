import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2015, day: 19});
const [replacements, molecule] = input.split('\n\n');

const uniqueMolecules = new Set<string>();
for (const r of replacements.split('\n')) {
  const [a, b] = r.split(' => ');
  for (const m of molecule.matchAll(new RegExp(a, 'g'))) {
    uniqueMolecules.add([...molecule].toSpliced(m.index, a.length, b).join(''));
  }
}

assert.strictEqual(uniqueMolecules.size, 518, 'Part 1 failed');
