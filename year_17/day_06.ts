import {getInputInts} from 'lib/input';

const memoryBlocks = await getInputInts({year: 2017, day: 6});

function redistributeMemoryBlocks([...blocks]: number[]) {
  const cycles: number[] = [];

  function redistribute() {
    const seen = new Set<string>();

    while (true) {
      const snapshot = blocks.join();
      if (seen.has(snapshot)) {
        return seen.size;
      } else {
        seen.add(snapshot);
      }

      let max = Math.max(...blocks);
      let idx = blocks.indexOf(max);

      blocks[idx] = 0;
      while (max--) {
        blocks[++idx % blocks.length]++;
      }
    }
  }

  return {
    cycles,
    run() {
      cycles.push(redistribute());
      return this;
    },
  };
}

const {cycles} = redistributeMemoryBlocks(memoryBlocks).run().run();

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(cycles[0]).toBe(11137);
  });

  test('part 2', () => {
    expect(cycles[1]).toBe(1037);
  });
}
