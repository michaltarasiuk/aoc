import {getInputLines} from 'lib/input';

const lines = await getInputLines({year: 2016, day: 7});

function parseIPAddress(ipAddress: string) {
  const squareBracketRe = /\[|\]/;
  const {supernets = [], hypernets = []} = Object.groupBy(
    ipAddress.split(squareBracketRe),
    (_, i) => (i % 2 === 0 ? 'supernets' : 'hypernets'),
  );

  return {supernets: String(supernets), hypernets: String(hypernets)};
}

const abbaRe = /(\w)((?!\1)\w)\2\1/;

const tlsSupportedIpsCount = lines.reduce((acc, line) => {
  const {supernets, hypernets} = parseIPAddress(line);

  if (abbaRe.test(supernets) && !abbaRe.test(hypernets)) {
    acc++;
  }
  return acc;
}, 0);

const abaRe = /(\w)((?!\1)\w)\1.*, .*\2\1\2.*/;

const sslSupportedIpsCount = lines.reduce((acc, line) => {
  const {supernets, hypernets} = parseIPAddress(line);

  if (abaRe.test(`${supernets}, ${hypernets}`)) {
    acc++;
  }
  return acc;
}, 0);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(tlsSupportedIpsCount).toBe(110);
  });

  test('part 2', () => {
    expect(sslSupportedIpsCount).toBe(242);
  });
}
