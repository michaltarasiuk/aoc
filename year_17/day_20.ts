import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await fetchInput({year: 2017, day: 20});

function parseCoords(coords: string) {
  const coordsRe = /^[pva]=<(-?\d+),(-?\d+),(-?\d+)>$/;
  const [, x, y, z] = coordsRe.exec(coords) ?? raise('Invalid coords');
  return {x: Number(x), y: Number(y), z: Number(z)};
}

function calcManhattanDistance(c: ReturnType<typeof parseCoords>) {
  return Math.abs(c.x) + Math.abs(c.y) + Math.abs(c.z);
}

const particles = input.split('\n').map(l => {
  const [p, v, a] = l.split(', ');
  return {
    p: parseCoords(p),
    v: parseCoords(v),
    a: parseCoords(a),
  };
});

const Ticks = 1_000;

let closestParticleIndex = -1;
let minDistance = Infinity;
for (const [i, {...particle}] of particles.entries()) {
  for (let t = 0; t < Ticks; t++) {
    particle.v.x += particle.a.x;
    particle.v.y += particle.a.y;
    particle.v.z += particle.a.z;

    particle.p.x += particle.v.x;
    particle.p.y += particle.v.y;
    particle.p.z += particle.v.z;
  }
  const distance = calcManhattanDistance(particle.p);
  if (distance < minDistance) {
    minDistance = distance;
    closestParticleIndex = i;
  }
}

assert.strictEqual(closestParticleIndex, 170, 'Part 1 failed');
