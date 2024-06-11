import {getInputNumbers} from 'lib/input';
import {sum} from 'lib/sum';

const ns = await getInputNumbers({year: 2019, day: 1});

const result = sum(...ns.map((mass) => Math.floor(mass / 3) - 2));
console.log(result);
