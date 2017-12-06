import { configure, addDecorator } from "@storybook/react";
import ContainerDecorator from "./ContainerDecorator";
import "../../public/semantic/dist/semantic.min.css";
import "../../src/index.css";

const req = require.context("../../src/", true, /\.story\.jsx$/);

addDecorator(ContainerDecorator);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
