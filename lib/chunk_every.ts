export function chunkEvery<T>(arr: T[], count: number) {
	const chunks: T[][] = [];
	for (let i = 0; i < arr.length; i += count) {
		chunks.push(arr.slice(i, i + count));
	}
	return chunks;
}
