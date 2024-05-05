export function add(...ns: number[]) {
	return ns.reduce((a, b) => a + b, 0);
}
