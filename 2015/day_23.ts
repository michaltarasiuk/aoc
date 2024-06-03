import {assertKeyIn} from 'lib/assert_key_in';
import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2015, day: 23});

type Registers = {a: number; b: number};
type Instruction<T> = (registers: Registers, ...args: string[]) => T;

type Actions = Record<string, Instruction<Registers>>;

const actions: Actions = {
	inc(registers, name) {
		assertKeyIn(registers, name);
		return {...registers, [name]: registers[name] + 1};
	},
	hlf(registers, name) {
		assertKeyIn(registers, name);
		return {...registers, [name]: registers[name] / 2};
	},
	tpl(registers, name) {
		assertKeyIn(registers, name);
		return {...registers, [name]: registers[name] * 3};
	},
};

type Jumps = Record<string, Instruction<number>>;

const jumps: Jumps = {
	jmp(_registers, offset) {
		return Number(offset);
	},
	jie(registers, name, offset) {
		assertKeyIn(registers, name);
		return registers[name] % 2 === 0 ? Number(offset) : 1;
	},
	ji(registers, name, offset) {
		assertKeyIn(registers, name);
		return registers[name] === 1 ? Number(offset) : 1;
	},
};

function getInstructions(lns: string[]) {
	const instructionRe = /[+-]?\w+/g;
	return lns.map((ln) => ln.match(instructionRe)!);
}

function runInstructions(
	initialRegisters: Registers,
	instructions: string[][],
) {
	let registers = initialRegisters;
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
}

const instructions = getInstructions(lns);

{
	const {b} = runInstructions({a: 0, b: 0}, instructions);
	console.log(b);
}

{
	const {b} = runInstructions({a: 1, b: 0}, instructions);
	console.log(b);
}
