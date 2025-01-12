import assert from 'node:assert';

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
        [...(bots.get(botId) ?? []), value].sort((a, b) => a - b)
      );
    },
    deleteById(botId: number) {
      bots.delete(botId);
    },
  };
}

function parseAssigmnet(s: string) {
  const assignmentRe = /^value (\d+) goes to bot (\d+)$/;
  const assignmentExec = assignmentRe.exec(s);
  if (!isDefined(assignmentExec)) {
    return null;
  }
  return {
    type: 'assigment' as const,
    value: Number(assignmentExec[1]),
    botId: Number(assignmentExec[2]),
  };
}
function parseTransfer(s: string) {
  const transferRe =
    /^bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)$/;
  const transferExec = transferRe.exec(s);
  if (!isDefined(transferExec)) {
    return null;
  }
  const [, botId, lowType, lowId, highType, highId] = transferExec;
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
for (const parsed of lines.map(l => (parseAssigmnet(l) ?? parseTransfer(l))!)) {
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

assert.strictEqual(responsibleBotId, 141, 'Part 1 failed');
assert.strictEqual(
  output.get(0)! * output.get(1)! * output.get(2)!,
  1209,
  'Part 2 failed'
);
