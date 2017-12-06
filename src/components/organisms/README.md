[Organisms](http://atomicdesign.bradfrost.com/chapter-2/#organisms) are
components consisting of several subcomponents. In other words: These are the
the widgets. Right now, molecules and atoms are the components out of
Semantic-ui.

# Guidelines

* Explicitely deconstruct props in the function signature
* Write state-less functional components

# Organism Boilerplate

```javascript
import React from "react";
import { Card } from "semantic-ui-react";

const Organism = ({
  prop, // explicitely deconstruct props to document expected props
  onAction
}) => <Card>Some content</Card>;

export default Organism;
```

# Story Boilerplate

Write stories that describe all functionality in a simple way: At least one
default story that has all props mapped to knobs and actions to actions:

```javascript
import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Organism from "./Organism";

storiesOf("Organism", module)
  .addDecorator(withKnobs)
  .add(
    "Default",
    withInfo("Short info about organism")(() => (
      <Organism prop={boolean("prop", false)} onAction={action("onAction")} />
    ))
  );
```
