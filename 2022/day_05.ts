import {extractInts} from 'lib/extract_ints';
import {getInputParagraphs} from 'lib/input';

const [stacks, instructions] = await getInputParagraphs({year: 2022, day: 5});

const EMPTY_CRATE = ' ';

function emptyCrateToUndefined(crate: string) {
	return crate === EMPTY_CRATE ? undefined : crate;
}

function cratesByIndex(stacks: string[], i: number) {
	return stacks.flatMap(
		(crates) => emptyCrateToUndefined(crates.at(i) || EMPTY_CRATE) ?? [],
	);
}

function parseStacks([...stacks]: string[]) {
	const ids = stacks.pop()!;
	const parsedStacks: Record<string, string[]> = {};

	for (const id of extractInts(ids)) {
		parsedStacks[id] = cratesByIndex(stacks, ids.indexOf(String(id)));
	}
	return parsedStacks;
}

function stacksToString(stacks: ReturnType<typeof parseStacks>) {
	return Object.values(stacks)
		.flatMap((crates) => crates.at(0) ?? [])
		.join('');
}

const finalStacks = instructions.reduce((acc, instruction) => {
	const [count, from, to] = extractInts(instruction);

	acc[to].unshift(...acc[from].splice(0, count).toReversed());
	return acc;
}, parseStacks(stacks));

const finalStacks2 = instructions.reduce((acc, instruction) => {
	const [count, from, to] = extractInts(instruction);

	acc[to].unshift(...acc[from].splice(0, count));
	return acc;
}, parseStacks(stacks));

const result = stacksToString(finalStacks);
const result2 = stacksToString(finalStacks2);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe('QGTHFZBHV');
	});

	test('part 2', () => {
		expect(result2).toBe('MGDMPSZTM');
	});
}
