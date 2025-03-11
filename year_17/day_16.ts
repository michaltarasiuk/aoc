import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await readInput({year: 2017, day: 16});

const programs = [...'abcdefghijklmnop'];

for (const move of input.split(',')) {
  const [, type, args] = move.match(/^([sxp])(.*)/) ?? raise('Invalid move');
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

assert.strictEqual(programs.join(''), 'namdgkbhifpceloj', 'Part 1 failed');
