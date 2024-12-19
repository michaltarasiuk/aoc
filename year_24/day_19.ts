import assert from 'node:assert';

import {getInputParagraphs} from 'lib/input.js';

const [[patterns], desings] = await getInputParagraphs({year: 2024, day: 19});

function isDesignValid(
  design: string,
  patterns: RegExp[],
  cache: Record<typeof design, boolean> = {}
) {
  if (design === '') return true;
  if (design in cache) return cache[design];
  for (const pattern of patterns) {
    if (
      pattern.test(design) &&
      isDesignValid(design.replace(pattern, ''), patterns, cache)
    ) {
      return (cache[design] = true);
    }
  }
  return (cache[design] = false);
}

const parsedPatterns = patterns.split(', ').map(p => new RegExp('^' + p));
const validDesigns = desings.filter(d => isDesignValid(d, parsedPatterns));

assert.strictEqual(validDesigns.length, 338, 'Part 1 failed');
