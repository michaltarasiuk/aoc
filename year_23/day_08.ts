import {lcm} from 'lib/divisors';
import {getInputParagraphs} from 'lib/input';

const [[instructions], maps] = await getInputParagraphs({year: 2023, day: 8});

const parsedMaps = maps.reduce<Record<string, [string, string]>>((acc, map) => {
  const mapRe = /^(\w{3}) = \((\w{3}), (\w{3})\)$/;
  const [, name, left, right] = map.match(mapRe)!;

  acc[name] = [left, right];
  return acc;
}, {});

function countStepsToNode(start: string, predicate: (node: string) => boolean) {
  let node = start;
  let steps = 0;

  while (!predicate(node)) {
    const [left, right] = parsedMaps[node];
    const instruction = instructions[steps % instructions.length];

    node = instruction === 'L' ? left : right;
    steps++;
  }
  return steps;
}

function countStepsToNodes(
  startingNodes: string[],
  predicate: (node: string) => boolean,
) {
  const steps = startingNodes.map((start) =>
    countStepsToNode(start, predicate),
  );
  return lcm(...steps);
}

function nodeEndsWith(node: string, char: string) {
  return new RegExp(`^[A-Z]{2}${char}$`).test(node);
}

const START_NODE = 'AAA';
const TARGET_NODE = 'ZZZ';
const steps = countStepsToNode(START_NODE, (node) => node === TARGET_NODE);

const nodesEndsWithA = Object.keys(parsedMaps).filter((node) =>
  nodeEndsWith(node, 'A'),
);
const steps2 = countStepsToNodes(nodesEndsWithA, (node) =>
  nodeEndsWith(node, 'Z'),
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(steps).toBe(20569);
  });

  test('part 2', () => {
    expect(steps2).toBe(21366921060721);
  });
}
