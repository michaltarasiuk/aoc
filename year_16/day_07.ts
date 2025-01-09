import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2016, day: 7});

const abbaRe = /(\w)((?!\1)\w)\2\1/;
const abaRe = /(\w)((?!\1)\w)\1.* .*\2\1\2.*/;

const ipAddresses = lines.map(l => {
  const squareBracketRe = /\[|\]/;
  const {supers = [], hypers = []} = Object.groupBy(
    l.split(squareBracketRe),
    (_, i) => (i % 2 === 0 ? 'supers' : 'hypers')
  );
  return {supers: supers.join(), hypers: hypers.join()};
});

const tlsSupportedIpsCount = ipAddresses
  .map(({supers, hypers}) => abbaRe.test(supers) && !abbaRe.test(hypers))
  .map(Number)
  .reduce((a, b) => a + b);

const sslSupportedIpsCount = ipAddresses
  .map(({supers, hypers}) => abaRe.test(supers + ' ' + hypers))
  .map(Number)
  .reduce((a, b) => a + b);

assert.strictEqual(tlsSupportedIpsCount, 110, 'Part 1 failed');
assert.strictEqual(sslSupportedIpsCount, 242, 'Part 2 failed');
