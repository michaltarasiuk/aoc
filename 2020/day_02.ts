import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2020, day: 2});

function parsePassword(s: string) {
  const passwordRe = /^(\d+)-(\d+) (\w): (\w+)$/;
  const [, min, max, char, password] = s.match(passwordRe)!;

  return {min: Number(min), max: Number(max), char, password};
}

const validPasswordsCount = lns.reduce((acc, ln) => {
  const {min, max, char, password} = parsePassword(ln);
  const count = password.split(char).length - 1;

  if (count >= min && count <= max) {
    acc++;
  }
  return acc;
}, 0);

const validPasswordsCount2 = lns.reduce((acc, ln) => {
  const {min, max, char, password} = parsePassword(ln);
  const minChar = password[min - 1];
  const maxChar = password[max - 1];

  if ((minChar === char) !== (maxChar === char)) {
    acc++;
  }
  return acc;
}, 0);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(validPasswordsCount).toBe(445);
  });

  test('part 2', () => {
    expect(validPasswordsCount2).toBe(491);
  });
}
