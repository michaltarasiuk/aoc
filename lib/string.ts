import {assert} from './assert.js';
import {isDefined} from './predicate.js';

export function stringToCodePoints(
  string: string,
  mapfn = (codePoint: number) => codePoint
) {
  return [...string].map(char => {
    const codePoint = char.codePointAt(0);
    assert(isDefined(codePoint));
    return mapfn(codePoint);
  });
}
