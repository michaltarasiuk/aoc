export const create2dArr = <T>(size: number, val: T): T[][] =>
	[...Array(size)].map(() => Array(size).fill(val));
