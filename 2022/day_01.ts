import {getParagraphs} from 'lib/input';
import {sum} from 'lib/sum';

const paragraphs = await getParagraphs({year: 2022, day: 1});

const [elf, elf2, elf3] = paragraphs
	.map((paragraph) => sum(...paragraph.map(Number)))
	.toSorted((a, b) => b - a);

console.log({
	result: elf,
	result2: elf + elf2 + elf3,
});
