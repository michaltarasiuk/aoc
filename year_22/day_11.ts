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

function parseMonkey(paragraph: string[]) {
  const monkey = paragraph.join('\n').match(monkeyRe)?.groups;
  return MONKEY_SCHEMA.parse(monkey);
}

type Monkey = z.infer<typeof MONKEY_SCHEMA> & {inspects: number};

function processRound(monkeys: Map<number, Monkey>) {
  for (const monkey of monkeys.values()) {
    const items = monkey.items.splice(0);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used by eval expression
    for (const old of items) {
      const newItem = Math.floor(eval(monkey.operation) / 3);
      const throwTo = monkey[`throwTo_${newItem % monkey.divider === 0}`];

      monkey.inspects++;
      monkeys.get(throwTo)!.items.push(newItem);
    }
  }
}

function calcBusinessLevel(monkeys: Map<number, Monkey>) {
  const [a, b] = Array.from(monkeys.values()).toSorted(
    (a, b) => b.inspects - a.inspects,
  );
  return a.inspects * b.inspects;
}

const monkeys = new Map<number, Monkey>(
  paragraphs
    .map(parseMonkey)
    .map((monkey) => [monkey.id, {...monkey, inspects: 0}]),
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
