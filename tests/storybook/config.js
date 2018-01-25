import { configure, addDecorator } from "@storybook/react";
import { setDefaults } from "@storybook/addon-info";
import ContainerDecorator from "./decorators/Container";
import "../../public/static/css/semantic.min.css";
import "../../public/static/css/overwrites.css";

setDefaults({
  header: false,
});

addDecorator(ContainerDecorator);
// addDecorator(withKnobs);

const req = require.context("../../src/", true, /\.story\.jsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
