import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2018, day: 5});

function reactPolymer(polymer: string) {
  const reactionRe = /(\w)(\1)/gi;

  let exec: RegExpExecArray | null;
  let units = polymer;
  while ((exec = reactionRe.exec(units))) {
    const [match, a, b] = exec;
    if (a !== b) {
      units = units.replace(match, '');
      reactionRe.lastIndex = 0;
    } else {
      reactionRe.lastIndex--;
    }
  }
  return units;
}

const reactedPolymer = reactPolymer(input);
const minPolymerLength = 'abcdefghijklmnopqrstuvwxyz'
  .split('')
  .map(unit => {
    const unitRe = new RegExp(unit, 'gi');
    return reactPolymer(input.replace(unitRe, '')).length;
  })
  .reduce((acc, len) => Math.min(acc, len), input.length);

assert.strictEqual(reactedPolymer.length, 10972, 'Part 1 failed');
assert.strictEqual(minPolymerLength, 5278, 'Part 2 failed');
