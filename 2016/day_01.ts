import {adjacentAt} from 'lib/adjacent_at';
import {getInputCSV} from 'lib/input';

const [instructions] = await getInputCSV({year: 2016, day: 1});

function parseInstruction(instruction: string) {
  const instructionRe = /([LR])(\d+)/;
  const [, turn, steps] = instruction.match(instructionRe)!;

  return {turn, steps: Number(steps)};
}

type Direction = 'n' | 'e' | 's' | 'w';

class Coordinates {
  static #state: Record<Direction, number> = {n: 0, e: 0, s: 0, w: 0};

  static #directions = Object.keys(this.#state) as Direction[];
  static #direction = this.#directions.at(0)!;

  static set(turn: string, steps: number) {
    const [left, right] = adjacentAt(
      this.#directions,
      this.#directions.indexOf(this.#direction),
    );

    this.#direction = turn === 'L' ? left : right;
    this.#state[this.#direction] += steps;
  }

  static calcDistance() {
    const {n, e, s, w} = this.#state;
    return Math.abs(n - s) + Math.abs(e - w);
  }
}

for (const instruction of instructions) {
  const {turn, steps} = parseInstruction(instruction);
  Coordinates.set(turn, steps);
}

const distance = Coordinates.calcDistance();

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(distance).toBe(273);
  });
}
