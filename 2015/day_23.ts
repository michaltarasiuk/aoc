import {assertKeyIn} from 'lib/assert_key_in';
import {getInputLns} from 'lib/input';
import {raise} from 'lib/raise';

const lns = await getInputLns({year: 2015, day: 23});

type Registers = {a: number; b: number};

type Action = (registers: Registers, ...args: string[]) => Registers;

const actions: Record<string, Action> = {
	inc: (registers, name) => {
		assertKeyIn(registers, name);
		return {...registers, [name]: registers[name]++};
	},
	hlf: (registers, name) => {
		assertKeyIn(registers, name);
		return {...registers, [name]: registers[name] / 2};
	},
	tpl: (registers, name) => {
		assertKeyIn(registers, name);
		return {...registers, [name]: registers[name] * 3};
	},
};

type Jump = (registers: Registers, ...args: string[]) => number;

const jumps: Record<string, Jump> = {
	jmp: (_registers, offset) => Number(offset),
	jie: (registers, name, offset) => {
		assertKeyIn(registers, name);
		return registers[name] % 2 === 0 ? Number(offset) : 1;
	},
	jio: (registers, name, offset) => {
		assertKeyIn(registers, name);
		return registers[name] === 1 ? Number(offset) : 1;
	},
};

const getInstructions = (lns: string[]) => {
	const instructionRe = /[+-]?\w+/g;
	return lns.map((ln) => ln.match(instructionRe) ?? raise('No match found'));
};

const runInstructions = (
	initalRegisters: Registers,
	instructions: string[][],
) => {
	let registers = initalRegisters;
	let pointer = 0;

	while (pointer < instructions.length) {
		const [instruction, ...args] = instructions[pointer];

		if (instruction in actions) {
			registers = actions[instruction](registers, ...args);
			pointer++;
		} else if (instruction in jumps) {
			pointer += jumps[instruction](registers, ...args);
		}
	}

	return registers;
};

const instructions = getInstructions(lns);

{
	const {b} = runInstructions({a: 0, b: 0}, instructions);
	console.log(b);
}

{
	const {b} = runInstructions({a: 1, b: 0}, instructions);
	console.log(b);
}
