import {assert} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2016, day: 10});

function getBotsWithTwoMicrochips(bots: Map<number, number[]>) {
  return bots
    .entries()
    .filter(([_, values]) => values.length === 2)
    .toArray();
}

function addMicrochipToBot(
  bots: Map<number, number[]>,
  {botId, value}: {botId: number; value: number}
) {
  bots.set(
    botId,
    [...(bots.get(botId) ?? []), value].toSorted((a, b) => a - b)
  );
}

const bots = new Map<number, number[]>();
const instructions = new Map<
  number,
  {
    botId: number;
    lowType: 'bot' | 'output';
    lowId: number;
    highType: 'bot' | 'output';
    highId: number;
  }
>();

const assignRe = /^value (\d+) goes to bot (\d+)$/;
const transferRe =
  /^bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)$/;

for (const l of lines) {
  if (assignRe.test(l)) {
    const [, value, botId] = l.match(assignRe)!;
    addMicrochipToBot(bots, {
      botId: Number(botId),
      value: Number(value),
    });
  } else if (transferRe.test(l)) {
    const [, botId, lowType, lowId, highType, highId] = l.match(transferRe)!;
    assert(lowType === 'bot' || lowType === 'output');
    assert(highType === 'bot' || highType === 'output');
    instructions.set(Number(botId), {
      botId: Number(botId),
      lowType,
      lowId: Number(lowId),
      highType,
      highId: Number(highId),
    });
  }
}

const outputs = new Map<number, number>();
let responsibleBotId: number | undefined;
let botsReadyForTransfer = getBotsWithTwoMicrochips(bots);
while (botsReadyForTransfer.length > 0) {
  for (const [botId, [low, high]] of botsReadyForTransfer) {
    const {lowType, lowId, highType, highId} = instructions.get(botId)!;
    low === 17 && high === 61 && (responsibleBotId = botId);
    lowType === 'bot'
      ? addMicrochipToBot(bots, {botId: lowId, value: low})
      : outputs.set(lowId, low);
    highType === 'bot'
      ? addMicrochipToBot(bots, {botId: highId, value: high})
      : outputs.set(highId, high);
    bots.delete(botId);
  }
  botsReadyForTransfer = getBotsWithTwoMicrochips(bots);
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(responsibleBotId).toBe(141));
  test('part 2', () =>
    expect(outputs.get(0)! * outputs.get(1)! * outputs.get(2)!).toBe(1209));
}
