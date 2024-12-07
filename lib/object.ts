export function omit<T extends Record<PropertyKey, unknown>, K extends keyof T>(
  obj: T,
  ...keys: K[]
) {
  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => !keys.includes(k as K))
  ) as Omit<T, K>;
}
