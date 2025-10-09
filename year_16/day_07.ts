import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2016, day: 7});

const abbaRe = /(\w)((?!\1)\w)\2\1/;
const abaRe = /(\w)((?!\1)\w)\1.* .*\2\1\2.*/;

const ipAddresses = input.split(/\n/).map(l => {
  const groups = Object.groupBy(l.split(/\[|\]/), (_, i) =>
    i % 2 === 0 ? 'supers' : 'hypers'
  );
  return {
    supers: groups.supers?.join() ?? '',
    hypers: groups.hypers?.join() ?? '',
  };
});

const tlsSupportedIpsCount = ipAddresses.filter(
  ({supers, hypers}) => abbaRe.test(supers) && !abbaRe.test(hypers)
).length;

const sslSupportedIpsCount = ipAddresses.filter(({supers, hypers}) =>
  abaRe.test(supers + ' ' + hypers)
).length;

assert.strictEqual(tlsSupportedIpsCount, 110, 'Part 1 failed');
assert.strictEqual(sslSupportedIpsCount, 242, 'Part 2 failed');
