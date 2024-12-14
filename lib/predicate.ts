export function isObject(v: unknown): v is Record<PropertyKey, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

export function isDefined(v: unknown) {
  return v !== undefined && v !== null;
}

export function isKeyOf<T extends Record<PropertyKey, unknown>>(
  obj: T,
  k: PropertyKey
): k is keyof T {
  return Object.hasOwn(obj, k);
}
