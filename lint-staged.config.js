/** @type {import("lint-staged").Config} */
const lintStagedConfig = {
  '*': [
    'npm run prettier',
    'npm run eslint',
    function assert(filenames) {
      return filenames
        .filter(filename => {
          const dayRe = /year_\d+\/day_\d+\.ts/;
          return dayRe.test(filename);
        })
        .map(filename => `tsx ${filename}`);
    },
  ],
};
export default lintStagedConfig;
