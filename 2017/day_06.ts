import {getInputInts} from 'lib/input';

const initialMemoryBanks = await getInputInts({year: 2017, day: 6});

function redistributeMemoryBlocks([...memoryBanks]: number[]) {
  const seen = new Set<string>();

  while (true) {
    const snapshot = memoryBanks.join();
    if (seen.has(snapshot)) {
      break;
    } else {
      seen.add(snapshot);
    }

    const max = Math.max(...memoryBanks);
    const maxIndex = memoryBanks.indexOf(max);

    memoryBanks[maxIndex] = 0;
    for (let i = 0; i < max; i++) {
      memoryBanks[(maxIndex + 1 + i) % memoryBanks.length]++;
    }
  }
  return [seen.size, memoryBanks] as const;
}

const [cycles, memoryBanks] = redistributeMemoryBlocks(initialMemoryBanks);
const [cycles2] = redistributeMemoryBlocks(memoryBanks);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(cycles).toBe(11137);
  });

  test('part 2', () => {
    expect(cycles2).toBe(1037);
  });
}
