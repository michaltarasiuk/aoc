import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2015, day: 7});

function parseInstruction(instruction: string) {
  return [
    ...(instruction.match(/[A-Z]+/) ?? []),
    ...(instruction.match(/([a-z]|[0-9])+/g) ?? []),
  ];
}

const circuit = lines.reduce<Record<string, string[]>>((acc, line) => {
  const instruction = parseInstruction(line);
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

const wireASignal = calcSignal('a');

cache = new Map([['b', wireASignal]]);

const finalWireASignal = calcSignal('a');

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(wireASignal).toBe(46065);
  });

  test('part 2', () => {
    expect(finalWireASignal).toBe(14134);
  });
}
