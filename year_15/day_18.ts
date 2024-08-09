import {getInputGrid} from 'lib/input';

const grid = await getInputGrid({year: 2015, day: 18});

const LIGHT_ON = '#';
const LIGHT_OFF = '.';

type Lights = string[][];

function getNeighbors(lights: Lights, {x, y}: {x: number; y: number}) {
  const NEIGHBORS = [
    [-1, 0, 1],
    [-1, 1],
    [-1, 0, 1],
  ];
  return NEIGHBORS.map((offsets, i) =>
    offsets.flatMap((offset) => lights[y + i - 1]?.[x + offset] ?? []),
  );
}

function calcLightsOn(lights: Lights) {
  const lightsOnRe = new RegExp(LIGHT_ON, 'g');
  return Array.from(lights.join().matchAll(lightsOnRe)).length;
}

function switchLight(light: string, neighbors: Lights) {
  const count = calcLightsOn(neighbors);
  switch (light) {
    case LIGHT_ON:
      return count === 2 || count === 3 ? LIGHT_ON : LIGHT_OFF;
    case LIGHT_OFF:
      return count === 3 ? LIGHT_ON : LIGHT_OFF;
    default:
      throw new Error('Invalid light');
  }
}

function animate(lights: Lights) {
  return lights.map((row, y) =>
    row.map((light, x) => switchLight(light, getNeighbors(lights, {x, y}))),
  );
}

const STEPS_COUNT = 100;
let lights = grid;

for (let i = 0; i < STEPS_COUNT; i++) {
  lights = animate(lights);
}

const lightsOnCount = calcLightsOn(lights);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(lightsOnCount).toBe(821);
  });
}
