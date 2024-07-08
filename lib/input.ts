import {match, P} from 'ts-pattern';
import * as v from 'valibot';

import {env} from '../env';
import {extractInts} from './extract_ints';

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
  const cols: string[] = [];

  for (let i = 0, length = lns[0].length; i < length; i++) {
    cols.push(lns.map((l) => l.at(i)).join(''));
  }
  return cols;
}

export async function getInputGrid(...params: Parameters<typeof getInputLns>) {
  const lns = await getInputLns(...params);
  return lns.map((ln) => ln.split(''));
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

const INPUT_SCHEMA = v.object({
  year: v.number([
    v.integer('The year must be an integer.'),
    v.minValue(2015, 'The year must be at least 2015.'),
    v.maxValue(2023, 'The year must not exceed 2023.'),
  ]),
  day: v.number([
    v.integer('The day must be an integer.'),
    v.minValue(1, 'The day must be at least 1.'),
    v.maxValue(25, 'The day must not exceed 25.'),
  ]),
});

async function fetchInput(input: {year: number; day: number}) {
  try {
    v.parse(INPUT_SCHEMA, input);
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
  } catch (value) {
    const errorMessage = await match(value)
      .with(P.instanceOf(v.ValiError), (valiError) =>
        getMessageOfValiError(valiError),
      )
      .with(P.instanceOf(ResponseError), (responseError) =>
        getMessageOfResponseError(responseError),
      )
      .with(P.instanceOf(Error), (error) => error.message)
      .run();

    console.error(errorMessage);
    process.exit();
  }
}

function getMessageOfValiError(error: v.ValiError) {
  return error.issues.map((issue) => `[ValiError] ${issue.message}`).join('\n');
}

async function getMessageOfResponseError(error: ResponseError) {
  const text = await error.response.text();
  return `[ResponseError] ${text}`;
}
