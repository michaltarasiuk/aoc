import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2024, day: 2});

function isSorted(report: number[]) {
  return (
    report.every((level, i, arr) => !i || arr[i - 1] <= level) ||
    report.every((level, i, arr) => !i || arr[i - 1] >= level)
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

const reportRe = /\d+/g;
const reports = lines.map(l => l.matchAll(reportRe).map(Number).toArray());

const safeReports = reports.filter(isSafeReport);
const safeReports2 = reports.filter(report =>
  report.map((_, i, arr) => arr.toSpliced(i, 1)).some(isSafeReport)
);

assert.strictEqual(safeReports.length, 359, 'Part 1 failed');
assert.strictEqual(safeReports2.length, 418, 'Part 2 failed');
