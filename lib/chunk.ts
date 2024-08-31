export function chunkEvery<T>(iterable: Iterable<T>, count: number) {
  const chunks: T[][] = [[]];

  for (const item of iterable) {
    const chunk = chunks.at(-1)!;
    chunk.length === count ? chunks.push([item]) : chunk.push(item);
  }
  return chunks;
}
