import {getInputLns} from 'lib/input';
import {raise} from 'lib/raise';

const lns = await getInputLns({year: 2015, day: 23});

const getInstructions = (lns: string[]) => {
	const instructionRe = /[+-]?\w+/g;
	return lns.map((ln) => ln.match(instructionRe) ?? raise('No match found'));
};

let pointer = 0;
const registers: Record<string, number> = {a: 0, b: 0};

const actions: Record<string, (...params: string[]) => void> = {
	inc: (register) => {
		registers[register]++;
		pointer++;
	},
	hlf: (register) => {
		registers[register] /= 2;
		pointer++;
	},
	tpl: (register) => {
		registers[register] *= 3;
		pointer++;
	},
	jmp: (offset) => (pointer += Number(offset)),
	jie: (register, offset: string) => {
		if (registers[register] % 2 === 0) {
			pointer += Number(offset);
		} else {
			pointer++;
		}
	},
	jio: (register, offset) => {
		if (registers[register] === 1) {
			pointer += Number(offset);
		} else {
			pointer++;
		}
	},
};

const runActions = (instructions: string[][]) => {
	while (pointer < instructions.length) {
		const [action, ...params] = instructions[pointer];
		actions[action](...params);
	}
	return registers;
};

const instructions = getInstructions(lns);
const {b} = runActions(instructions);

console.log(b);
