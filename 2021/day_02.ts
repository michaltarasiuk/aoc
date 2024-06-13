import {assertKeyIn} from 'lib/assert_key_in';
import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2021, day: 2});

function parseLn(ln: string) {
	const commandRe = /^(\w+) (\d+)$/;
	const [, cmd, val] = ln.match(commandRe) ?? [];

	return {cmd, val: Number(val)};
}

const cmds = lns.map(parseLn);

function calcHorizontalPositionAndDepth<Acc extends Record<string, number>>(
	initialValue: Acc,
	handlers: Record<'up' | 'down' | 'forward', (acc: Acc, val: number) => Acc>,
) {
	return cmds.reduce((acc, {cmd, val}) => {
		assertKeyIn(handlers, cmd);
		return handlers[cmd](acc, val);
	}, initialValue);
}

const position = calcHorizontalPositionAndDepth(
	{x: 0, y: 0},
	{
		up: (acc, val) => ((acc.y -= val), acc),
		down: (acc, val) => ((acc.y += val), acc),
		forward: (acc, val) => ((acc.x += val), acc),
	},
);

const position2 = calcHorizontalPositionAndDepth(
	{x: 0, y: 0, aim: 0},
	{
		up: (acc, val) => ((acc.aim -= val), acc),
		down: (acc, val) => ((acc.aim += val), acc),
		forward(acc, val) {
			acc.x += val;
			acc.y += val * acc.aim;
			return acc;
		},
	},
);

const result = Math.abs(position.x) * position.y;
const result2 = Math.abs(position2.x) * position2.y;

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(1714950);
	});

	test('part 2', () => {
		expect(result2).toBe(1281977850);
	});
}
