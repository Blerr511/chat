module.exports = {
    env: {
        commonjs: true,
        es2020: true,
        node: true,
    },
    extends: ["google", "prettier"],
    parserOptions: {
        ecmaVersion: 11,
    },
    rules: {
        "valid-jsdoc": 0,
        camelcase: 0,
        "no-shadow": 0,
        "new-cap": 0,
    },
};
