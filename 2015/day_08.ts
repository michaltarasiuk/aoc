import {getInputLns} from 'lib/input';
import {sum} from 'lib/sum';

const lns = await getInputLns({year: 2015, day: 8});

const ns = lns.map(({length}) => length);
const ns2 = (<string[]>eval(`[${lns.join()}]`)).map(({length}) => length);

console.log(sum(...ns) - sum(...ns2));

const ns3 = lns.map((ln) => JSON.stringify(ln).length);

console.log(sum(...ns3) - sum(...ns));
