import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await readInput({year: 2017, day: 16});

function dance(moves: string[], ...programs: string[]) {
  for (const m of moves) {
    const [, type, args] = m.match(/^([sxp])(.*)/) ?? raise('Invalid move');
    const [arg1, arg2] = args.split('/');
    switch (type) {
      case 's': {
        const n = Number(arg1);
        programs.unshift(...programs.splice(-n));
        break;
      }
      case 'x': {
        const a = Number(arg1);
        const b = Number(arg2);
        [programs[a], programs[b]] = [programs[b], programs[a]];
        break;
      }
      case 'p': {
        const a = programs.indexOf(arg1);
        const b = programs.indexOf(arg2);
        [programs[a], programs[b]] = [programs[b], programs[a]];
        break;
      }
    }
  }
  return programs.join('');
}

const Programs = 'abcdefghijklmnop';

const moves = input.split(',');

let programs = Programs;
let stepsToRepeat = 0;
for (let i = 1; i <= 1_000_000_000; i++) {
  if ((programs = dance(moves, ...programs)) === Programs) {
    stepsToRepeat = i;
    break;
  }
}
for (let i = 1; i <= 1_000_000_000 % stepsToRepeat; i++) {
  programs = dance(moves, ...programs);
}

assert.strictEqual(
  dance(moves, ...Programs),
  'namdgkbhifpceloj',
  'Part 1 failed'
);
assert.strictEqual(programs, 'ibmchklnofjpdeag', 'Part 2 failed');
