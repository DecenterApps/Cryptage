module.exports = {
  extends: 'eslint-config-airbnb',
  plugins: [
    'react', 'import'
  ],
  parser: "babel-eslint",
  env: {
    "es6": true,
    "browser": true
  },
  rules: {
    'max-len': [2, 120, 2, {ignoreComments: true}],
    'class-methods-use-this': 0,
    'jsx-a11y/href-no-hash': 'off',
    'react/jsx-tag-spacing': 1,
    'no-unused-vars': 1,
    'react/no-danger': 0,
    'no-underscore-dangle': 0,
    'global-require': 0,
    'no-console': 0,
    'new-cap': 0,
    'eol-last': 0,
    'jsx-a11y/label-has-for': 0,
    'linebreak-style': 0,
    'consistent-return': 0,
    'react/forbid-prop-types': 0,
    'import/prefer-default-export': 0,
    'no-unescaped-entities': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-shadow': 0,
  },
  globals: {
    web3: true,
    window: true,
    document: true,
    fetch: true,
    localStorage: true
  },
};
