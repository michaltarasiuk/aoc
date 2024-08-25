import {getInputParagraphs} from 'lib/input';
import {matchInts} from 'lib/ints';
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
  items: z.string().transform(matchInts),
  operation: z.string(),
  divider: z.string().transform(Number),
  throwTo_true: z.string().transform(Number),
  throwTo_false: z.string().transform(Number),
});

type Monkey = ReturnType<typeof parseMonkey>;

function parseMonkey(paragraph: string[]) {
  const monkey = paragraph.join('\n').match(monkeyRe)?.groups;
  return {inspects: 0, ...MONKEY_SCHEMA.parse(monkey)};
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars
  -- Used by eval expression
  -- Operation example: "1 + old"
*/
function inspect(monkey: Monkey, old: number) {
  monkey.inspects++;
  return Math.floor(eval(monkey.operation) / 3);
}

function processRound(monkeys: Map<number, Monkey>) {
  for (const monkey of monkeys.values()) {
    for (const item of monkey.items.splice(0)) {
      const newItem = inspect(monkey, item);
      const throwTo = monkey[`throwTo_${newItem % monkey.divider === 0}`];

      monkeys.get(throwTo)?.items.push(newItem);
    }
  }
}

function calcBusinessLevel(monkeys: Map<number, Monkey>) {
  const [a, b] = Array.from(monkeys.values()).toSorted(
    (a, b) => b.inspects - a.inspects,
  );
  return a.inspects * b.inspects;
}

const monkeys = new Map(
  paragraphs.map(parseMonkey).map((monkey) => [monkey.id, monkey]),
);

const ROUNDS_COUNT = 20;
for (let i = 0; i < ROUNDS_COUNT; i++) {
  processRound(monkeys);
}

const businessLevel = calcBusinessLevel(monkeys);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(businessLevel).toBe(55458);
  });
}
