import {getInputInts} from 'lib/input';

const memoryBanks = await getInputInts({year: 2017, day: 6});

function redistributeMemoryBlocks([...memoryBanks]: number[]) {
	const seen = new Set<string>();

	while (true) {
		const snapshot = memoryBanks.join();
		if (seen.has(snapshot)) {
			break;
		} else {
			seen.add(snapshot);
		}

		const mostBlocksCount = Math.max(...memoryBanks);
		const mostBlocksIndex = memoryBanks.indexOf(mostBlocksCount);

		memoryBanks[mostBlocksIndex] = 0;
		for (let i = 1; i <= mostBlocksCount; i++) {
			memoryBanks[(mostBlocksIndex + i) % memoryBanks.length]++;
		}
	}
	return seen.size;
}

const result = redistributeMemoryBlocks(memoryBanks);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(11137);
	});
}
