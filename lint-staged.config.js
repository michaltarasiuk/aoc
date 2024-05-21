/** @type {import('lint-staged'.Config)} */
const lintStagedConfig = {
    '*': ['npm run prettier', 'npm run eslint'],
};

export default lintStagedConfig;
