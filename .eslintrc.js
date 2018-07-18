module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "elemefe/react",
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module"
    },
    "parser": "babel-eslint",
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
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
        ]
    }
};