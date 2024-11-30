import path from 'node:path';

/** @type {import("lint-staged").Config} */
const lintStagedConfig = {
  '*': [
    'npm run prettier',
    'npm run eslint',
    function assert(filenames) {
      return filenames
        .filter(filename => path.extname(filename) === '.ts')
        .map(filename => `tsx ${filename}`);
    },
  ],
};
export default lintStagedConfig;
