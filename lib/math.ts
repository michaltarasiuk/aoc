export function sum(...ns: number[] | [number[]]) {
  return ns.flat().reduce((acc, n) => acc + n);
}

export function multiply(...ns: number[]) {
  return ns.reduce((acc, n) => acc * n);
}
