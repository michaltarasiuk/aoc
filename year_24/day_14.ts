import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2024, day: 14});

const Time = 100;
const TilesWide = 101;
const TilesTall = 103;

const horizontalMiddle = Math.floor(TilesWide / 2);
const verticalMiddle = Math.floor(TilesTall / 2);

const robotRe = /^p=(\d+),(\d+) v=(-?\d+),(-?\d+)$/;
const robots = input.split(/\n/).map(l => {
  const [, px, py, vx, vy] = (robotRe.exec(l) ?? []).map(Number);
  return {px, py, vx, vy};
});

const positions = robots.map(({px, py, vx, vy}) => {
  const x = (px + vx * Time) % TilesWide;
  const y = (py + vy * Time) % TilesTall;
  return {
    x: x < 0 ? x + TilesWide : x,
    y: y < 0 ? y + TilesTall : y,
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
