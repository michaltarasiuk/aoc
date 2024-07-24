import {extractInts} from 'lib/extract_ints';
import {getInputParagraphs} from 'lib/input';
import {z} from 'zod';

const paragraphs = await getInputParagraphs({year: 2022, day: 11});

const monkeyRe = new RegExp(`\
Monkey (?<id>\\d):
  Starting items: (?<items>.*)
  Operation: new = (?<operation>.*)
  Test: divisible by (?<divider>\\d+)
    If true: throw to monkey (?<throwToTrue>\\d+)
    If false: throw to monkey (?<throwToFalse>\\d+)`);

const MONKEY_SCHEMA = z.object({
  id: z.string().transform(Number),
  items: z.string().transform(extractInts),
  operation: z.string(),
  divider: z.string().transform(Number),
  throwToTrue: z.string().transform(Number),
  throwToFalse: z.string().transform(Number),
});

function parseMonkey(paragraph: string[]) {
  const groups = paragraph.join('\n').match(monkeyRe)?.groups;
  return {inspects: 0, ...MONKEY_SCHEMA.parse(groups)};
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
    monkey;
  }
}

const [a, b] = Array.from(monkeys.values()).toSorted(
  (a, b) => b.inspects - a.inspects,
);

a.inspects * b.inspects;
