module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    it: 'readonly',
    describe: 'readonly',
    before: 'readonly',
    beforeEach: 'readonly',
    after: 'readonly',
    afterEach: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'eqeqeq': 0,
    'new-cap': 0,
    'no-useless-escape': 0,
    'no-underscore-dangle': 0,
    'func-names': 0,
    'class-methods-use-this': 0,
    'no-shadow': 0,
    'no-plusplus': 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'no-throw-literal': 0,
    'camelcase': 0,
    'max-len': 0,
    'consistent-return': 0,
    'prefer-rest-params': 0,
    'no-nested-ternary': 0,
    'no-multi-assign': 0,
    'implicit-arrow-linebreak': 0,
    'no-continue': 0,
    'no-restricted-syntax': 0,
    'import/no-unresolved': 0,
    'no-useless-constructor': 0,
    'prefer-destructuring': 0,
    'global-require': 0,
    'no-useless-constructor': 0,
    'no-restricted-globals': 0,
    'radix': 0,
    'no-control-regex': 0,
    'no-lonely-if': 0,
    'no-const-assign': 0,
    'guard-for-in': 0,
    'operator-assignment': 0,
    'prefer-const': 0,
    'no-empty-function': 0,
    'brace-style': 0,
    'default-case': 0,
    'import/order': 0,
    'no-unused-vars': 0,
    'no-empty': 0,
    'no-tabs': 0,
    'no-loop-func': 0,
    'no-unused-expressions': 0,
    'no-new': 0,
    'no-use-before-define': 0,
    'no-path-concat': 0,
    'import/no-dynamic-require': 0,
    'quotes': [2, "double"],
    'indent': [2, 4],
    'import/no-extraneous-dependencies': 0,
    'comma-dangle': 0,
    'quote-props': [2, "consistent-as-needed"],
    'newline-per-chained-call': 0,
    'no-else-return': 0,
    'no-return-await': 0
  },
};
