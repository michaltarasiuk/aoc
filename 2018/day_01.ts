import {getInputNumbers} from 'lib/input';
import {sum} from 'lib/sum';

const numbers = await getInputNumbers({year: 2018, day: 1});

console.log(sum(...numbers));
