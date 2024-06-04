import {add} from 'lib/add';
import {getParagraphs} from 'lib/input';

const paragraphs = await getParagraphs({year: 2022, day: 1});

const [elf, elf2, elf3] = paragraphs
	.map((paragraph) => add(paragraph.map(Number)))
	.toSorted((a, b) => b - a);

console.log({
	result: elf,
	result2: elf + elf2 + elf3,
});
