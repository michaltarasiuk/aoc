import assert from "node:assert"
import {z} from "zod"

const EnvSchema = z.object({
  session: z.string(),
})
export const env = EnvSchema.parse(process.env)

export async function fetchInput({year, day}: {year: number; day: number}) {
  const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: {
      Accept: "text/plain",
      Cookie: `session=${env.session}`,
    },
  })
  return (await response.text()).trimEnd()
}

export function raise(message: string): never {
  throw new Error(message)
}

export function isDefined(v: unknown) {
  return v !== undefined && v !== null
}

export function isKeyof<T extends Record<PropertyKey, unknown>>(
  r: T,
  k: PropertyKey,
): k is keyof T {
  return Object.hasOwn(r, k)
}

export function isRecord(v: unknown): v is Record<PropertyKey, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

export function castArray<T>(v: T | T[]) {
  return Array.isArray(v) ? v : [v]
}

export function chunkEvery<T>(iterable: Iterable<T>, size: number) {
  if (size < 1 || !Number.isInteger(size)) {
    throw new RangeError(`Expected size to be an integer greater than 0 but found ${size}`)
  }
  const chunks: T[][] = [[]]
  for (const v of iterable) {
    const chunk = chunks.at(-1) ?? raise("Empty chunks")
    if (chunk.length === size) {
      chunks.push([v])
    } else {
      chunk.push(v)
    }
  }
  return chunks
}

export function stringToCodePoints(s: string, fn = (codePoint: number) => codePoint) {
  return [...s].map(c => {
    const codePoint = c.codePointAt(0)
    assert(isDefined(codePoint))
    return fn(codePoint)
  })
}

export function* divisors(n: number) {
  for (let i = 1; i <= n / 2; i++) {
    if (n % i === 0) yield i
  }
  yield n
}

export function frequencies<T>(items: Iterable<T>) {
  const count = new Map<T, number>()
  for (const i of items) {
    count.set(i, (count.get(i) ?? 0) + 1)
  }
  return count
}

export function* permute<T>(items: T[]): IteratorObject<T[]> {
  if (!items.length) {
    yield []
    return
  }
  const [first, ...rest] = items
  for (const perm of permute(rest)) {
    yield* interleave(first!, perm)
  }
}
function* interleave<T>(item: T, items: T[]): IteratorObject<T[]> {
  if (!items.length) {
    yield [item]
    return
  }
  const [first, ...rest] = items
  yield [item, first, ...rest]
  for (const perm of interleave(item, rest)) {
    yield [first, ...perm]
  }
}

export function transpose<T>(matrix: T[][]) {
  const length = Math.max(...matrix.map(r => r.length))
  return Array.from({length}, (_, i) => matrix.map(r => r[i]))
}
