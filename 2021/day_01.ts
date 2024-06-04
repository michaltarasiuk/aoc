import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2021, day: 1});

let num = 0;

for (const [idx, ln] of lns.entries()) {
	if (idx === 0) continue;
	if (Number(ln) > Number(lns[idx - 1])) {
		num++;
	}
}

console.log(num);
