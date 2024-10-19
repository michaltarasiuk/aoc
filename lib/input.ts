import {z} from 'zod';
import {fromError as fromZodError, isZodErrorLike} from 'zod-validation-error';

import {env} from '../env.js';
import {transpose} from './array.js';
import {extractInts} from './parse.js';

export async function getInput(...params: Parameters<typeof fetchInput>) {
  const input = await fetchInput(...params);
  return input.trimEnd();
}

export async function getInputLines(...params: Parameters<typeof getInput>) {
  const input = await getInput(...params);
  return input.split('\n');
}

export async function getInputCols(
  ...params: Parameters<typeof getInputLines>
) {
  const lines = await getInputLines(...params);
  return transpose(lines.map(([...chars]) => chars));
}

export async function getInputGrid(
  ...params: Parameters<typeof getInputLines>
) {
  const lines = await getInputLines(...params);
  return lines.map(([...chars]) => chars);
}

export async function getInputParagraphs(
  ...params: Parameters<typeof getInput>
) {
  const input = await getInput(...params);
  return input.split(/\n\n+/).map(paragraph => paragraph.split('\n'));
}

export async function getInputInts(...params: Parameters<typeof getInput>) {
  const input = await getInput(...params);
  return extractInts(input);
}

const InputSchema = z.object({
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

class ResponseError extends Error {
  constructor(public response: Response) {
    super();
    this.name = ResponseError.name;
  }
}

async function fetchInput(input: {year: number; day: number}) {
  try {
    const {year, day} = InputSchema.parse(input);
    const response = await fetch(
      `https://adventofcode.com/${year}/day/${day}/input`,
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
  } catch (error) {
    if (isZodErrorLike(error)) {
      throw new Error(fromZodError(error).message);
    } else if (error instanceof ResponseError) {
      const {status, statusText} = error.response;
      throw new Error(`HTTP ${status} ${statusText}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
