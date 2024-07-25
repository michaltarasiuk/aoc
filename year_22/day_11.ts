import {extractInts} from 'lib/extract_ints';
import {getInputParagraphs} from 'lib/input';
import {z} from 'zod';

const paragraphs = await getInputParagraphs({year: 2022, day: 11});

const monkeyRe = new RegExp(`\
Monkey (?<id>\\d):
  Starting items: (?<items>.*)
  Operation: new = (?<operation>.*)
  Test: divisible by (?<divider>\\d+)
    If true: throw to monkey (?<throwTo_true>\\d+)
    If false: throw to monkey (?<throwTo_false>\\d+)`);

const MONKEY_SCHEMA = z.object({
  id: z.string().transform(Number),
  items: z.string().transform(extractInts),
  operation: z.string(),
  divider: z.string().transform(Number),
  throwTo_true: z.string().transform(Number),
  throwTo_false: z.string().transform(Number),
});

function parseMonkey(paragraph: string[]) {
  const groups = paragraph.join('\n').match(monkeyRe)?.groups;
  return {inspects: 0, ...MONKEY_SCHEMA.parse(groups)};
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars
  -- used by eval expression
  -- operation example: "1 + old"
*/
function evalOperation(operation: string, old: number) {
  return eval(operation);
}

function reduceWorryLevel(worryLevel: number) {
  return Math.floor(worryLevel / 3);
}

function distributeItems(monkey: ReturnType<typeof parseMonkey>) {
  while (monkey.items.length) {
    const old = monkey.items.pop()!;
    const item = reduceWorryLevel(evalOperation(monkey.operation, old));
    const divisible = item % monkey.divider === 0;
    const throwTo = monkey[`throwTo_${divisible}`];

    monkey.inspects++;
    monkeys.get(throwTo)?.items.push(item);
  }
}

const monkeys = new Map(
  paragraphs.map((p) => {
    const monkey = parseMonkey(p);
    return [monkey.id, monkey];
  }),
);

const ROUND_COUNT = 20;

for (let i = 1; i <= ROUND_COUNT; i++) {
  for (const monkey of monkeys.values()) {
    distributeItems(monkey);
  }
}

const [a, b] = Array.from(monkeys.values()).toSorted(
  (a, b) => b.inspects - a.inspects,
);
const monkeyBusinessLevel = a.inspects * b.inspects;

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(monkeyBusinessLevel).toBe(55458);
  });
}
