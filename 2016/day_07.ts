import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2016, day: 7});

function parseIPAddress(ipAddress: string) {
  const squareBracketRe = /\[|\]/;
  const {supernets = [], hypernets = []} = Object.groupBy(
    ipAddress.split(squareBracketRe),
    (_, i) => (i % 2 === 0 ? 'supernets' : 'hypernets'),
  );

  return {supernets: String(supernets), hypernets: String(hypernets)};
}

const abbaRe = /(\w)((?!\1)\w)\2\1/;

const tlsSupportedIpsCount = lns.reduce((acc, ln) => {
  const {supernets, hypernets} = parseIPAddress(ln);

  return acc + +(abbaRe.test(supernets) && !abbaRe.test(hypernets));
}, 0);

const abaRe = /(\w)((?!\1)\w)\1.*, .*\2\1\2.*/;

const sslSupportedIpsCount = lns.reduce((acc, ln) => {
  const {supernets, hypernets} = parseIPAddress(ln);

  return acc + +abaRe.test(`${supernets}, ${hypernets}`);
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
