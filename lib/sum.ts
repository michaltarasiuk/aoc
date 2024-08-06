import 'core-js/proposals/math-sum';

declare global {
  interface Math {
    sumPrecise(iterable: Iterable<number>): number;
  }
}

export function sum(...ns: number[] | [number[]]) {
  return Math.sumPrecise(ns.flat());
}
