import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2019, day: 1});

function calcFuel(mass: number) {
  return Math.floor(mass / 3) - 2;
}

function calcFuelRecursive(mass: number): number {
  const fuel = calcFuel(mass);
  if (fuel <= 0) {
    return 0;
  } else {
    return fuel + calcFuelRecursive(fuel);
  }
}

const moduleMasses = input.split(/\n/).map(Number);

const fuelRequirementsSum = moduleMasses.map(calcFuel).reduce((a, b) => a + b);
const fuelRequirementsSumRecursive = moduleMasses
  .map(calcFuelRecursive)
  .reduce((a, b) => a + b);

assert.strictEqual(fuelRequirementsSum, 3273715, 'Part 1 failed');
assert.strictEqual(fuelRequirementsSumRecursive, 4907702, 'Part 2 failed');
