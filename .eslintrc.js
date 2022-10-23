module.exports = {
    env: {
        node: true,
        es2021: true
    },
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        ecmaVersion: 13,
        requireConfigFile: false
    },
    plugins: [
        '@typescript-eslint',
        'prefer-arrow'
    ],
    ignorePatterns: [
        'node_modules'
    ],
    rules: {
        'curly': ['error', 'multi-line'],
        'no-implicit-coercion': ['error'],
        'indent': ['error', 4, {
            SwitchCase: 1,
            MemberExpression: 1,
            ArrayExpression: 1,
            ObjectExpression: 1,
            VariableDeclarator: 1,
            CallExpression: {arguments: 1},
            offsetTernaryExpressions: true
        }],
        'semi': ['error', 'always'],
        'linebreak-style': ['error', 'unix'],
        'no-fallthrough': 'off',
        'no-console': 'off',
        'no-debugger': 'error',
        'max-len': ['warn', {
            code: 100,
            ignoreStrings: true,
            ignoreRegExpLiterals: true,
            ignoreTemplateLiterals: true,
            tabWidth: 4,
            ignoreComments: true
        }],
        'comma-dangle': ['error', 'never'],
        'space-in-parens': ['error', 'never'],
        'comma-spacing': 'error',
        'object-curly-spacing': ['error', 'never'],
        'object-curly-newline': ['error', {multiline: true}],
        'array-bracket-spacing': ['error', 'never'],
        'eqeqeq': ['error', 'always', {null: 'ignore'}],
        'no-useless-call': 'error',
        'prefer-promise-reject-errors': 'error',
        'no-underscore-dangle': 'error',
        'prefer-const': ['error', {destructuring: 'all', ignoreReadBeforeAssign: false}],
        'no-bitwise': 'off',
        'no-caller': 'error',
        'no-useless-return': 'error',
        'no-duplicate-imports': 'error',
        'no-unused-expressions': 'error',
        'arrow-body-style': ['error', 'as-needed'],
        'prefer-arrow/prefer-arrow-functions': ['error', {
            disallowPrototype: true,
            singleReturnOnly: false,
            classPropertiesAllowed: false
        }],
        'brace-style': ['error', '1tbs', {allowSingleLine: true}],
        'space-infix-ops': ['error'],
        'quote-props': ['error', 'consistent-as-needed'],
        'no-multiple-empty-lines': ['warn', {max: 1, maxEOF: 0}],
        'quotes': ['error', 'single', {allowTemplateLiterals: true}],
        'no-eval': 'error',
        'no-implied-eval': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-empty-function': 'error',
        'no-shadow': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/keyword-spacing': ['error']
    }
};
