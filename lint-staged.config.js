/** @type {import("lint-staged").Config} */
const lintStagedConfig = {
  '*': ['npm run prettier', 'npm run eslint', 'vitest related --run'],
};
export default lintStagedConfig;
