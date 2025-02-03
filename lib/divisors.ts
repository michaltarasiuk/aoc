export function* divisors(n: number) {
  for (let i = 1; i <= n / 2; i++) {
    if (n % i === 0) yield i;
  }
  yield n;
}
