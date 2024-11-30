import {strictEqual} from 'node:assert';

import {assert, raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {isDefined} from 'lib/predicate.js';

const lines = await getInputLines({year: 2016, day: 10});

function createBots() {
  const bots = new Map<number, number[]>();
  return {
    getReadyBots() {
      return bots
        .entries()
        .filter(([, chips]) => chips.length === 2)
        .toArray();
    },
    addChip(botId: number, value: number) {
      bots.set(
        botId,
        [...(bots.get(botId) ?? []), value].toSorted((a, b) => a - b)
      );
    },
    deleteById(botId: number) {
      bots.delete(botId);
    },
  };
}

function parseAssigmnet(s: string) {
  const assignmentRe = /^value (\d+) goes to bot (\d+)$/;
  const match = s.match(assignmentRe);
  return isDefined(match)
    ? {
        type: 'assigment' as const,
        value: Number(match[1]),
        botId: Number(match[2]),
      }
    : null;
}
function parseTransfer(s: string) {
  const transferRe =
    /^bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)$/;
  const match = s.match(transferRe);
  if (!isDefined(match)) {
    return null;
  }
  const [, botId, lowType, lowId, highType, highId] = match;
  assert(lowType === 'bot' || lowType === 'output');
  assert(highType === 'bot' || highType === 'output');
  return {
    type: 'transfer' as const,
    botId: Number(botId),
    lowType,
    lowId: Number(lowId),
    highType,
    highId: Number(highId),
  };
}

const bots = createBots();
const transfers = new Map<number, ReturnType<typeof parseTransfer>>();
for (const l of lines) {
  const parsed = parseAssigmnet(l) ?? parseTransfer(l) ?? raise('Invalid line');
  parsed.type === 'assigment'
    ? bots.addChip(parsed.botId, parsed.value)
    : transfers.set(parsed.botId, parsed);
}

const output = new Map<number, number>();
let responsibleBotId: number | undefined;
let botsReadyForTransfer = bots.getReadyBots();
while (botsReadyForTransfer.length > 0) {
  for (const [botId, [low, high]] of botsReadyForTransfer) {
    const {lowType, lowId, highType, highId} = transfers.get(botId)!;
    if (low === 17 && high === 61) {
      responsibleBotId = botId;
    }
    lowType === 'bot' ? bots.addChip(lowId, low) : output.set(lowId, low);
    highType === 'bot' ? bots.addChip(highId, high) : output.set(highId, high);
    bots.deleteById(botId);
  }
  botsReadyForTransfer = bots.getReadyBots();
}

strictEqual(responsibleBotId, 141, 'Part 1 failed');
strictEqual(
  output.get(0)! * output.get(1)! * output.get(2)!,
  1209,
  'Part 2 failed'
);
