import assert from 'node:assert';

import {getInputParagraphs} from 'lib/input.js';
import {extractInts} from 'lib/parse.js';

const paragraphs = await getInputParagraphs({year: 2024, day: 13});

type Buttons = [A: [x: number, y: number], B: [x: number, y: number]];
type Shape = [...Buttons, Prize: [X: number, Y: number]];
const games = paragraphs.map(p => p.map(l => extractInts(l))) as Shape[];

function getPoint(
  [aClicks, bClicks]: [number, number],
  [[aX, aY], [bX, bY]]: Buttons
) {
  return [aClicks * aX + bClicks * bX, aClicks * aY + bClicks * bY] as const;
}
function isOut(
  clicks: [a: number, b: number],
  [buttonA, buttonB, [prizeX, prizeY]]: Shape
) {
  const [x, y] = getPoint(clicks, [buttonA, buttonB]);
  return x > prizeX || y > prizeY;
}

const A = 3;
const B = 1;

let totalTokensSpent = 0;
for (const game of games) {
  const [buttonA, buttonB, [prizeX, prizeY]] = game;
  for (let a = 0; !isOut([a, 0], game); ++a) {
    for (let b = 0; !isOut([a, b], game); ++b) {
      const [x, y] = getPoint([a, b], [buttonA, buttonB]);
      if (x === prizeX && y === prizeY) {
        totalTokensSpent += a * A + b * B;
      }
    }
  }
}

assert.strictEqual(totalTokensSpent, 29711, 'Part 1 failed');
