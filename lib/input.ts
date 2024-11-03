import {env} from '../env.js';
import {transpose} from './array.js';
import {extractInts} from './parse.js';

export async function getInput(...params: Parameters<typeof fetchInput>) {
  const input = await fetchInput(...params);
  return input.trimEnd();
}

export async function getInputCols(
  ...params: Parameters<typeof getInputLines>
) {
  const grid = await getInputGrid(...params);
  return transpose(grid);
}

export async function getInputGrid(
  ...params: Parameters<typeof getInputLines>
) {
  const lines = await getInputLines(...params);
  return lines.map(([...chars]) => chars);
}

export async function getInputInts(...params: Parameters<typeof getInput>) {
  const input = await getInput(...params);
  return extractInts(input);
}

export async function getInputLines(...params: Parameters<typeof getInput>) {
  const input = await getInput(...params);
  return input.split(/\n/);
}

export async function getInputParagraphs(
  ...params: Parameters<typeof getInput>
) {
  const input = await getInput(...params);
  return input.split(/\n\n+/).map(paragraph => paragraph.split(/\n/));
}

class ResponseError extends Error {
  constructor(public response: Response) {
    super();
    this.name = ResponseError.name;
  }
}
async function fetchInput({year, day}: {year: number; day: number}) {
  const response = await fetch(
    new URL(`${year}/day/${day}/input`, 'https://adventofcode.com'),
    {
      headers: {
        Accept: 'text/plain',
        Cookie: `session=${env.session}`,
      },
    }
  );
  if (!response.ok) {
    throw new ResponseError(response);
  }
  return await response.text();
}
