import assert from 'node:assert';

import {getInputParagraphs} from 'lib/input.js';

const [rules, messages] = await getInputParagraphs({year: 2020, day: 19});

function extractSingleChar(s: string) {
  return s.match(/^"(\w)"$/)?.[1];
}
function parseSubRules(s: string) {
  return s.split(' | ').map(subRule => subRule.split(/\s/).map(Number));
}
function parseRule(rule: string) {
  const [id, body] = rule.split(': ');
  return [id, extractSingleChar(body) ?? parseSubRules(body)] as const;
}

function resolveRule(rule: string | number[][]): string {
  if (typeof rule === 'string') {
    return rule;
  }
  const subRuleRe = rule
    .map(subRule =>
      subRule
        .map(String)
        .map(id => resolveRule(ruleMap.get(id)!))
        .join('')
    )
    .join('|');
  return `(${subRuleRe})`;
}

const ruleMap = new Map(rules.map(parseRule));
const ruleZeroRe = new RegExp(`^${resolveRule(ruleMap.get('0')!)}$`);

assert.strictEqual(
  messages.filter(m => ruleZeroRe.test(m)).length,
  122,
  'Part 1 failed'
);
