import {chunkEvery} from 'lib/chunk_every';
import {extractInts} from 'lib/extract_ints';
import {getInputParagraphs} from 'lib/input';
import {sum} from 'lib/sum';

const [[drawn], ...inits] = await getInputParagraphs({year: 2021, day: 4});

class Board {
	#state: [number, boolean][] = [];
	#length = 5;

	constructor(init: string[]) {
		this.#state = init.flatMap((row) =>
			extractInts(row).map((int): [number, boolean] => [int, false]),
		);
	}

	bingo() {
		for (const chunk of chunkEvery(this.#state, this.#length)) {
			if (chunk.every(([, marked]) => marked)) {
				return true;
			}
		}
		return false;
	}

	draw(num: number) {
		for (const slot of this.#state) {
			if (num === slot[0]) {
				slot[1] = true;
			}
		}
	}

	unmarked() {
		return this.#state.flatMap(([int, marked]) => (marked ? [] : [int]));
	}
}

const boards = inits.map((init) => new Board(init));
let result: number | undefined;

outer: for (const int of extractInts(drawn)) {
	for (const board of boards) {
		board.draw(int);
		if (board.bingo()) {
			result = sum(...board.unmarked()) * int;
			break outer;
		}
	}
}

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(23177);
	});
}
