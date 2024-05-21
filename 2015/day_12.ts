import {add} from 'lib/add';
import {getInput} from 'lib/input';
import {isObject} from 'lib/is_object';

const input = await getInput({year: 2015, day: 12});

const ns: number[] = [];
const parsed = JSON.parse(input, (_, val: unknown) => {
    if (typeof val === 'number') ns.push(val);
    return val;
});

const ns2: number[] = [];
JSON.stringify(parsed, (_, val: unknown) => {
    if (isObject(val)) {
        for (const v of Object.values(val)) {
            if (v === 'red') return;
        }
    } else if (typeof val === 'number') {
        ns2.push(val);
    }

    return val;
});

console.log(add(ns));
console.log(add(ns2));
