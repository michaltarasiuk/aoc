import {getInputLines} from 'lib/input';
import {permute} from 'lib/permutate';

const lns = await getInputLines({year: 2015, day: 9});

const parseLn = (ln: string) => {
    const lineRe = /^(\w+) to (\w+) = (\d+)$/;
    const [, a, b, cost] = ln.match(lineRe) ?? [];

    if (!a || !b || !cost) throw new Error('Invalid line');
    return {a, b, cost: Number(cost)};
};

// Like {[city]: {[dest]: cost}}
const costMap = lns.reduce<{[k: string]: Record<string, number>}>((acc, ln) => {
    const {a, b, cost} = parseLn(ln);

    (acc[a] ??= {}), (acc[a][b] = cost);
    (acc[b] ??= {}), (acc[b][a] = cost);

    return acc;
}, {});
const costMapKeys = Object.keys(costMap);

const costs: number[] = [];

for (const cities of permute(costMapKeys)) {
    let cost = 0;
    for (const [idx, city] of cities.entries()) {
        const dest = cities[idx + 1];
        cost += costMap[city][dest] ?? 0;
    }
    costs.push(cost);
}

console.log({
    min: Math.min(...costs),
    max: Math.max(...costs),
});
