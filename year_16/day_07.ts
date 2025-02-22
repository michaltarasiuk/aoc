import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2016, day: 7});

const abbaRe = /(\w)((?!\1)\w)\2\1/;
const abaRe = /(\w)((?!\1)\w)\1.* .*\2\1\2.*/;

const ipAddresses = input.split(/\n/).map(l => {
  const {supers = [], hypers = []} = Object.groupBy(l.split(/\[|\]/), (_, i) =>
    i % 2 === 0 ? 'supers' : 'hypers'
  );
  return {supers: supers.join(), hypers: hypers.join()};
});

const tlsSupportedIpsCount = ipAddresses
  .map(({supers, hypers}) => abbaRe.test(supers) && !abbaRe.test(hypers))
  .reduce((acc, abba) => acc + Number(abba), 0);

const sslSupportedIpsCount = ipAddresses
  .map(({supers, hypers}) => abaRe.test(supers + ' ' + hypers))
  .reduce((acc, aba) => acc + Number(aba), 0);

assert.strictEqual(tlsSupportedIpsCount, 110, 'Part 1 failed');
assert.strictEqual(sslSupportedIpsCount, 242, 'Part 2 failed');
