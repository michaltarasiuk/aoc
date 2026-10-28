import assert from "node:assert"

import {fetchInput, stringToCodePoints} from "../lib.ts"

const input = await fetchInput(import.meta)

function hasIncreasingStraightOf3Chars(s: string) {
  return stringToCodePoints(s).some((_, i, codePoints) => {
    const [a, b, c] = codePoints.slice(i, i + 3)
    return b - a === 1 && c - b === 1
  })
}
function isValidPassword(s: string) {
  return /^[a-hj-km-np-z]+$/.test(s) && /(\w)\1.*(\w)\2/.test(s) && hasIncreasingStraightOf3Chars(s)
}

function findNewPassword(password: string) {
  let int = Number.parseInt(password, 36)
  let newPassword: string
  do {
    newPassword = (++int).toString(36)
  } while (!isValidPassword(newPassword))
  return newPassword
}

const newPassword = findNewPassword(input)
const newPassword2 = findNewPassword(newPassword)

assert.strictEqual(newPassword, "cqjxxyzz", "Part 1 failed")
assert.strictEqual(newPassword2, "cqkaabcc", "Part 2 failed")
