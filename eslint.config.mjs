import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      // "no-undef": "off",
      // "no-unused-vars": "off"
      "indent": ["error", 4],
      "linebreak-style": "off"
    }
  }
];
