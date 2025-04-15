import fs from 'node:fs/promises';
import {isBuiltin} from 'node:module';
import path from 'node:path';

import {parse} from 'es-module-lexer';
import tsConfigPaths, {createMatchPath} from 'tsconfig-paths';

const tsConfig = tsConfigPaths.loadConfig();
if (tsConfig.resultType === 'failed') {
  throw new Error(tsConfig.message);
}

const matchPath = createMatchPath(tsConfig.absoluteBaseUrl, tsConfig.paths);

/** @type {import("lint-staged").Config} */
const lintStagedConfig = {
  '*': [
    'prettier --ignore-unknown',
    'eslint',
    async function assert(stagedFiles) {
      const stagedFilesSet = new Set(stagedFiles);
      for await (const relativeFilePath of await fs.glob('year_*/day_*.ts')) {
        const file = await fs.readFile(
          new URL(relativeFilePath, import.meta.url),
          {encoding: 'utf-8'}
        );
        const [imports] = parse(file);
        for (const {n} of imports) {
          if (!n || isBuiltin(n)) {
            continue;
          }
          const resolvedImportPath = matchPath(n.replace(/\.js$/, '.ts'));
          if (!resolvedImportPath) {
            continue;
          }
          const absoluteFilePath = path.resolve(relativeFilePath);
          if (stagedFilesSet.has(resolvedImportPath)) {
            stagedFilesSet.add(absoluteFilePath);
          }
        }
      }
      return [...stagedFilesSet]
        .filter(file => {
          const dayRe = /year_\d{2}\/day_\d{2}\.ts$/;
          return dayRe.test(file);
        })
        .map(file => `tsx ${file}`);
    },
  ],
};
export default lintStagedConfig;
