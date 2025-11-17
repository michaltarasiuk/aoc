import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await fetchInput({year: 2016, day: 8});

const Tall = 6;
const Wide = 50;

const screen = Array(Tall)
  .fill(0)
  .map(() => Array<boolean>(Wide).fill(false));

for (const l of input.split(/\n/)) {
  const op = parseRect(l) ?? parseRotate(l) ?? raise('Invalid operation');
  switch (op.type) {
    case 'rect': {
      for (let y = 0; y < op.y; y++) {
        screen[y].fill(true, 0, op.x);
      }
      break;
    }
    case 'rotate-row': {
      screen[op.index] = screen[op.index].map(
        (_, i) => screen[op.index][(i - op.amount + Wide) % Wide]
      );
      break;
    }
    case 'rotate-column': {
      const column = screen.map(row => row[op.index]);
      for (let y = 0; y < Tall; y++) {
        screen[y][op.index] = column[(y - op.amount + Tall) % Tall];
      }
      break;
    }
  }
}

function parseRect(l: string) {
  const m = l.match(/^rect (\d+)x(\d+)$/);
  if (!m) {
    return;
  }
  return {
    type: 'rect' as const,
    x: Number(m[1]),
    y: Number(m[2]),
  };
}

function parseRotate(l: string) {
  const m = l.match(/^rotate (row|column) [xy]=(\d+) by (\d+)$/);
  if (!m) {
    return;
  }
  return {
    type: `rotate-${m[1] as 'row' | 'column'}` as const,
    index: Number(m[2]),
    amount: Number(m[3]),
  };
}

assert.strictEqual(screen.flat().filter(Boolean).length, 116, 'Part 1 failed');
