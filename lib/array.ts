import {assert} from './assert.js';

export function adjacentAt<T>(arr: T[], i: number) {
  assert(arr.length > 0, 'Expected array to have at least one element');

  return [arr.at(i - 1)!, arr.at((i + 1) % arr.length)!] as const;
}

export function castArray<T>(v: T | T[]) {
  return Array.isArray(v) ? v : [v];
}

export function permute<T>(items: T[]): T[][] {
  if (!items.length) {
    return [[]];
  }
  const [first, ...rest] = items;
  return permute(rest).flatMap(items => interleave(first!, items));
}
function interleave<T>(item: T, items: T[]): T[][] {
  if (!items.length) {
    return [[item]];
  }
  const [first, ...rest] = items;
  return [
    [item, first, ...rest],
    ...interleave(item, rest).map(items => [first, ...items]),
  ];
}

export function transpose<T>(matrix: T[][]) {
  const transposed: T[][] = [];

  for (const row of matrix) {
    for (const [i, item] of row.entries()) {
      transposed[i] ??= [];
      transposed[i].push(item);
    }
  }
  return transposed;
}
