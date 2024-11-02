import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2018, day: 3});

function parseClaim(claim: string) {
  const claimRe = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;
  const [, id, x, y, width, height] = claimRe.exec(claim)?.map(Number) ?? [];

  return {id, x, y, width, height};
}

const claims = lines.map(parseClaim);
const overlappingClaims = new Set<number>();

const FabricSize = 1_000;
const fabric = [...Array(FabricSize)].map(() =>
  [...Array(FabricSize)].map(() => new Set<number>())
);

for (const {id, x, y, width, height} of claims) {
  for (let i = x; i < x + width; i++) {
    for (let j = y; j < y + height; j++) {
      fabric[i][j].add(id);

      if (fabric[i][j].size > 1) {
        fabric[i][j].forEach(overlappingClaims.add, overlappingClaims);
      }
    }
  }
}

const overlappingClaimsCount = fabric.flat().filter(ids => ids.size > 1).length;
const [nonOverlappingClaim] = new Set(claims.map(({id}) => id)).difference(
  overlappingClaims
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(overlappingClaimsCount).toBe(101469));
  test('part 2', () => expect(nonOverlappingClaim).toBe(1067));
}
