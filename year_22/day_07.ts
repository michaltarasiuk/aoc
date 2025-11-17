import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';
import {isDefined} from 'lib/is_defined.js';

const input = await fetchInput({year: 2022, day: 7});

type Filesystem = Record<string, number>;
type Cmd = [cmd: string[], ...output: string[]];

function parseCmd(cmd: string) {
  const m = cmd.match(/^\$ (\w+)(?:\s(.+))?$/);
  return isDefined(m) ? [m[1], m[2]] : null;
}
function parseFile(file: string) {
  const m = file.match(/^(\d+)\s.+/);
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
function updateFilesystem(
  filesystem: Filesystem,
  cwd: string[],
  dir: string[]
) {
  const dirSize = dir.reduce((acc, file) => acc + (parseFile(file) ?? 0), 0);
  for (const i of cwd.keys()) {
    const dirName = cwd.slice(0, i + 1).join('/');
    filesystem[dirName] = (filesystem[dirName] ?? 0) + dirSize;
  }
  return filesystem;
}

const cmds: Cmd[] = [];
for (const l of input.split(/\n/)) {
  const cmd = parseCmd(l);
  if (isDefined(cmd)) {
    cmds.push([cmd]);
  } else {
    cmds.at(-1)?.push(l);
  }
}

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
      throw new Error(`Invalid command: ${cmd}`);
  }
}

const totalSize = Object.values(filesystem)
  .filter(size => size <= 100_000)
  .reduce((a, b) => a + b, 0);

assert.strictEqual(totalSize, 1306611, 'Part 1 failed');
