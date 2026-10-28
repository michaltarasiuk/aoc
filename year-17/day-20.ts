import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

const TICKS = 1_000

function parseCoords(coords: string) {
  const [, x, y, z] = coords.match(/-?\d+/g)!.map(Number)
  return {x, y, z}
}

function manhattan({x, y, z}: {x: number; y: number; z: number}) {
  return Math.abs(x) + Math.abs(y) + Math.abs(z)
}

const particles = input.split("\n").map(l => {
  const [p, v, a] = l.split(", ")
  return {
    p: parseCoords(p),
    v: parseCoords(v),
    a: parseCoords(a),
  }
})

let closestParticleIndex = -1
let minDistance = Infinity
for (const [i, {...particle}] of particles.entries()) {
  for (let t = 0; t < TICKS; t++) {
    particle.v.x += particle.a.x
    particle.v.y += particle.a.y
    particle.v.z += particle.a.z

    particle.p.x += particle.v.x
    particle.p.y += particle.v.y
    particle.p.z += particle.v.z
  }
  const distance = manhattan(particle.p)
  if (distance < minDistance) {
    minDistance = distance
    closestParticleIndex = i
  }
}

assert.strictEqual(closestParticleIndex, 170, "Part 1 failed")
