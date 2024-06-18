import {frequencies} from 'lib/frequencies';
import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2016, day: 4});

function parseLn(ln: string) {
	const roomRe = /^([\w-]+)-(\d+)\[(\w+)\]$/;
	const [, name, id, checksum] = ln.match(roomRe) ?? [];

	return {name, id: Number(id), checksum};
}

function calcChecksum(name: string) {
	const chars = name.match(/\w/g) ?? [];
	const charsCount = frequencies(chars);

	return Array.from(charsCount)
		.toSorted(([charA, countA], [charB, countB]) => {
			return countB - countA || charA.localeCompare(charB);
		})
		.slice(0, 5)
		.map(([char]) => char)
		.join('');
}

const result = lns.reduce((acc, ln) => {
	const {name, id, checksum} = parseLn(ln);
	return acc + (calcChecksum(name) === checksum ? id : 0);
}, 0);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(409147);
	});
}
