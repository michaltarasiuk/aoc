import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputParagraphs} from 'lib/input.js';
import {frequencies} from 'lib/iterable.js';
import {isDefined} from 'lib/predicate.js';

const [[polymerTemplate], rules] = await getInputParagraphs({
  year: 2021,
  day: 14,
});

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

const ruleRe = /^(\w{2}) -> (\w)$/;
const rulesMap = new Map(
  rules.map(rule => {
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
