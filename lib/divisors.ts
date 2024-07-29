function* divisors_(n: number) {
  for (let i = 1; i <= n / 2; i++) {
    if (n % i === 0) yield i;
  }
  yield n;
}

export function divisors(n: number) {
  return Array.from(divisors_(n));
}

function greatestCommonDivisor(a: number, b: number): number {
  return b ? greatestCommonDivisor(b, a % b) : a;
}

export function gcd(...ns: number[]) {
  return ns.reduce(greatestCommonDivisor);
}

function leastCommonMultiple(a: number, b: number) {
  return a * (b / greatestCommonDivisor(a, b));
}

export function lcm(...ns: number[]) {
  return ns.reduce(leastCommonMultiple);
}
