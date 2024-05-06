import {getInput} from '../lib/get_input';

const input = await getInput({
	year: 2015,
	day: 3,
});

class UniqueSet<V> extends Set<V> {
	addUnique(v: V) {
		if (!this.has(v)) this.add(v);
		return this;
	}
}

function xy() {
	let x = 0,
		y = 0;

	return {
		toString() {
			return `${x},${y}`;
		},
		set(char: string) {
			switch (char) {
				case '>':
					x++;
					break;
				case '<':
					x--;
					break;
				case '^':
					y++;
					break;
				case 'v':
					y--;
					break;
				default:
					throw new Error('unknown char');
			}
			return this;
		},
	};
}

{
	const s = xy();
	const h = new UniqueSet();

	for (const char of input) {
		const v = s.set(char).toString();
		h.addUnique(v);
	}

	console.log(h.size);
}

{
	const s = xy();
	const r = xy();
	const h = new UniqueSet();

	for (const [idx, char] of Object.entries(input)) {
		if (Number(idx) % 2 === 0) {
			const k = s.set(char).toString();
			h.addUnique(k);
		} else {
			const k = r.set(char).toString();
			h.addUnique(k);
		}
	}

	console.log(h.size);
}
