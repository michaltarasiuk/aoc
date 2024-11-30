import assert from 'node:assert';

import {getInputParagraphs} from 'lib/input.js';
import {frequencies} from 'lib/iterable.js';
import {isDefined} from 'lib/predicate.js';

const [[polymerTemplate], pairInsertRules] = await getInputParagraphs({
  year: 2021,
  day: 14,
});

function parsePairInsertRule(rule: string) {
  const pairInsertionRule = /^(\w{2}) -> (\w)$/;
  const [, pair, insertion] = rule.match(pairInsertionRule) ?? [];

  return {pair, insertion};
}

function pairInsertion(
  [a, b, ...rest]: string,
  rules: Map<string, string>
): string {
  if (!isDefined(b)) {
    return a;
  }
  const pair = a + b;
  const insertion = rules.get(pair);

  if (!isDefined(insertion)) {
    return pair + pairInsertion(rest.join(''), rules);
  }
  const pairRe = new RegExp(pair.replace(/(\w)/, '($1)'));

  return (
    pair.replace(pairRe, `$1${insertion}`) +
    pairInsertion(b + rest.join(''), rules)
  );
}

const pairInsertRulesMap = new Map(
  pairInsertRules.map(rule => {
    const {pair, insertion} = parsePairInsertRule(rule);
    return [pair, insertion];
  })
);

const StepsCount = 10;

let polymer = polymerTemplate;
for (let i = 0; i < StepsCount; i++) {
  polymer = pairInsertion(polymer, pairInsertRulesMap);
}

const frequency = Array.from(frequencies(polymer), ([, count]) => count);
const frequencyRange = Math.max(...frequency) - Math.min(...frequency);

assert.strictEqual(frequencyRange, 2447, 'Part 1 failed');
