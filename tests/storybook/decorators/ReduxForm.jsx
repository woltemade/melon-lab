import React from "react";
import { createStore, combineReducers } from "redux";
import { reduxForm, reducer } from "redux-form";
import { connect, Provider } from "react-redux";
import { action } from "@storybook/addon-actions";

const ReduxForm = story => {
  console.log(story);
  const rootReducer = combineReducers({ form: reducer });
  const store = createStore(rootReducer);
  const connected = connect(story);
  const form = reduxForm({
    form: "storybook",
    onSubmit: () => {
      action("submit");
    },
  })(connected);

  return <Provider store={store}>{form}</Provider>;
};

export default ReduxForm;
