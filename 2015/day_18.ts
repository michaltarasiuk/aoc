import {assertKeyIn} from 'lib/assert_key_in';
import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2015, day: 18});

const LIGHT_ON = '#';
const LIGHT_OFF = '.';

const getNeighbors = (state: string[][], {x, y}: {x: number; y: number}) => {
	const start = Math.max(0, x - 1);
	const end = x + 2;

	return [
		state[y][x - 1],
		state[y][x + 1],
		...(state[y - 1]?.slice(start, end) ?? []),
		...(state[y + 1]?.slice(start, end) ?? []),
	];
};

const actions = {
	[LIGHT_ON](neighbors: string[]) {
		const {length} = neighbors.filter((n) => n === LIGHT_ON);
		return length === 2 || length === 3 ? LIGHT_ON : LIGHT_OFF;
	},
	[LIGHT_OFF](neighbors: string[]) {
		const {length} = neighbors.filter((n) => n === LIGHT_ON);
		return length === 3 ? LIGHT_ON : LIGHT_OFF;
	},
};

let state = lns.map((ln) => ln.split(''));

for (let i = 0; i < 100; i++) {
	state = state.map((row, y) =>
		row.map((light, x) => {
			assertKeyIn(actions, light);
			return actions[light](getNeighbors(state, {x, y}));
		}),
	);
}

const part1 = state.flat().filter((light) => light === LIGHT_ON).length;

console.log(part1);
