import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

import findCacheDir from 'find-cache-dir';

import {env} from '../env.js';
import {transpose} from './array.js';
import {extractInts} from './parse.js';
import {isDefined} from './predicate.js';

interface InputParams {
  year: number;
  day: number;
}

const inputCache = createInputCache();
export async function getInput(...params: Parameters<typeof fetchInput>) {
  let input = await inputCache.get(...params);
  if (!input) {
    input = await fetchInput(...params);
    inputCache.set(...params, input);
  }
  return input.trimEnd();
}

export async function getInputParagraphs(params: InputParams) {
  const input = await getInput(params);
  return input.split(/\n\n+/).map(p => p.split(/\n/));
}
export async function getInputInts(
  params: InputParams,
  options?: Parameters<typeof extractInts>[1]
) {
  const input = await getInput(params);
  return extractInts(input, options);
}
export async function getInputLines(params: InputParams) {
  const input = await getInput(params);
  return input.split(/\n/);
}
export async function getInputGrid<T extends string | unknown = string>(
  params: InputParams,
  fn: (char: string) => T = char => char as T
) {
  const lines = await getInputLines(params);
  return lines.map(([...chars]) => chars.map(char => fn(char)));
}
export async function getInputCols(params: InputParams) {
  const grid = await getInputGrid(params);
  return transpose(grid);
}

class ResponseError extends Error {
  constructor(public response: Response) {
    super(`Failed to fetch input: ${response.status} ${response.statusText}`);
    this.name = ResponseError.name;
  }
}
async function fetchInput({year, day}: InputParams) {
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

function createCacheFileURL(cacheDir: string, {year, day}: InputParams) {
  return new URL(
    `${year}/day_${String(day).padStart(2, '0')}.txt`,
    `file://${cacheDir}/`
  );
}
function createInputCache() {
  const cacheDir = findCacheDir({name: 'advent-of-code', create: true});
  assert(isDefined(cacheDir), 'Cache directory not found');
  return {
    get(params: InputParams) {
      const cacheFileUrl = createCacheFileURL(cacheDir, params);
      if (!fs.existsSync(cacheFileUrl)) {
        return;
      }
      return fs.readFileSync(cacheFileUrl, 'utf-8');
    },
    set(params: InputParams, input: string) {
      const cacheFileUrl = createCacheFileURL(cacheDir, params);
      fs.mkdirSync(path.dirname(cacheFileUrl.pathname), {recursive: true});
      fs.writeFileSync(cacheFileUrl, input);
    },
  };
}
