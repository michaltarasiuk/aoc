import {extractInts} from 'lib/extract_ints';
import {getInputParagraphs} from 'lib/input';
import {z} from 'zod';

const paragraphs = await getInputParagraphs({year: 2022, day: 11});

const monkeyRe = new RegExp(String.raw`Monkey (?<id>\d):
  Starting items: (?<items>.*)
  Operation: new = (?<operation>.*)
  Test: divisible by (?<divisibleBy>\d+)
    If true: throw to monkey (?<throwToTrue>\d+)
    If false: throw to monkey (?<throwToFalse>\d+)`);

const MONKEY_SCHEMA = z.object({
  id: z.string().transform(Number),
  items: z.string().transform(extractInts),
  operation: z.string(),
  divisibleBy: z.string().transform(Number),
  throwToTrue: z.string().transform(Number),
  throwToFalse: z.string().transform(Number),
});

function parseMonkey(paragraph: string[]) {
  const {groups} = monkeyRe.exec(paragraph.join('\n'))!;
  return MONKEY_SCHEMA.parse(groups);
}

function evalOperation(operation: string, old: number): number {
  return eval(operation.replaceAll(/old/g, String(old)));
}

const monkeys = new Map(
  paragraphs.map((p) => {
    const monkey = parseMonkey(p);
    return [monkey.id, {inspects: 0, ...monkey}];
  }),
);

type Monkey = typeof monkeys extends Map<number, infer Monkey> ? Monkey : never;

function monkeyAct(monkey: Monkey) {
  while (monkey.items.length) {
    const item = Math.floor(
      evalOperation(monkey.operation, monkey.items.shift()!) / 3,
    );
    const divisible = item % monkey.divisibleBy === 0;
    const throwTo = divisible ? monkey.throwToTrue : monkey.throwToFalse;

    monkey.inspects++;
    monkeys.get(throwTo)!.items.push(item);
  }
}

for (let i = 1; i <= 20; i++) {
  for (const monkey of monkeys.values()) {
    monkeyAct(monkey);
  }
}

const [a, b] = Array.from(monkeys.values()).toSorted(
  (a, b) => b.inspects - a.inspects,
);

const monkeyBussiness = a.inspects * b.inspects;

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(monkeyBussiness).toBe(55458);
  });
}
