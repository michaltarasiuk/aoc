import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2015, day: 18});

const LightOn = '#';
const LightOff = '.';

type Lights = typeof lights;

function getAdjacentLights(lights: Lights, {x, y}: {x: number; y: number}) {
  const NeighborOffsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  return NeighborOffsets.map(
    ([dy, dx]) => lights[y + dy]?.[x + dx] ?? LightOff
  );
}

function getNewLight(light: string, adjacents: string[]) {
  const lightsOnCount = adjacents.filter(light => light === LightOn).length;
  if (light === LightOn) {
    return lightsOnCount === 2 || lightsOnCount === 3 ? LightOn : LightOff;
  } else {
    return lightsOnCount === 3 ? LightOn : LightOff;
  }
}

const StepsCount = 100;

let lights = input.split(/\n/).map(([...l]) => l);
for (let step = 0; step < StepsCount; step++) {
  lights = lights.map((row, y) =>
    row.map((light, x) => getNewLight(light, getAdjacentLights(lights, {x, y})))
  );
}
const lightsOnCount = lights.flat().filter(light => light === LightOn).length;

assert.strictEqual(lightsOnCount, 821, 'Part 1 failed');
