export function divideWithRemainder(x: number, y: number) {
	return [Math.floor(x / y), x % y] as const;
}
