import {getInputLines} from 'lib/input';
import {sum} from 'lib/math';

const lines = await getInputLines({year: 2016, day: 7});

function parseIPAddress(ipAddress: string) {
  const squareBracketRe = /\[|\]/;
  const {supernets = [], hypernets = []} = Object.groupBy(
    ipAddress.split(squareBracketRe),
    (_, i) => (i % 2 === 0 ? 'supernets' : 'hypernets'),
  );

  return {supernets: String(supernets), hypernets: String(hypernets)};
}

const ipAddresses = lines.map(parseIPAddress);

const abbaRe = /(\w)((?!\1)\w)\2\1/;

const tlsSupportedIpsCount = sum(
  ...ipAddresses.map(({supernets, hypernets}) =>
    Number(abbaRe.test(supernets) && !abbaRe.test(hypernets)),
  ),
);

const abaRe = /(\w)((?!\1)\w)\1.*, .*\2\1\2.*/;

const sslSupportedIpsCount = sum(
  ...ipAddresses.map(({supernets, hypernets}) =>
    Number(abaRe.test(`${supernets}, ${hypernets}`)),
  ),
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(tlsSupportedIpsCount).toBe(110);
  });

  test('part 2', () => {
    expect(sslSupportedIpsCount).toBe(242);
  });
}
