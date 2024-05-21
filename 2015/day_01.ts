import {getInput} from 'lib/input';

const input = await getInput({year: 2015, day: 1});

let floor = 0;
let basementEntryIdx: number | null = null;

for (const [idx, char] of Object.entries(input)) {
    floor += char === '(' ? 1 : -1;
    if (floor === -1) basementEntryIdx ??= Number(idx) + 1;
}

console.log({
    floor,
    basementEntryIdx,
});
