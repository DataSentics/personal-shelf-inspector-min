module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["import", "react", "@typescript-eslint", "prettier"],
  extends: [
    "@react-native-community/eslint-config",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "prettier",
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        moduleDirectory: ["node_modules", "src"],
        alias: {
          _assets: "./src/assets",
          _components: "./src/components",
          _atoms: "./src/components/atoms",
          _molecules: "./src/components/molecules",
          _organisms: "./src/components/organisms",
          _navigations: "./src/navigations",
          _scenes: "./src/scenes",
          _styles: "./src/styles",
          _utils: "./src/utils",
        },
      },
    },
  },
  rules: {
    "prettier/prettier": 0,
    "max-len": ["warn", { code: 90 }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    /*
        override no-shadow to avoid a bug:
        '<EnumName>' is already declared in the upper scope on line x column y.
        where x is actually the line number of the only definition of the enum

        https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope

        so we need both:
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
      */
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["warn"],
    // 'no-undef': 0,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "no-undef": 0,
      },
    },
  ],
};
