import {getInput} from 'lib/input';

const input = await getInput({year: 2015, day: 25});

function parseInput(input: string) {
	const [row, col] = input.match(/\d+/g)!.map(Number);
	return [row, col] as const;
}

function calcSteps(row: number, col: number) {
	const sum = row + col;
	return (sum * (sum - 1)) / 2 - row;
}

function generateCode(prevCode = 20151125) {
	return (prevCode * 252533) % 33554393;
}

let code: number | undefined;
for (let i = 0; i < calcSteps(...parseInput(input)); i++) {
	code = generateCode(code);
}

console.log(code);
