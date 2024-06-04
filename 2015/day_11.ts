import {getInput} from 'lib/input';

const input = await getInput({year: 2015, day: 11});

const newPassword = findNewPassword(input);
const newPassword2 = findNewPassword(newPassword);

console.log({newPassword, newPassword2});

function findNewPassword(password: string) {
	let int = parseInt(password, 36);
	let newPassword = int.toString(36);

	do {
		int++;
		newPassword = int.toString(36);
	} while (!isValidPassword(newPassword));

	return newPassword;
}

function isValidPassword(password: string) {
	return (
		containsValidChars(password) &&
		contains2NonOverlappingPairs(password) &&
		hasIncreasingStraightOf3Chars(password)
	);
}

function containsValidChars(s: string) {
	return /^[^iol]*$/.test(s) && /^[a-z]*$/.test(s);
}

function contains2NonOverlappingPairs(s: string) {
	return /.*(\w)\1.*(\w)\2/.test(s);
}

function hasIncreasingStraightOf3Chars(s: string) {
	const keys = Object.keys(s.slice(1, s.length - 1));
	const charCodes = Array.from(s, (char) => char.charCodeAt(0));

	for (const idx of keys.map(Number)) {
		const [a, b, c] = charCodes.slice(idx, idx + 3);
		if (b - a === 1 && c - b === 1) return true;
	}
	return false;
}
