import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2017, day: 8});

type Registers = Record<string, number>;

function parseInstruction(ln: string) {
	const instructionRe = /^(\w+) (inc|dec) (-?\d+) if (.+)$/;
	const [, reg, op, val, cond] = instructionRe.exec(ln)!;

	return {reg, op, val: Number(val), cond};
}

function evalCondition(registers: Registers, cond: string) {
	const conditionRe = /^(\w+) ([!<>=]=?) (-?\d+)$/;
	const [, reg, op, val] = conditionRe.exec(cond)!;

	return eval(`${(registers[reg] ??= 0)} ${op} ${val}`);
}

const registers: Registers = {};

for (const ln of lns) {
	const {reg, op, val, cond} = parseInstruction(ln);

	if (evalCondition(registers, cond)) {
		registers[reg] ??= 0;
		registers[reg] += op === 'inc' ? val : -val;
	}
}

const result = Math.max(...Object.values(registers));

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(5966);
	});
}
