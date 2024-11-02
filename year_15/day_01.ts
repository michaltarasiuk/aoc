import {getInput} from 'lib/input.js';

const input = await getInput({year: 2015, day: 1});

let floor = 0;
let basementEntryIdx: number | undefined;

for (const [i, char] of Object.entries(input)) {
  floor += char === '(' ? 1 : -1;
  if (floor === -1) basementEntryIdx ??= Number(i) + 1;
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(floor).toBe(280));
  test('part 2', () => expect(basementEntryIdx).toBe(1797));
}
