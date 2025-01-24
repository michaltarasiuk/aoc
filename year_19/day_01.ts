import assert from 'node:assert';

import {getInputInts} from 'lib/input.js';

const ns = await getInputInts({year: 2019, day: 1});

function calcFuel(mass: number) {
  return Math.floor(mass / 3) - 2;
}
function calcFuelRecursive(mass: number): number {
  const fuel = calcFuel(mass);
  if (calcFuel(mass) <= 0) {
    return 0;
  } else {
    return fuel + calcFuelRecursive(fuel);
  }
}

const fuelRequirementsSum = ns.map(calcFuel).reduce((a, b) => a + b);
const fuelRequirementsSumRecursive = ns
  .map(calcFuelRecursive)
  .reduce((a, b) => a + b);

assert.strictEqual(fuelRequirementsSum, 3273715, 'Part 1 failed');
assert.strictEqual(fuelRequirementsSumRecursive, 4907702, 'Part 2 failed');
