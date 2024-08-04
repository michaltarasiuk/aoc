export function getCols<T>(lns: T[][]) {
  return lns.reduce<T[][]>((acc, row) => {
    row.forEach((val, i) => {
      acc[i] ??= [];
      acc[i].push(val);
    });
    return acc;
  }, []);
}
