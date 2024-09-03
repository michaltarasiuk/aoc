export function assert(condition: boolean, msg?: string): asserts condition {
  if (!condition) throw new Error(msg);
}

export function atLeastOne<T>(arr: T[]): asserts arr is [T, ...T[]] {
  assert(arr.length > 0, 'Expected at least one element');
}

export function raise(message: string): never {
  throw new Error(message);
}
