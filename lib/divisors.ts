function* divisors_(n: number) {
  for (let i = 1; i <= n / 2; i++) {
    if (n % i === 0) yield i;
  }
  yield n;
}

export function divisors(n: number) {
  return Array.from(divisors_(n));
}
