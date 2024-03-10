module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "prettier",
        "plugin:prettier/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs", "server", "server-nest"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
        "import/default": "off",
        semi: "error",
        "no-nested-ternary": "error",
        "linebreak-style": ["error", "unix"],
        quotes: [
            2,
            "single",
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
        ],
        "prettier/prettier": ["error"],
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "import/no-extraneous-dependencies": "off",
    },
}
