import {getInputGrid} from 'lib/input.js';

const lights = await getInputGrid({year: 2015, day: 18});

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

let currentLights = lights;
for (let step = 0; step < StepsCount; step++) {
  currentLights = currentLights.map((row, y) =>
    row.map((light, x) =>
      getNewLight(light, getAdjacentLights(currentLights, {x, y}))
    )
  );
}
const lightsOnCount = currentLights
  .flat()
  .filter(light => light === LightOn).length;

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(lightsOnCount).toBe(821));
}
