import {raise} from './assert.js';

export function chunkEvery<T>(iterable: Iterable<T>, count: number) {
  const chunks: T[][] = [[]];

  for (const item of iterable) {
    const chunk = chunks.at(-1) ?? raise('Empty chunks');
    if (chunk.length === count) {
      chunks.push([item]);
    } else {
      chunk.push(item);
    }
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
  return Array.from(new Set(iterable));
}
