import {getParagraphs} from 'lib/input';
import {sum} from 'lib/sum';

const paragraphs = await getParagraphs({year: 2022, day: 1});

const elfs = paragraphs
	.map((paragraph) => sum(...paragraph.map(Number)))
	.toSorted((a, b) => b - a);

console.log({
	result: elfs[0],
	result2: elfs[0] + elfs[1] + elfs[2],
});
