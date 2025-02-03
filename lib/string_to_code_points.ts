import assert from 'node:assert';

import {isDefined} from './is_defined.js';

export function stringToCodePoints(
  s: string,
  fn = (codePoint: number) => codePoint
) {
  return [...s].map(c => {
    const codePoint = c.codePointAt(0);
    assert(isDefined(codePoint));
    return fn(codePoint);
  });
}
