import {getInputLns} from 'lib/input';

const commands = await getInputLns({year: 2021, day: 2});

const {horizontal, depth} = commands.reduce(
  (acc, command) => {
    const [instruct, units] = command.split(' ');

    switch (instruct) {
      case 'forward':
        acc.horizontal += Number(units);
        break;
      case 'down':
        acc.depth += Number(units);
        break;
      case 'up':
        acc.depth -= Number(units);
        break;
      default:
        throw new Error(`Unknown instruction: ${instruct}`);
    }
    return acc;
  },
  {horizontal: 0, depth: 0},
);

const distance = horizontal * depth;

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(distance).toBe(1714950);
  });
}
