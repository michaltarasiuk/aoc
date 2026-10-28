import assert from "node:assert"

import {fetchInput, raise} from "../lib.ts"

const input = await fetchInput(import.meta)

const passwordRe = /^(\d+)-(\d+) (\w): (\w+)$/
const passwords = input.split("\n").map(l => {
  const [, min, max, char, password] = passwordRe.exec(l) ?? raise("Invalid password")
  return {min: Number(min), max: Number(max), char, password}
})

const validPasswordsCount = passwords.filter(({min, max, char, password}) => {
  const count = password.split(char).length - 1
  return count >= min && count <= max
}).length

const validPasswordsCount2 = passwords.filter(({min, max, char, password}) => {
  return (password[min - 1] === char) !== (password[max - 1] === char)
}).length

assert.strictEqual(validPasswordsCount, 445, "Part 1 failed")
assert.strictEqual(validPasswordsCount2, 491, "Part 2 failed")
