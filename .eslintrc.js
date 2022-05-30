
module.exports = {
  extends: ["react-app", 
  // "react-app/jest"
],
  rules: {
    // https://github.com/benmosher/eslint-plugin-import/issues/1446
    'import/named': 'off',
  },
  settings: {'import/resolver': 'node'},
  overrides: [
    {
      files: ['**/src/**'],
      settings: {'import/resolver': 'webpack'},
    },
    {
      files: ['**/mobile-*/**'],
      settings: {'import/resolver': 'webpack'},
    }
  ],
}
