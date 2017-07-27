import fs from "fs";
// eslint-disable-next-line import/no-extraneous-dependencies
import walk from "walk";

const walker = walk.walk("./lib");

const functions = [];

const fd = fs.openSync("./lib/main.js", "w");

walker.on("file", (root, stat, next) => {
  if (root !== "./lib" && stat.name.includes(".js")) {
    const name = stat.name.replace(".js", "");
    const path = `${root.replace("./lib", ".")}/${name}`;
    functions.push({ path, name, root });
  }
  next();
});

walker.on("end", () => {
  functions.sort((a, b) => (a.path > b.path ? 1 : -1));
  functions.forEach(f =>
    fs.appendFileSync(fd, `export ${f.name} from '${f.path}';\n`),
  );
});
