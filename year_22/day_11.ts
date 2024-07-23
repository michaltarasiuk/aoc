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

function evalOperation(operation: string, old: number) {
  return eval(operation.replaceAll(/old/g, String(old)));
}

const monkeys = paragraphs.map(parseMonkey);

// TODO: Implement part 1 and part 2
for (const monkey of monkeys) {
  for (const item of monkey.items) {
    evalOperation(monkey.operation, item);
  }
}
