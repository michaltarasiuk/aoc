import {getInputLines} from 'lib/input';

const lines = await getInputLines({year: 2018, day: 3});

function parseClaim(claim: string) {
  const claimRe = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;
  const [, id, x, y, width, height] = claimRe.exec(claim)?.map(Number) ?? [];

  return {id, x, y, width, height};
}

const claims = lines.map(parseClaim);

const FABRIC_SIZE = 1_000;
const fabric = [...Array(FABRIC_SIZE)].map(() =>
  [...Array(FABRIC_SIZE)].map((): number[] => [])
);

for (const {id, x, y, width, height} of claims) {
  for (let i = x; i < x + width; i++) {
    for (let j = y; j < y + height; j++) {
      fabric[i][j].push(id);
    }
  }
}

const overlappingClaims = fabric.flat().filter(ids => ids.length > 1).length;

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(overlappingClaims).toBe(101469);
  });
}
