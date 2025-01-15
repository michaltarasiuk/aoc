import assert from 'node:assert';

import {getInputParagraphs} from 'lib/input.js';

const [replacements, [molecule]] = await getInputParagraphs({
  year: 2015,
  day: 19,
});

const distincts = new Set<string>();
for (const replacement of replacements) {
  const [a, b] = replacement.split(' => ');
  for (const match of molecule.matchAll(new RegExp(a, 'g'))) {
    distincts.add([...molecule].toSpliced(match.index, a.length, b).join(''));
  }
}

assert.strictEqual(distincts.size, 518, 'Part 1 failed');
