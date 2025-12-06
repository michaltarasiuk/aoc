export function transpose<T>(matrix: T[][]) {
  const length = Math.max(...matrix.map(r => r.length));
  return Array.from({length}, (_, i) => matrix.map(r => r[i]));
}
