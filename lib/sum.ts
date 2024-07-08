import 'core-js/proposals/math-sum';

declare global {
  interface Math {
    sumPrecise(vals: Iterable<number>): number;
  }
}

export function sum(...vals: number[] | [number[]]) {
  return Math.sumPrecise(vals.flat());
}
