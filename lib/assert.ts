export function assert(condition: boolean, msg?: string): asserts condition {
  if (!condition) throw new Error(msg);
}

export function raise(message: string): never {
  throw new Error(message);
}
