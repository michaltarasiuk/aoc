import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';
import {isDefined} from 'lib/predicate.js';

const lines = await getInputLines({year: 2022, day: 7});

type Filesystem = Record<string, number>;
type Cmd = [cmd: string[], ...output: string[]];

function parseCmd(cmd: string) {
  const cmdRe = /^\$ (\w+)(?:\s(.+))?$/;
  return cmd.match(cmdRe)?.slice(1);
}
function parseFile(file: string) {
  const fileRe = /^(\d+)\s.+/;
  const m = file.match(fileRe);
  return isDefined(m) ? Number(m[1]) : null;
}

function cd(arg: string, cwd: string[]): string[] {
  switch (arg) {
    case '/':
      return [];
    case '..':
      assert(cwd.length > 0);
      return cwd.slice(0, -1);
    default:
      return [...cwd, arg];
  }
}
function determineFilesystem(cmds: Cmd[]) {
  let filesystem: Filesystem = {};
  let cwd: string[] = [];
  for (const [[cmd, arg], ...output] of cmds) {
    switch (cmd) {
      case 'cd':
        cwd = cd(arg, cwd);
        break;
      case 'ls':
        filesystem = updateFilesystem(filesystem, cwd, output);
        break;
      default:
        throw new Error(`Unknown command: ${cmd}`);
    }
  }
  return filesystem;
}

function updateFilesystem(
  filesystem: Filesystem,
  cwd: string[],
  dir: string[]
) {
  const dirSize = dir
    .map(file => parseFile(file) ?? 0)
    .reduce((a, b) => a + b, 0);
  for (const i of cwd.keys()) {
    const dirName = cwd.slice(0, i + 1).join('/');
    filesystem[dirName] = (filesystem[dirName] ?? 0) + dirSize;
  }
  return filesystem;
}

const cmds = lines.reduce<Cmd[]>((acc, l) => {
  const cmd = parseCmd(l);
  isDefined(cmd) ? acc.push([cmd]) : acc.at(-1)?.push(l);
  return acc;
}, []);

const filesystem = determineFilesystem(cmds);
const totalSize = Object.values(filesystem)
  .filter(size => size <= 100_000)
  .reduce((a, b) => a + b, 0);

assert.strictEqual(totalSize, 1306611, 'Part 1 failed');
