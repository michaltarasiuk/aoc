import {getInputLines} from 'lib/input';

const lns = await getInputLines({year: 2015, day: 2});

function calcPaper({l, w, h}: {l: number; w: number; h: number}) {
    const [lw, wh, hl] = [l * w, w * h, h * l];

    return 2 * (lw + wh + hl) + Math.min(lw, wh, hl);
}

function calcRibbon({l, w, h}: {l: number; w: number; h: number}) {
    const dist = Math.min(l + w, w + h, h + l);
    const vol = l * w * h;

    return 2 * dist + vol;
}

let paper = 0;
let ribbon = 0;

for (const ln of lns) {
    const [l = 0, w = 0, h = 0] = ln.split('x').map(Number);

    paper += calcPaper({l, w, h});
    ribbon += calcRibbon({l, w, h});
}

console.log({
    paper,
    ribbon,
});
