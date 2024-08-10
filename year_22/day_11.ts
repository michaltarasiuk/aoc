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
  const groups = paragraph.join('\n').match(monkeyRe)?.groups;
  return MONKEY_SCHEMA.parse(groups);
}

type MonkeySchema = z.infer<typeof MONKEY_SCHEMA>;
type Monkey = MonkeySchema & {inspects: number};

class SimianShenanigas {
  #monkeys: Map<Monkey['id'], Monkey>;

  constructor(monkeys: MonkeySchema[]) {
    this.#monkeys = new Map(
      monkeys.map((monkey) => [monkey.id, {...monkey, inspects: 0}]),
    );
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars
  -- used by eval expression
  -- operation example: "1 + old"
  */
  #evalOperation(operation: string, old: number) {
    return eval(operation);
  }

  #reduceWorryLevel(worryLevel: number) {
    return Math.floor(worryLevel / 3);
  }

  #inspect(monkey: Monkey, item: number) {
    const divisible = item % monkey.divider === 0;
    const target = this.#monkeys.get(monkey[`throwTo_${divisible}`])!;

    monkey.inspects++;
    target.items.push(item);
  }

  #stuffSlinging(monkey: Monkey) {
    for (const old of monkey.items.splice(0)) {
      const item = this.#reduceWorryLevel(
        this.#evalOperation(monkey.operation, old),
      );
      this.#inspect(monkey, item);
    }
  }

  stuffSlinging(rounds = 20) {
    for (let i = 0; i < rounds; i++) {
      for (const monkey of this.#monkeys.values()) {
        this.#stuffSlinging(monkey);
      }
    }
    return this;
  }

  businessLevel() {
    const [a, b] = Array.from(this.#monkeys.values()).toSorted(
      (a, b) => b.inspects - a.inspects,
    );
    return a.inspects * b.inspects;
  }
}

const monkeys = paragraphs.map(parseMonkey);
const businessLevel = new SimianShenanigas(monkeys)
  .stuffSlinging()
  .businessLevel();

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(businessLevel).toBe(55458);
  });
}
