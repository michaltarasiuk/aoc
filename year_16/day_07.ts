import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

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

const tlsSupportedIps = ipAddresses.filter(
  ({supers, hypers}) => abbaRe.test(supers) && !abbaRe.test(hypers)
);

const sslSupportedIps = ipAddresses.filter(({supers, hypers}) =>
  abaRe.test(supers + ' ' + hypers)
);

assert.strictEqual(tlsSupportedIps.length, 110, 'Part 1 failed');
assert.strictEqual(sslSupportedIps.length, 242, 'Part 2 failed');
