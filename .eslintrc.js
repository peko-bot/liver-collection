module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module"
    },
    "parser": "babel-eslint",
    "plugins": ["react"],
    "rules": {
        "indent": ["error", "tab", {
            "SwitchCase": 1,
            "VariableDeclarator": 1,
            "outerIIFEBody": 1,
            "MemberExpression": 1,
            "FunctionDeclaration": { "parameters": 1, "body": 1 },
            "FunctionExpression": { "parameters": 1, "body": 1 },
            "CallExpression": { "arguments": 1 },
            "ArrayExpression": 1,
            "ObjectExpression": 1,
            "ImportDeclaration": 1,
            "flatTernaryExpressions": false,
            "ignoreComments": false
        }],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": 0,
        "no-undef": 0,
        "no-mixed-spaces-and-tabs": 0,
        "camelcase": 2,
        "no-console": 0,
    }
};