import {getInput} from '../lib/get_input';
import {add} from '../lib/add';

const input = await getInput({
	year: 2015,
	day: 12,
});

const ns: number[] = [];
const p = JSON.parse(input, (_, v) => {
	if (typeof v === 'number') ns.push(v);
	return v;
});

const ns2: number[] = [];
JSON.stringify(p, (_, v) => {
	if (typeof v === 'number') ns2.push(v);
	if (typeof v === 'object' && !Array.isArray(v) && v !== null) {
		for (const k in v) {
			if (v[k] === 'red') return null;
		}
	}
	return v;
});

console.log(add(...ns));
console.log(add(...ns2));
