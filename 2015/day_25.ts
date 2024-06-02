import {getInput} from 'lib/input';

const input = await getInput({year: 2015, day: 25});

const parseInput = (input: string) => {
	const [row, col] = input.match(/\d+/g)!.map(Number);
	return [row, col] as const;
};

const calcSteps = (row: number, col: number) => {
	const sum = row + col;
	return (sum * (sum - 1)) / 2 - row;
};

const generateCode = (prevCode = 20151125) => (prevCode * 252533) % 33554393;

let code: number | undefined;
for (let i = 0; i < calcSteps(...parseInput(input)); i++) {
	code = generateCode(code);
}
console.log(code);
