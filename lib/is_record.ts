export function isRecord(v: unknown): v is Record<PropertyKey, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}
