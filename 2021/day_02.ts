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

{
	const {x, y} = calcHorizontalPositionAndDepth(
		{x: 0, y: 0},
		{
			up: (acc, val) => ((acc.y -= val), acc),
			down: (acc, val) => ((acc.y += val), acc),
			forward: (acc, val) => ((acc.x += val), acc),
		},
	);

	console.log(Math.abs(x) * y);
}

{
	const {x, y} = calcHorizontalPositionAndDepth(
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

	console.log(Math.abs(x) * y);
}
