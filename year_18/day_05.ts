import {getInput} from 'lib/input.js';

const input = await getInput({year: 2018, day: 5});

function reactPolymer(polymer: string) {
  const reactionRe = /(\w)(\1)/gi;

  let exec: RegExpExecArray | null;
  let units = polymer;
  while ((exec = reactionRe.exec(units))) {
    const [match, a, b] = exec;
    if (a !== b) {
      units = units.replace(match, '');
      reactionRe.lastIndex = 0;
    } else {
      reactionRe.lastIndex--;
    }
  }
  return units;
}

const reactedPolymer = reactPolymer(input);

let unit = 'a';
let minPolymerLength = input.length;
while (unit <= 'z') {
  const unitRe = new RegExp(unit, 'gi');
  const polymer = input.replace(unitRe, '');

  minPolymerLength = Math.min(minPolymerLength, reactPolymer(polymer).length);
  unit = String.fromCodePoint(unit.codePointAt(0)! + 1);
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(reactedPolymer.length).toBe(10972);
  });

  test('part 2', () => {
    expect(minPolymerLength).toBe(5278);
  });
}
