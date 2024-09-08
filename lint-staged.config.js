/** @type {import("lint-staged").Config} */
const lintStagedConfig = {
  '*': ['bun run prettier', 'bun run eslint', 'bun run vitest related --run'],
};

export default lintStagedConfig;
