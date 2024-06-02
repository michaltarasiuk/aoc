import {getInputLns} from 'lib/input';
import {raise} from 'lib/raise';

const lns = await getInputLns({year: 2015, day: 23});

type Registers = {a: number; b: number};

type Action = (registers: Registers, name: keyof Registers) => Registers;

const actions: Record<string, Action> = {
	inc: (registers, name) => ({...registers, [name]: registers[name] + 1}),
	hlf: (registers, name) => ({...registers, [name]: registers[name] / 2}),
	tpl: (registers, name) => ({...registers, [name]: registers[name] * 3}),
};

type Jump = (registers: Registers, ...args: string[]) => number;

const jumps: Record<string, Jump> = {
	jmp: (_registers, offset) => Number(offset),
	jie: (registers, name, offset) => {
		const register = registers[name as keyof Registers];
		return register % 2 === 0 ? Number(offset) : 1;
	},
	jio: (registers, name, offset) => {
		const register = registers[name as keyof Registers];
		return register === 1 ? Number(offset) : 1;
	},
};

const getInstructions = (lns: string[]) => {
	const instructionRe = /[+-]?\w+/g;
	return lns.map((ln) => ln.match(instructionRe) ?? raise('No match found'));
};

const runInstructions = (
	initalRegisters: Registers,
	instructions: ReturnType<typeof getInstructions>,
) => {
	let registers = initalRegisters;
	let pointer = 0;

	while (pointer < instructions.length) {
		const [instruction, ...args] = instructions[pointer];

		if (instruction in actions) {
			const action = actions[instruction];
			registers = action(registers, args[0] as keyof Registers);
			pointer++;
		} else if (instruction in jumps) {
			const jump = jumps[instruction];
			pointer += jump(registers, ...args);
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
