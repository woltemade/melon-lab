import { configure } from "@storybook/react";
import "../../public/semantic/dist/semantic.min.css";

const req = require.context("../../src/", true, /\.story\.jsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
