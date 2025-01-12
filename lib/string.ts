import assert from 'node:assert';

import {isDefined} from './predicate.js';

export function stringToCodePoints(
  s: string,
  fn = (codePoint: number) => codePoint
) {
  return [...s].map(char => {
    const codePoint = char.codePointAt(0);
    assert(isDefined(codePoint));
    return fn(codePoint);
  });
}
