import {env} from '../env.js';

const AdventOfCodeUrl = 'https://adventofcode.com';

export async function fetchInput({year, day}: {year: number; day: number}) {
  const response = await fetch(
    new URL(`/${year}/day/${day}/input`, AdventOfCodeUrl),
    {
      headers: {
        'Accept': 'text/plain',
        'Cookie': `session=${env.session}`,
      },
    }
  );
  const input = await response.text();
  return input.trimEnd();
}
