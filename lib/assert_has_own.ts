export function assertHasOwn<T extends Record<string, unknown>>(
  object: T,
  key: PropertyKey,
): asserts key is keyof T {
  if (!Object.hasOwn(object, key)) {
    throw new Error(`Expected key "${key.toString()}" in object`);
  }
}
