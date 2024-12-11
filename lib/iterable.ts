import {raise} from './assert.js';

export function chunkEvery<T>(iterable: Iterable<T>, size: number) {
  if (size < 1 || !Number.isInteger(size)) {
    throw new RangeError(
      `Expected size to be an integer greater than 0 but found ${size}`
    );
  }
  const chunks: T[][] = [[]];
  for (const item of iterable) {
    const chunk = chunks.at(-1) ?? raise('Empty chunks');
    chunk.length === size ? chunks.push([item]) : chunk.push(item);
  }
  return chunks;
}

export function frequencies<T>(iterable: Iterable<T>) {
  const count = new Map<T, number>();
  for (const item of iterable) {
    count.set(item, (count.get(item) ?? 0) + 1);
  }
  return count;
}

export function uniq<T>(iterable: Iterable<T>) {
  return new Set(iterable).values().toArray();
}
