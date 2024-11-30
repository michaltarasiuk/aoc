import {assert} from './assert.js';

export function stringToCodePoints(
  string: string,
  fn = (codePoint: number) => codePoint
) {
  return [...string].map(char => {
    const codePoint = char.codePointAt(0);
    assert(codePoint !== undefined);
    return fn(codePoint);
  });
}
