export const divideWithRemainder = (x: number, y: number) =>
	[Math.floor(x / y), x % y] as const;
