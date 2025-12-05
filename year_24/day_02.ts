import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2024, day: 2});

function isSorted(report: number[]) {
  return (
    report.join() === report.toSorted((a, b) => a - b).join() ||
    report.join() === report.toSorted((a, b) => b - a).join()
  );
}
function areAdjacentLevelsWithinRange(report: number[], min = 1, max = 3) {
  return report
    .slice(0, -1)
    .map((level, i) => Math.abs(level - report[i + 1]))
    .every(diff => diff >= min && diff <= max);
}
function isSafeReport(report: number[]) {
  return isSorted(report) && areAdjacentLevelsWithinRange(report);
}

const reports = input.split(/\n/).map(l => l.split(/\s/).map(Number));

const safeReports = reports.filter(isSafeReport);
const safeReports2 = reports.filter(r =>
  r.map((_, i, arr) => arr.toSpliced(i, 1)).some(isSafeReport)
);

assert.strictEqual(safeReports.length, 359, 'Part 1 failed');
assert.strictEqual(safeReports2.length, 418, 'Part 2 failed');
