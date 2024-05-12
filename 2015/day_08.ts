import {add} from 'lib/add';
import {getInputLines} from 'lib/get_input';

const lns = await getInputLines({
	year: 2015,
	day: 8,
});

const ns = lns.map(({length}) => length);
const ns2 = (<string[]>eval(`[${lns.join()}]`)).map(({length}) => length);

console.log(add(...ns) - add(...ns2));
