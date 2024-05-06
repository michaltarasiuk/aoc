export function decrementClampedToZero(number: number) {
	return Math.max(number - 1, 0);
}
