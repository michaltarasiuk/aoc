import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2024, day: 2});

function isSorted(report: number[]) {
  return (
    report.join() === report.toSorted((a, b) => a - b).join() ||
    report.join() === report.toSorted((a, b) => b - a).join()
  );
}
function adjacentLevelsDifferByOneToThree(reports: number[]) {
  return reports.slice(1, -1).every((level, i) => {
    const l = reports[i];
    const r = reports[i + 2];
    return [level - l, r - level].map(Math.abs).every(d => d >= 1 && d <= 3);
  });
}

const reportRe = /\d+/g;
const reports = lines.map(l => l.matchAll(reportRe).map(Number).toArray());

const safeReports = reports.filter(
  report => isSorted(report) && adjacentLevelsDifferByOneToThree(report)
);

assert.strictEqual(safeReports.length, 359, 'Part 1 failed');
