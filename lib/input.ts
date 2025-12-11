import {env} from './env.js';

export async function fetchInput({year, day}: {year: number; day: number}) {
  const response = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers: {
        'Accept': 'text/plain',
        'Cookie': `session=${env.session}`,
      },
    }
  );
  return (await response.text()).trimEnd();
}
