import {assertKeyIn} from 'lib/assert_key_in';
import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2021, day: 2});

function parseLn(ln: string) {
	const commandRe = /^(\w+) (\d+)$/;
	const [, cmd, val] = ln.match(commandRe) ?? [];

	return {cmd, val: Number(val)};
}

function calcHorizontalPositionAndDepth(
	cmds: {cmd: string; val: number}[],
	handlers: Record<
		'up' | 'down' | 'forward',
		<Acc extends {x: number; y: number}>(acc: Acc, val: number) => Acc
	>,
) {
	return cmds.reduce(
		(acc, {cmd, val}) => {
			assertKeyIn(handlers, cmd);
			return handlers[cmd](acc, val);
		},
		{x: 0, y: 0},
	);
}

const cmds = lns.map(parseLn);

const {x, y} = calcHorizontalPositionAndDepth(cmds, {
	up: (acc, val) => ((acc.y -= val), acc),
	down: (acc, val) => ((acc.y += val), acc),
	forward: (acc, val) => ((acc.x += val), acc),
});

console.log(x * y);
