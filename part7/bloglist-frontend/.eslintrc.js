/* eslint-env node */
module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true,
        "cypress/globals": true
    },
    "extends": [ 
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react", "jest", "cypress"
    ],
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "eqeqeq": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-console": 0,
        "react/prop-types": 0,
        "no-unused-vars": 0,
        "no-undef":0
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  }