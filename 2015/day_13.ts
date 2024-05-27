import {getInputLns} from 'lib/input';
import {permute} from 'lib/permutate';

const lns = await getInputLns({year: 2015, day: 13});

const parseLn = (ln: string) => [
    ...(ln.match(/([A-Z])\w+/g) ?? []),
    ...(ln.match(/(gain|lose|\d+)/g) ?? []),
];

type ParsedLns = Record<string, {[name: string]: number}>;

const parsedLns = lns.reduce<ParsedLns>((acc, ln) => {
    const [a, b, type, val] = parseLn(ln);

    acc[a] ??= {};
    acc[a][b] = type === 'lose' ? -parseInt(val) : parseInt(val);

    return acc;
}, {});

const names = Object.keys(parsedLns);

function calcTotalHappiness(names: string[]) {
    return names.reduce((acc, name, idx, {length}) => {
        const left = names.at(idx - 1)!;
        const right = names.at((idx + 1) % length)!;

        return acc + parsedLns[name][left] + parsedLns[name][right];
    }, 0);
}

console.log(Math.max(...permute(names).map(calcTotalHappiness)));
