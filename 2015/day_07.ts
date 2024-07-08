import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2015, day: 7});

function parseInstruction(instruction: string) {
  return [
    ...(instruction.match(/[A-Z]+/) ?? []),
    ...(instruction.match(/([a-z]|[0-9])+/g) ?? []),
  ];
}

const circuit = lns.reduce<Record<string, string[]>>((acc, ln) => {
  const instruction = parseInstruction(ln);
  const dest = instruction.pop();

  if (dest) {
    acc[dest] = instruction;
  }
  return acc;
}, {});

let cache = new Map<string, number>();

function calcSignalOrParse(s: string) {
  const parsed = Number(s);

  if (Number.isNaN(parsed)) {
    return cache.get(s) ?? cache.set(s, calcSignal(s)).get(s)!;
  }
  return parsed;
}

function calcSignal(dest: string): number {
  if (!(dest in circuit)) throw new Error(`No destination for "${dest}"`);

  const [gate, a, b] = circuit[dest];

  switch (gate) {
    case 'AND':
      return calcSignalOrParse(a) & calcSignalOrParse(b);
    case 'OR':
      return calcSignalOrParse(a) | calcSignalOrParse(b);
    case 'LSHIFT':
      return calcSignalOrParse(a) << calcSignalOrParse(b);
    case 'RSHIFT':
      return calcSignalOrParse(a) >> calcSignalOrParse(b);
    case 'NOT':
      return ~calcSignalOrParse(a);
    default:
      return calcSignalOrParse(gate);
  }
}

const result = calcSignal('a');

cache = new Map<string, number>([['b', result]]);

const result2 = calcSignal('a');

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(result).toBe(46065);
  });

  test('part 2', () => {
    expect(result2).toBe(14134);
  });
}
