import {getInputLines} from 'lib/input';
import {sum} from 'lib/math';

const lines = await getInputLines({year: 2020, day: 2});

function parsePassword(s: string) {
  const passwordRe = /^(\d+)-(\d+) (\w): (\w+)$/;
  const [, min, max, char, password] = s.match(passwordRe)!;

  return {min: Number(min), max: Number(max), char, password};
}

const passwords = lines.map(parsePassword);

const validPasswordsCount = sum(
  ...passwords.map(password => {
    const count = password.password.split(password.char).length - 1;
    return Number(count >= password.min && count <= password.max);
  })
);

const validPasswordsCount2 = sum(
  ...passwords.map(({min, max, char, password}) => {
    const minChar = password[min - 1];
    const maxChar = password[max - 1];

    return Number((minChar === char) !== (maxChar === char));
  })
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(validPasswordsCount).toBe(445);
  });

  test('part 2', () => {
    expect(validPasswordsCount2).toBe(491);
  });
}
