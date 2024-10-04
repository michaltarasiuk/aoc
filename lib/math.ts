export function sum(...ns: number[] | [number[]]) {
  return ns.flat().reduce((acc, n) => acc + n, 0);
}

export function multiply(...ns: number[] | [number[]]) {
  return ns.flat().reduce((acc, n) => acc * n, 1);
}

function* divisors_(n: number) {
  for (let i = 1; i <= n / 2; i++) {
    if (n % i === 0) yield i;
  }
  yield n;
}
export function divisors(n: number) {
  return divisors_(n).toArray();
}
