import {getInputGrid} from 'lib/input.js';

const grid = await getInputGrid({year: 2015, day: 18});

const LightOn = '#';
const LightOff = '.';

type Lights = string[][];

function getNeighbors(lights: Lights, {x, y}: {x: number; y: number}) {
  const Neighbors = [
    [-1, 0, 1],
    [-1, 1],
    [-1, 0, 1],
  ];
  return Neighbors.map((offsets, i) =>
    offsets.flatMap(offset => lights[y + i - 1]?.[x + offset] ?? [])
  );
}

function calcLightsOn(lights: Lights) {
  const lightsOnRe = new RegExp(LightOn, 'g');
  return lights.join().matchAll(lightsOnRe).toArray().length;
}

function switchLight(light: string, neighbors: Lights) {
  const count = calcLightsOn(neighbors);
  switch (light) {
    case LightOn:
      return count === 2 || count === 3 ? LightOn : LightOff;
    case LightOff:
      return count === 3 ? LightOn : LightOff;
    default:
      throw new Error('Invalid light');
  }
}

const StepsCount = 100;

let lights = grid;
for (let i = 0; i < StepsCount; i++) {
  lights = lights.map((row, y) =>
    row.map((light, x) => switchLight(light, getNeighbors(lights, {x, y})))
  );
}

const lightsOnCount = calcLightsOn(lights);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(lightsOnCount).toBe(821);
  });
}
