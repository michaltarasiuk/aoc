import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

const FABRIC_SIZE = 1_000

function parseClaim(claim: string) {
  const claimRe = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/
  const [, id, x, y, width, height] = claimRe.exec(claim)?.map(Number) ?? []

  return {id, x, y, width, height}
}

const claims = input.split("\n").map(parseClaim)
const overlappingClaims = new Set<number>()

const fabric = Array.from({length: FABRIC_SIZE}, () =>
  Array.from({length: FABRIC_SIZE}, () => new Set<number>()),
)

for (const {id, x, y, width, height} of claims) {
  for (let i = x; i < x + width; i++) {
    for (let j = y; j < y + height; j++) {
      fabric[i][j].add(id)

      if (fabric[i][j].size > 1) {
        fabric[i][j].forEach(overlappingClaims.add, overlappingClaims)
      }
    }
  }
}

const overlappingClaimsCount = fabric.flat().filter(ids => ids.size > 1).length
const [nonOverlappingClaim] = new Set(claims.map(({id}) => id)).difference(overlappingClaims)

assert.strictEqual(overlappingClaimsCount, 101469, "Part 1 failed")
assert.strictEqual(nonOverlappingClaim, 1067, "Part 2 failed")
