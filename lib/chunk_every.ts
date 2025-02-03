import {raise} from './raise.js';

export function chunkEvery<T>(iterable: Iterable<T>, size: number) {
  if (size < 1 || !Number.isInteger(size)) {
    throw new RangeError(
      `Expected size to be an integer greater than 0 but found ${size}`
    );
  }
  const chunks: T[][] = [[]];
  for (const v of iterable) {
    const chunk = chunks.at(-1) ?? raise('Empty chunks');
    if (chunk.length === size) {
      chunks.push([v]);
    } else {
      chunk.push(v);
    }
  }
  return chunks;
}
