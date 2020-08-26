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
        "valid-jsdoc": 1,
    },
};
