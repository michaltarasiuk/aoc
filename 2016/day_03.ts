import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2016, day: 3});

const triangles = lns
	.map((ln) => Array.from(ln.matchAll(/\d+/g), Number))
	.filter(([a, b, c]) => a + b > c && a + c > b && b + c > a);

console.log(triangles.length);
