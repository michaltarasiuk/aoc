import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2024, day: 14});

const TIME = 100;
const TILES_WIDE = 101;
const TILES_TALL = 103;

const horizontalMiddle = Math.floor(TILES_WIDE / 2);
const verticalMiddle = Math.floor(TILES_TALL / 2);

const robotRe = /^p=(\d+),(\d+) v=(-?\d+),(-?\d+)$/;
const robots = input.split(/\n/).map(l => {
  const [, px, py, vx, vy] = (robotRe.exec(l) ?? []).map(Number);
  return {px, py, vx, vy};
});

const positions = robots.map(({px, py, vx, vy}) => {
  const x = (px + vx * TIME) % TILES_WIDE;
  const y = (py + vy * TIME) % TILES_TALL;
  return {
    x: x < 0 ? x + TILES_WIDE : x,
    y: y < 0 ? y + TILES_TALL : y,
  };
});
const {middle: _middle, ...quadrants} = Object.groupBy(positions, ({x, y}) => {
  if (x === horizontalMiddle || y === verticalMiddle) {
    return 'middle';
  } else {
    return `${x < horizontalMiddle ? 'left' : 'right'}-${y < verticalMiddle ? 'top' : 'bottom'}`;
  }
});

const safetyFactor = Object.values(quadrants).reduce(
  (acc, quadrant) => acc * quadrant.length,
  1
);

assert.strictEqual(safetyFactor, 229839456, 'Part 1 failed');
