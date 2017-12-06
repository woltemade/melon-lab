import React from "react";
import { Container } from "semantic-ui-react";

const ContainerDecorator = storyFn => (
  <Container style={{ paddingTop: 20 }}>{storyFn()}</Container>
);

export default ContainerDecorator;
