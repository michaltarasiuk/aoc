import {assert} from 'lib/assert';
import {getInputLines} from 'lib/input';
import {isDefined} from 'lib/is_defined';
import {sum} from 'lib/math';

const lines = await getInputLines({year: 2022, day: 7});

type Filesystem = Record<string, number>;
type Cmd = [cmd: string[], ...output: string[]];

function parseCmd(cmd: string) {
  const cmdRe = /^\$ (\w+)(?:\s(.+))?$/;
  return cmdRe.exec(cmd)?.slice(1);
}

function parseFile(file: string) {
  const fileRe = /^(\d+)\s.+$/;
  const size = fileRe.exec(file)?.[1];

  return isDefined(size) ? Number(size) : null;
}

function cd(arg: string, cwd: string[]) {
  switch (arg) {
    case '/':
      return [];
    case '..':
      assert(cwd.length > 0);
      return cwd.slice(0, -1);
    default:
      return cwd.concat(arg);
  }
}

function updateFilesystem(
  {...filesystem}: Filesystem,
  dir: string[],
  cwd: string[]
) {
  const dirSize = sum(...dir.map(file => parseFile(file) ?? 0));

  for (const i of cwd.keys()) {
    const dirName = cwd.slice(0, i + 1).join('/');
    filesystem[dirName] ??= 0;
    filesystem[dirName] += dirSize;
  }
  return filesystem;
}

function determineFilesystem(...cmds: Cmd[]) {
  let filesystem: Filesystem = {};
  let cwd: string[] = [];

  for (const [[cmd, arg], ...output] of cmds) {
    switch (cmd) {
      case 'cd':
        cwd = cd(arg, cwd);
        break;
      case 'ls':
        filesystem = updateFilesystem(filesystem, output, cwd);
        break;
      default:
        throw new Error(`Unknown command: ${cmd}`);
    }
  }
  return filesystem;
}

const cmds: Cmd[] = [];
for (const line of lines) {
  const cmd = parseCmd(line);
  isDefined(cmd) ? cmds.push([cmd]) : cmds.at(-1)?.push(line);
}

const filesystem = determineFilesystem(...cmds);
const totalSize = sum(
  ...Object.values(filesystem).filter(size => size <= 100_000)
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(totalSize).toBe(1306611);
  });
}
