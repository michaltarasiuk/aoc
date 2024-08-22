import {frequencies} from 'lib/frequencies';
import {getInputParagraphs} from 'lib/input';
import {isDefined} from 'lib/is_defined';

const [[polymerTemplate], pairInsertionRules] = await getInputParagraphs({
  year: 2021,
  day: 14,
});

function parsePairInsertionRule(rule: string) {
  const pairInsertionRule = /^(\w{2}) -> (\w)$/;
  const [, pair, insertion] = rule.match(pairInsertionRule) ?? [];

  return {pair, insertion};
}

function pairInsertion(
  [a, b, ...rest]: string,
  rules: Map<string, string>,
): string {
  if (!isDefined(b)) {
    return a;
  }
  const pair = a + b;
  const insertion = rules.get(pair);

  if (!insertion) {
    return pair + pairInsertion(rest.join(''), rules);
  }
  const pairRe = new RegExp(pair.replace(/(\w)/, '($1)'));

  return (
    pair.replace(pairRe, `$1${insertion}`) +
    pairInsertion(b + rest.join(''), rules)
  );
}

const pairInsertionRulesMap = new Map(
  pairInsertionRules.map((rule) => {
    const {pair, insertion} = parsePairInsertionRule(rule);
    return [pair, insertion];
  }),
);

const STEPS_COUNT = 10;

let polymer = polymerTemplate;
for (let i = 0; i < STEPS_COUNT; i++) {
  polymer = pairInsertion(polymer, pairInsertionRulesMap);
}

const frequency = Array.from(frequencies(polymer).values());
const frequencyRange = Math.max(...frequency) - Math.min(...frequency);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(frequencyRange).toBe(2447);
  });
}
