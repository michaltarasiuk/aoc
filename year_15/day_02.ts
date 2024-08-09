import {getInputLines} from 'lib/input';

const lines = await getInputLines({year: 2015, day: 2});

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

for (const line of lines) {
  const [l = 0, w = 0, h = 0] = line.split('x').map(Number);

  paper += calcPaper({l, w, h});
  ribbon += calcRibbon({l, w, h});
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(paper).toBe(1598415);
  });

  test('part 2', () => {
    expect(ribbon).toBe(3812909);
  });
}
