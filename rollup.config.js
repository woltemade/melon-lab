// rollup.config.js
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import flow from "rollup-plugin-flow";
import json from "rollup-plugin-json";

export default {
  entry: "lib/main.js",
  format: "cjs",
  plugins: [
    flow(),
    resolve({
      extensions: [".js", ".json"],
    }),
    commonjs(),
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
      babelrc: false,
      exclude: "node_modules/**",
    }),
  ],
  dest: "build/bundle.js",
};
