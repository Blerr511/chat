module.exports = {
    env: {
        commonjs: true,
        es2020: true,
        node: true,
    },
    extends: ['google', 'prettier'],
    parserOptions: {
        ecmaVersion: 8,
    },
    parser: 'babel-eslint',
    rules: {
        'valid-jsdoc': 0,
        camelcase: 0,
        'no-shadow': 0,
        'new-cap': 0,
        'require-jsdoc': 0,
    },
    settings: {
        ecmaFeatures: {
            classes: true,
        },
    },
};
