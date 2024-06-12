import {getInputNumbers} from 'lib/input';

const ns = await getInputNumbers({year: 2021, day: 1});

const result = ns.reduce(
	(acc, num, idx) => (num > ns[idx - 1] ? ++acc : acc),
	0,
);

const result2 = ns.reduce(
	(acc, num, idx) => (num > ns[idx - 3] ? ++acc : acc),
	0,
);

console.log({result, result2});
