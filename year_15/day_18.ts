import {getInputGrid} from 'lib/input.js';

const initialGrid = await getInputGrid({year: 2015, day: 18});

const LightOn = '#';
const LightOff = '.';

type Grid = string[][];

function getNeighbors(grid: Grid, {x, y}: {x: number; y: number}) {
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
  return NeighborOffsets.map(([dy, dx]) => grid[y + dy]?.[x + dx] ?? LightOff);
}

function countLightsOn(grid: Grid) {
  return grid.flat().filter(light => light === LightOn).length;
}

function getNextLightState(currentLight: string, neighbors: string[]) {
  const lightsOnCount = neighbors.filter(light => light === LightOn).length;
  if (currentLight === LightOn) {
    return lightsOnCount === 2 || lightsOnCount === 3 ? LightOn : LightOff;
  } else {
    return lightsOnCount === 3 ? LightOn : LightOff;
  }
}

const StepsCount = 100;

let grid = initialGrid;
for (let step = 0; step < StepsCount; step++) {
  grid = grid.map((row, y) =>
    row.map((light, x) => getNextLightState(light, getNeighbors(grid, {x, y})))
  );
}

const lightsOnCount = countLightsOn(grid);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(lightsOnCount).toBe(821);
  });
}
