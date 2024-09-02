export function castArray<T>(value: T | T[]) {
  return Array.isArray(value) ? value : [value];
}
