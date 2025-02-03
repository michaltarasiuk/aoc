export function castArray<T>(v: T | T[]) {
  return Array.isArray(v) ? v : [v];
}
