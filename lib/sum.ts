export function sum(...ns: number[] | [number[]]) {
  return ns.flat().reduce((acc, n) => acc + n, 0);
}
