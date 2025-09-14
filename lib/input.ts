import assert from 'node:assert';
import fs from 'node:fs/promises';
import path from 'node:path';

import findCacheDirectory from 'find-cache-directory';

import {env} from '../env.js';
import {isDefined} from './is_defined.js';

interface InputOptions {
  year: number;
  day: number;
}

export async function readInput(options: InputOptions) {
  validateInputOptions(options);
  let input = await getCachedInput(options);
  if (!isDefined(input)) {
    input = await fetchInput(options);
    cacheInput(options, input);
  }
  return input.trimEnd();
}

function validateInputOptions({year, day}: InputOptions) {
  assert(
    Number.isInteger(year) && year >= 2015,
    `Invalid year: ${year}. Must be an integer >= 2015`
  );
  assert(
    Number.isInteger(day) && day >= 1 && day <= 25,
    `Invalid day: ${day}. Must be an integer between 1 and 25`
  );
}

async function fetchInput({year, day}: InputOptions) {
  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  const response = await fetch(url, {
    headers: {
      'Accept': 'text/plain',
      'Cookie': `session=${env.session}`,
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch input for ${year}/day/${day}: ${response.status} ${response.statusText}`
    );
  }
  return await response.text();
}

async function getCachedInput(options: InputOptions): Promise<string | null> {
  const filePath = getCacheFilePath(options);
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch {
    return null;
  }
}

async function cacheInput(options: InputOptions, input: string) {
  const filePath = getCacheFilePath(options);
  await fs.mkdir(path.dirname(filePath), {recursive: true});
  await fs.writeFile(filePath, input, 'utf-8');
}

function getCacheFilePath({year, day}: InputOptions): string {
  const directory = `year_${year}`;
  const filename = `day_${String(day).padStart(2, '0')}.txt`;
  return path.join(getCacheDirectory(), directory, filename);
}

function getCacheDirectory() {
  const cacheDirectory = findCacheDirectory({
    name: 'advent-of-code',
    create: true,
  });
  assert(isDefined(cacheDirectory), 'Failed to create cache directory');
  return cacheDirectory;
}
