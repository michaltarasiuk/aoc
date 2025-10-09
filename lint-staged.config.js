/** @type {import("lint-staged").Configuration} */
const lintStagedConfig = {
  '*': ['prettier --ignore-unknown', 'eslint'],
};
export default lintStagedConfig;
