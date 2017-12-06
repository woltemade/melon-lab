import { configure, addDecorator } from "@storybook/react";
import { setDefaults } from "@storybook/addon-info";
import ContainerDecorator from "./ContainerDecorator";
import "../../public/semantic/dist/semantic.min.css";
import "../../src/index.css";

setDefaults({
  header: false,
});

addDecorator(ContainerDecorator);

const req = require.context("../../src/", true, /\.story\.jsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
