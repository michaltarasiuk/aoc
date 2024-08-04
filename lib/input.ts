import {z} from 'zod';

import {env} from '../env';
import {extractInts} from './extract_ints';
import {getCols} from './get_cols';

export async function getInput(...params: Parameters<typeof fetchInput>) {
  const input = await fetchInput(...params);
  return input.trimEnd();
}

export async function getInputLns(...params: Parameters<typeof getInput>) {
  const input = await getInput(...params);
  return input.split('\n');
}

export async function getInputCols(...params: Parameters<typeof getInputLns>) {
  const lns = await getInputLns(...params);
  return getCols(lns.map(([...chars]) => chars));
}

export async function getInputGrid(...params: Parameters<typeof getInputLns>) {
  const lns = await getInputLns(...params);
  return lns.map(([...chars]) => chars);
}

export async function getInputParagraphs(
  ...params: Parameters<typeof getInput>
) {
  const input = await getInput(...params);
  const newlineRe = /\n\n+/;

  return input.split(newlineRe).map((paragraph) => paragraph.split('\n'));
}

export async function getInputCSV(...params: Parameters<typeof getInput>) {
  const input = await getInput(...params);
  const newlineRe = /\n/;
  const csvRe = /, /;

  return input.split(newlineRe).map((line) => line.split(csvRe));
}

export async function getInputInts(...params: Parameters<typeof getInput>) {
  const input = await getInput(...params);
  return extractInts(input);
}

class ResponseError extends Error {
  constructor(public response: Response) {
    super();
    this.name = ResponseError.name;
  }
}

const INPUT_SCHEMA = z.object({
  year: z
    .number()
    .int('The day must be an integer')
    .min(2015, 'The year must be at least 2015')
    .max(2023, 'The year must not exceed 2023'),
  day: z
    .number()
    .int('The day must be an integer')
    .min(1, 'The day must be at least 1')
    .max(25, 'The day must not exceed 25'),
});

async function fetchInput(input: {year: number; day: number}) {
  try {
    INPUT_SCHEMA.parse(input);
    const {year, day} = input;

    const response = await fetch(
      `https://adventofcode.com/${year}/day/${day}/input`,
      {
        headers: {
          Accept: 'text/plain',
          Cookie: `session=${env.session}`,
        },
      },
    );
    if (!response.ok) {
      throw new ResponseError(response);
    }

    return await response.text();
  } catch (error) {
    let errorMessage = 'Failed to fetch input';

    if (error instanceof ResponseError) {
      errorMessage = error.response.statusText;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
}
