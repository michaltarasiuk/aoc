import assert from 'node:assert';

import {frequencies} from 'lib/frequencies.js';
import {readInput} from 'lib/input.js';
import {isDefined} from 'lib/is_defined.js';
import {raise} from 'lib/raise.js';

const input = await readInput({year: 2021, day: 14});

function pairInsertion(
  [...polymerElements]: string,
  rules: Map<string, string>
) {
  let polymer = '';
  for (const [i, a] of polymerElements.entries()) {
    const b = polymerElements.at(i + 1);
    if (!isDefined(b)) {
      return polymer + a;
    }
    const pair = a + b;
    const insertion = rules.get(pair);
    if (isDefined(insertion)) {
      polymer += pair.replace(
        new RegExp(pair.replace(/(\w)/, '($1)')),
        `$1${insertion}`
      );
    } else {
      polymer += pair;
    }
  }
  throw raise('Unreachable');
}

const [polymerTemplate, rules] = input.split(/\n\n/);

const ruleRe = /^(\w{2}) -> (\w)$/;
const rulesMap = new Map(
  rules.split(/\n/).map(rule => {
    const [, pair, insertion] = ruleRe.exec(rule) ?? raise('Invalid rule');
    return [pair, insertion];
  })
);

const StepsCount = 10;

let polymer = polymerTemplate;
for (let i = 0; i < StepsCount; i++) {
  polymer = pairInsertion(polymer, rulesMap);
}

const frequency = [...frequencies(polymer)].map(([_, count]) => count);
const frequencyRange = Math.max(...frequency) - Math.min(...frequency);

assert.strictEqual(frequencyRange, 2447, 'Part 1 failed');
