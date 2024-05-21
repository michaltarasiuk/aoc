export function isObject(value: unknown): value is object {
    return !Array.isArray(value) && typeof value === 'object' && value !== null;
}
