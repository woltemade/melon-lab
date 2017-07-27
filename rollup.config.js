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
      exclude: "node_modules/**", // only transpile our source code
    }),
  ],
  dest: "build/bundle.js",
};
