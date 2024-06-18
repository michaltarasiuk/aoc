import {frequencies} from 'lib/frequencies';
import {getInputLns} from 'lib/input';
import {stringToCodePoints} from 'lib/string_to_code_points';
import {sum} from 'lib/sum';

const lns = await getInputLns({year: 2016, day: 4});

function parseLn(ln: string) {
	const roomRe = /^([\w-]+)-(\d+)\[(\w+)\]$/;
	const [, name, id, checksum] = ln.match(roomRe) ?? [];

	return {name: name.replace(/-/g, ''), id: Number(id), checksum};
}

function calcChecksum(...chars: string[]) {
	const charsCount = frequencies(chars);

	return Array.from(charsCount)
		.toSorted(([charA, countA], [charB, countB]) => {
			return countB - countA || charA.localeCompare(charB);
		})
		.slice(0, 5)
		.map(([char]) => char)
		.join('');
}

function rotateLetterForward(codePoint: number, shift: number) {
	return ((codePoint - 97 + shift) % 26) + 97;
}

const result = sum(
	...lns.map((ln) => {
		const {name, id, checksum} = parseLn(ln);
		return checksum === calcChecksum(...name) ? id : 0;
	}),
);

let result2: number | undefined;

for (const ln of lns) {
	const {name, id} = parseLn(ln);
	const decoded = String.fromCodePoint(
		...stringToCodePoints(name, (codePoint) =>
			rotateLetterForward(codePoint, id),
		),
	);

	if (decoded === 'northpoleobjectstorage') {
		result2 = id;
		break;
	}
}

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(409147);
	});

	test('part 2', () => {
		expect(result2).toBe(991);
	});
}
