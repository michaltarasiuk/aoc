import {atLeastOne} from './at_least_one';

export function adjacentAt<T>(arr: T[], i: number) {
  atLeastOne(arr);

  const left = arr.at(i - 1);
  const right = arr.at((i + 1) % arr.length);
  return [left!, right!] as const;
}
