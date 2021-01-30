module.exports = {
    extends: ["@lusito/eslint-config-react", "plugin:jest/recommended"],
    rules: {
        "react-hooks/exhaustive-deps": "error",
    },
    env: {
        browser: true,
        "jest/globals": true,
    },
    overrides: [
        {
            files: ["./packages/*/tests/*.ts"],
            rules: {
                "react-hooks/rules-of-hooks": "off",
                "import/no-extraneous-dependencies": "off",
                "@typescript-eslint/ban-ts-comment": "off",
            },
        },
    ],
};
