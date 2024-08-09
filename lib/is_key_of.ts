export function isKeyOf<T extends Record<string, unknown>>(
  object: T,
  key: PropertyKey,
): key is keyof T {
  return Object.hasOwn(object, key);
}
