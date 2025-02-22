import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

import findCacheDir from 'find-cache-dir';

import {env} from '../env.js';
import {isDefined} from './is_defined.js';

interface InputParams {
  year: number;
  day: number;
}

export async function readInput(params: InputParams) {
  let input = await getCachedInput(params);
  if (!isDefined(input)) {
    input = await fetchInput(params);
    cacheInput(params, input);
  }
  return input.trimEnd();
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
  return await response.text();
}

function getCacheDir() {
  const cacheDir = findCacheDir({name: 'advent-of-code', create: true});
  assert(isDefined(cacheDir), 'Cache directory not found');
  return cacheDir;
}

function createCacheFileUrl({year, day}: InputParams) {
  return new URL(
    `${year}/day_${String(day).padStart(2, '0')}.txt`,
    `file://${getCacheDir()}/`
  );
}

function getCachedInput(params: InputParams) {
  const cacheFileUrl = createCacheFileUrl(params);
  if (!fs.existsSync(cacheFileUrl)) {
    return;
  }
  return fs.readFileSync(cacheFileUrl, 'utf-8');
}

function cacheInput(params: InputParams, input: string) {
  const cacheFileUrl = createCacheFileUrl(params);
  fs.mkdirSync(path.dirname(cacheFileUrl.pathname), {recursive: true});
  fs.writeFileSync(cacheFileUrl, input);
}
