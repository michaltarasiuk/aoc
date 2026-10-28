export async function fetchInput(meta: ImportMeta) {
  const [path, year, day] = meta.url.match(/year-(\d+)\/day-(\d+)/) ?? raise("Invalid path")
  const cache = Bun.file(`${import.meta.dir}/inputs/${path}.txt`)
  if (await cache.exists()) {
    return cache.text()
  }
  const session = process.env.session ?? raise("Missing session env variable")
  const response = await fetch(`https://adventofcode.com/20${year}/day/${Number(day)}/input`, {
    headers: {
      Accept: "text/plain",
      Cookie: `session=${session}`,
      "User-Agent": "github.com/michaltarasiuk/aoc",
    },
  })
  if (!response.ok) {
    raise(`Failed to fetch input: ${response.status} ${response.statusText}`)
  }
  const input = (await response.text()).trimEnd()
  await Bun.write(cache, input)
  return input
}

export function raise(message: string): never {
  throw new Error(message)
}

export function isDefined<T>(v: T): v is NonNullable<T> {
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
  const chunks: T[][] = []
  let i = 0
  for (const v of iterable) {
    if (i % size === 0) chunks.push([])
    chunks.at(-1)!.push(v)
    i++
  }
  return chunks
}

export function stringToCodePoints(s: string, fn = (codePoint: number) => codePoint) {
  return [...s].map(c => fn(c.codePointAt(0)!))
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
