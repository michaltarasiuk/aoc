import {getInputNumbers} from 'lib/input';
import {sum} from 'lib/sum';

const numbers = await getInputNumbers({year: 2019, day: 1});

const fuel = sum(...numbers.map((mass) => Math.floor(mass / 3) - 2));
console.log(fuel);
