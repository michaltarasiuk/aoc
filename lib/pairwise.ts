const PAIR_COUNT = 2;

export function pairwise<T>(arr: T[]) {
  if (arr.length < PAIR_COUNT) {
    return [];
  }
  return arr.slice(0, -1).map((item, i) => [item, arr[i + 1]]);
}
