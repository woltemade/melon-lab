import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import flow from "rollup-plugin-flow";
import json from "rollup-plugin-json";

import pkg from "./package.json";

export default {
  entry: "lib/main.js",
  format: "cjs",
  moduleName: "melon.js",
  plugins: [
    flow(),
    globals({ crypto: true }),
    builtins({}),
    resolve({
      extensions: [".js", ".json"],
    }),
    commonjs({
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        "truffle-contract/contract.js": ["default"],
      },
    }),
    json(),
    babel({
      presets: [
        [
          "es2015",
          {
            modules: false,
          },
        ],
        "stage-0",
        "react",
      ],
      plugins: ["external-helpers"],
      babelrc: false,
      exclude: "node_modules/**",
    }),
  ],
  targets: [
    { dest: pkg.main, format: "umd" },
    { dest: pkg.module, format: "es" },
  ],
};
