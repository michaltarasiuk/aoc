import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)
const [replacements, molecule] = input.split("\n\n")

const molecules = new Set<string>()
for (const r of replacements.split("\n")) {
  const [a, b] = r.split(" => ")
  for (const m of molecule.matchAll(new RegExp(a, "g"))) {
    molecules.add([...molecule].toSpliced(m.index, a.length, b).join(""))
  }
}

assert.strictEqual(molecules.size, 518, "Part 1 failed")
