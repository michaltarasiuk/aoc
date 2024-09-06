export function isNumber(value: unknown) {
  return typeof value === 'number';
}

export function isObject(
  value: unknown
): value is Record<PropertyKey, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isArray(value: unknown) {
  return Array.isArray(value);
}

export function isDefined(value: unknown) {
  return value !== undefined && value !== null;
}

export function isKeyOf<T extends Record<PropertyKey, unknown>>(
  object: T,
  key: PropertyKey
): key is keyof T {
  return Object.hasOwn(object, key);
}
