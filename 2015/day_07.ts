import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2015, day: 7});

const parseLn = (ln: string) => [
	...(ln.match(/[A-Z]+/) ?? []),
	...(ln.match(/([a-z]|[0-9])+/g) ?? []),
];

const circuit = lns.reduce<Record<string, string[]>>((acc, ln) => {
	const parsedLn = parseLn(ln);
	const dest = parsedLn.pop();

	if (dest) acc[dest] = parsedLn;
	return acc;
}, {});

let cache = new Map<string, number>();

function calcSignalOrParse(s: string) {
	const parsed = Number(s);

	if (Number.isNaN(parsed)) {
		return cache.get(s) ?? cache.set(s, calcSignal(s)).get(s)!;
	}
	return parsed;
}

function calcSignal(dest: string): number {
	if (!(dest in circuit)) throw new Error(`No destination for "${dest}"`);

	const [gate, a, b] = circuit[dest];

	switch (gate) {
		case 'AND':
			return calcSignalOrParse(a) & calcSignalOrParse(b);
		case 'OR':
			return calcSignalOrParse(a) | calcSignalOrParse(b);
		case 'LSHIFT':
			return calcSignalOrParse(a) << calcSignalOrParse(b);
		case 'RSHIFT':
			return calcSignalOrParse(a) >> calcSignalOrParse(b);
		case 'NOT':
			return ~calcSignalOrParse(a);
		default:
			return calcSignalOrParse(gate);
	}
}

const signalA = calcSignal('a');

cache = new Map<string, number>([['b', signalA]]);

console.log([signalA, calcSignal('a')]);
