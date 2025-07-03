import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.mocha,
            },
        },
        rules: {
            "no-unused-vars": "error", // Catch unused variables
            "no-undef": "error", // Disallow undeclared variables gives errors with cypress I will leave it anyway
            "no-console": "warn", // Warn about console.log statements
            "prefer-const": "error", // Use const when variable is never reassigned
            "no-var": "error", // Warn about using var
            "semi": ["error", "always"], // Require semicolons
            "no-trailing-spaces": "error", // No long whitespace
        },
    },
];
