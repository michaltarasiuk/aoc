import {getInputGrid} from 'lib/input.js';

const initialGrid = await getInputGrid({year: 2015, day: 18});

const LIGHT_ON = '#';
const LIGHT_OFF = '.';

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
  return NeighborOffsets.map(([dy, dx]) => grid[y + dy]?.[x + dx] ?? LIGHT_OFF);
}

function countLightsOn(grid: Grid) {
  return grid.flat().filter(light => light === LIGHT_ON).length;
}

function getNextLightState(currentLight: string, neighbors: string[]) {
  const lightsOnCount = neighbors.filter(light => light === LIGHT_ON).length;
  if (currentLight === LIGHT_ON) {
    return lightsOnCount === 2 || lightsOnCount === 3 ? LIGHT_ON : LIGHT_OFF;
  } else {
    return lightsOnCount === 3 ? LIGHT_ON : LIGHT_OFF;
  }
}

const STEPS_COUNT = 100;

let grid = initialGrid;
for (let step = 0; step < STEPS_COUNT; step++) {
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
