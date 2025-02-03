export function isKeyof<T extends Record<PropertyKey, unknown>>(
  r: T,
  k: PropertyKey
): k is keyof T {
  return Object.hasOwn(r, k);
}
