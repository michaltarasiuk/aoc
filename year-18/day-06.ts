import assert from "node:assert"

import {fetchInput} from "../lib.js"

const input = await fetchInput({year: 2018, day: 6})

function uppercaseLetterForIndex(index: number) {
  return String.fromCharCode(65 + index)
}

function siteFromInputLine(line: string, lineIndex: number) {
  const [x, y] = line.split(", ").map(Number)
  return {label: uppercaseLetterForIndex(lineIndex), x, y}
}

function calcManhattanDistance(a: {x: number; y: number}, b: {x: number; y: number}) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

function closestSites(x: number, y: number) {
  const sitesByDistance = Object.groupBy(sites, site =>
    calcManhattanDistance({x, y}, {x: site.x, y: site.y}),
  )
  const minDistance = Math.min(...Object.keys(sitesByDistance).map(Number))
  return sitesByDistance[minDistance] ?? []
}

const sites = input.split("\n").map(siteFromInputLine)

const minCoordinateX = Math.min(...sites.map(site => site.x)) - 1
const maxCoordinateX = Math.max(...sites.map(site => site.x)) + 1
const minCoordinateY = Math.min(...sites.map(site => site.y)) - 1
const maxCoordinateY = Math.max(...sites.map(site => site.y)) + 1

const infiniteSiteLabels = new Set<string>()
const ownedAreaBySiteLabel = new Map<string, number>()

for (let y = minCoordinateY; y <= maxCoordinateY; y++) {
  for (let x = minCoordinateX; x <= maxCoordinateX; x++) {
    const [nearest, ...otherNearest] = closestSites(x, y)
    const uniquelyOwned = otherNearest.length === 0
    const onBoundingRectangle =
      x === minCoordinateX || x === maxCoordinateX || y === minCoordinateY || y === maxCoordinateY
    if (uniquelyOwned) {
      ownedAreaBySiteLabel.set(nearest.label, (ownedAreaBySiteLabel.get(nearest.label) ?? 0) + 1)
      if (onBoundingRectangle) {
        infiniteSiteLabels.add(nearest.label)
      }
    }
  }
}

const largestFiniteArea = Math.max(
  ...sites
    .filter(site => !infiniteSiteLabels.has(site.label))
    .map(site => ownedAreaBySiteLabel.get(site.label) ?? 0),
)

assert.strictEqual(largestFiniteArea, 4186, "Part 1 failed")
