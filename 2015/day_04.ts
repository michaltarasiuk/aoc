import { MD5 } from "bun";
import { getInput } from "lib/get_input";

const input = await getInput({
	year: 2015,
	day: 4,
});

const key = input.trimEnd();

const md5 = (data: Bun.BlobOrStringOrBuffer) =>
	new MD5().update(data).digest("hex");

const waitUntilStartsWith = (
	{ string, searchString }: { string: string; searchString: string },
	init = 0,
) => {
	let n = init;
	while (!md5(string + n).startsWith(searchString)) n++;
	return n;
};

const result = waitUntilStartsWith({
	string: key,
	searchString: "0".repeat(5),
});
const result2 = waitUntilStartsWith(
	{ string: key, searchString: "0".repeat(6) },
	result,
);

console.log({
	result,
	result2,
});
