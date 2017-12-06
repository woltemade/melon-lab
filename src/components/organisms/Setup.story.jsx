import React from "react";
import { reduxForm, reducer } from "redux-form";
import { combineReducers, createStore } from "redux";
import { connect, Provider } from "react-redux";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { ReduxForm } from "../../../tests/storybook/decorators/ReduxForm";

import Setup from "./Setup";

const rootReducer = combineReducers({ form: reducer });
const store = createStore(rootReducer);

const connected = connect()(Setup);
const Form = reduxForm({
  form: "storybook",
})(connected);

storiesOf("Setup", module)
  .addDecorator(withKnobs)
  // .addDecorator(story => <Provider {...{ store }}>{story}</Provider>)
  // .addDecorator(ReduxForm)
  .add(
    "Default",
    withInfo("Short info about organism")(() => (
      <Provider store={store}>
        <Form loading={boolean("loading", false)} onSubmit={action("Submit")} />
      </Provider>
    )),
  );
