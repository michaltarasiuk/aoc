import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2020, day: 19});

type Rule = ReturnType<typeof parseRule>;

function extractSingleChar(s: string) {
  return s.match(/^"(\w)"$/)?.[1];
}
function parseSubRules(s: string) {
  return s.split(' | ').map(sub => sub.split(/\s/).map(Number));
}
function parseRule(rule: string) {
  const [id, body] = rule.split(': ');
  return [Number(id), extractSingleChar(body) ?? parseSubRules(body)] as const;
}
function resolveRule(rule: Rule[1], ruleMap: Map<number, Rule[1]>): string {
  if (typeof rule === 'string') {
    return rule;
  }
  return `(${rule.map(sub => sub.map(id => resolveRule(ruleMap.get(id)!, ruleMap)).join('')).join('|')})`;
}

const [rules, messages] = input.split(/\n\n/).map(s => s.split(/\n/));

const ruleMap = new Map(rules.map(parseRule));
const ruleZeroRe = new RegExp(`^${resolveRule(ruleMap.get(0)!, ruleMap)}$`);

assert.strictEqual(
  messages.filter(m => ruleZeroRe.test(m)).length,
  122,
  'Part 1 failed'
);
