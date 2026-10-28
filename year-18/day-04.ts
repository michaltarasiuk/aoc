import assert from "node:assert"

import {fetchInput, isDefined, raise} from "../lib.ts"

const input = await fetchInput(import.meta)

function parseRecord(record: string) {
  const recordRe = /^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2})\] (.+)$/
  const [, time, event] = recordRe.exec(record) ?? raise("Invalid record")

  return {event, date: new Date(time)}
}

function parseGuardId(event: string) {
  return event.match(/^Guard #(\d+)/)?.[1]
}
const records = input
  .split("\n")
  .map(parseRecord)
  .sort((a, b) => Number(a.date) - Number(b.date))

const guards: Record<string, number[]> = {}

let currentGuard: number[] | null = null
let sleepStart: Date | null = null

for (const {event, date} of records) {
  const guardId = parseGuardId(event)
  if (isDefined(guardId)) {
    currentGuard = guards[guardId] ??= Array(60).fill(0)
  } else if (event === "falls asleep") {
    sleepStart = date
  } else if (event === "wakes up") {
    for (let i = sleepStart!.getMinutes(); i < date.getMinutes(); i++) {
      currentGuard![i]++
    }
  }
}

const [id, minutes] = Object.entries(guards).reduce((acc, guard) =>
  acc[1].reduce((a, b) => a + b) > guard[1].reduce((a, b) => a + b) ? acc : guard,
)
const maxMinute = minutes.indexOf(Math.max(...minutes))

assert.strictEqual(Number(id) * maxMinute, 115167, "Part 1 failed")
