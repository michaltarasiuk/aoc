import {atLeastOne} from './at_least_one';

export function adjacentAt<T>(arr: T[], i: number): [T, T] {
	atLeastOne(arr);
	return [arr.at(i - 1)!, arr.at((i + 1) % arr.length)!];
}
