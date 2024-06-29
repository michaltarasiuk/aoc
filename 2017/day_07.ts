import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2017, day: 7});

function parseProgram(ln: string) {
	const programRe = /(\w+|\d+)/g;
	const [name, weight, ...children] = ln.match(programRe)!;

	return {name, weight: Number(weight), children};
}

type Programs = typeof programs;

function findRoot(programs: Programs) {
	const children = new Set(programs.flatMap((p) => p.children));

	for (const program of programs) {
		if (!children.has(program.name)) {
			return program;
		}
	}
	throw new Error('Root not found');
}

const programs = lns.map(parseProgram);
const root = findRoot(programs);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(root.name).toBe('rqwgj');
	});
}
