import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

import findCacheDirectory from 'find-cache-directory';

import {env} from '../env.js';
import {isDefined} from './is_defined.js';

interface InputOptions {
  year: number;
  day: number;
}

export async function readInput({year, day}: InputOptions) {
  let input = getCachedInput({year, day});
  if (!isDefined(input)) {
    const response = await fetch(
      `https://adventofcode.com/${year}/day/${day}/input`,
      {
        headers: {
          'Accept': 'text/plain',
          'Cookie': `session=${env.session}`,
        },
      }
    );
    input = await response.text();
    if (response.ok) {
      cacheInput({year, day}, input);
    }
  }
  return input.trimEnd();
}

function getCacheDirectory() {
  const cacheDirectory = findCacheDirectory({
    name: 'advent-of-code',
    create: true,
  });
  assert(isDefined(cacheDirectory), 'Cache directory not found');
  return cacheDirectory;
}

function createCacheFilePath({year, day}: InputOptions) {
  const filename = `day_${String(day).padStart(2, '0')}.txt`;
  return path.join(getCacheDirectory(), String(year), filename);
}

function getCachedInput(params: InputOptions) {
  const cacheFilePath = createCacheFilePath(params);
  if (!fs.existsSync(cacheFilePath)) {
    return;
  }
  return fs.readFileSync(cacheFilePath, 'utf-8');
}

function cacheInput(params: InputOptions, input: string) {
  const cacheFilePath = createCacheFilePath(params);
  fs.mkdirSync(path.dirname(cacheFilePath), {recursive: true});
  fs.writeFileSync(cacheFilePath, input);
}
