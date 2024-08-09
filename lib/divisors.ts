function* divisors_(n: number) {
  for (let i = 1; i <= n / 2; i++) {
    if (n % i === 0) yield i;
  }
  yield n;
}

export function divisors(n: number) {
  return Array.from(divisors_(n));
}

function greatestCommonDivisor_(a: number, b: number): number {
  return b ? greatestCommonDivisor_(b, a % b) : a;
}

export function greatestCommonDivisor(...ns: number[]) {
  return ns.reduce(greatestCommonDivisor_);
}

function leastCommonMultiple_(a: number, b: number) {
  return a * (b / greatestCommonDivisor(a, b));
}

export function leastCommonMultiple(...ns: number[]) {
  return ns.reduce(leastCommonMultiple_);
}
