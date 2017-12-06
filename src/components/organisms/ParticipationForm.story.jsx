import React from "react";
import { reduxForm, reducer } from "redux-form";
import { combineReducers, createStore } from "redux";
import { connect, Provider } from "react-redux";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { ReduxProvider } from "../../../tests/storybook/decorators/ReduxProvider";

import ParticipationForm from "./ParticipationForm";

const rootReducer = combineReducers({ form: reducer });
const store = createStore(rootReducer);

const connected = connect()(ParticipationForm);
const Form = reduxForm({
  form: "storybook",
  onSubmit: () => {
    action("submit");
  },
})(connected);

storiesOf("ParticipationForm", module)
  .addDecorator(withKnobs)
  // .addDecorator(story => <Provider {...{ store }}>{story}</Provider>)
  // .addDecorator(ReduxProvider)
  .add(
    "Default",
    withInfo("Short info about organism")(() => (
      <Provider store={store}>
        <Form
          loading={boolean("loading", false)}
          onChange={action("onChange")}
          onSelect={action("onSelect")}
          onSubmit={action("onSubmit")}
          participationType={select(
            "participationType",
            { Invest: "Invest", Redeem: "Redeem" },
            "Invest",
          )}
          /*
          amount={text("amount", "1.2345")}
          price={text("price", "1.2345")}
          total={text("total", "1.0000")}
          */
        />
      </Provider>
    )),
  );
