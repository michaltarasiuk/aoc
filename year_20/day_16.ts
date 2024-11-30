import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputParagraphs} from 'lib/input.js';

const [rules, , [, ...nearbyTickets]] = await getInputParagraphs({
  year: 2020,
  day: 16,
});

function parseRule(rule: string) {
  const ruleRe = /^(.+): (\d+)-(\d+) or (\d+)-(\d+)$/;
  const [, , a, b, c, d] = rule.match(ruleRe) ?? raise('Invalid rule');

  return [
    [Number(a), Number(b)],
    [Number(c), Number(d)],
  ] satisfies [number, number][];
}

function parseTicket(ticket: string) {
  return ticket.split(',').map(Number);
}

const ranges = rules.flatMap(parseRule);
const errorRate = nearbyTickets.flatMap(parseTicket).reduce((acc, n) => {
  if (!ranges.some(([a, b]) => (n >= a && n <= b) || (n >= a && n <= b))) {
    acc += n;
  }
  return acc;
}, 0);

assert.strictEqual(errorRate, 24110, 'Part 1 failed');
