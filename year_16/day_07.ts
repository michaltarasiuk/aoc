import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2016, day: 7});

function parseIPAddress(ipAddress: string) {
  const squareBracketRe = /\[|\]/;
  const {supernets = [], hypernets = []} = Object.groupBy(
    ipAddress.split(squareBracketRe),
    (_, i) => (i % 2 === 0 ? 'supernets' : 'hypernets')
  );

  return {supernets: supernets.join(), hypernets: hypernets.join()};
}

const abbaRe = /(\w)((?!\1)\w)\2\1/;
const abaRe = /(\w)((?!\1)\w)\1.* .*\2\1\2.*/;

const ipAddresses = lines.map(parseIPAddress);

const tlsSupportedIpsCount = sum(
  ...ipAddresses
    .map(({supernets, hypernets}) => {
      return abbaRe.test(supernets) && !abbaRe.test(hypernets);
    })
    .map(Number)
);
const sslSupportedIpsCount = sum(
  ...ipAddresses
    .map(({supernets, hypernets}) => {
      return abaRe.test(supernets + ' ' + hypernets);
    })
    .map(Number)
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(tlsSupportedIpsCount).toBe(110));
  test('part 2', () => expect(sslSupportedIpsCount).toBe(242));
}
