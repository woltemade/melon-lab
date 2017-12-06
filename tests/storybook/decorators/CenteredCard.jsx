import React from "react";
import { Card } from "semantic-ui-react";

const CenteredCardDecorator = storyFn => <Card centered>{storyFn()}</Card>;

export default CenteredCardDecorator;
