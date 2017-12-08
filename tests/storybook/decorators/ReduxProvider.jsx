import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer } from "redux-form";
import { Provider } from "react-redux";

const logger = store => next => action => {
  const { type, ...data } = action;
  const result = next(action);
  console.log(type, { data, postState: store.getState() });
  return result;
};

const ReduxForm = story => {
  const rootReducer = combineReducers({ form: reducer });
  const store = createStore(rootReducer, applyMiddleware(logger));

  return <Provider store={store}>{story()}</Provider>;
};

export default ReduxForm;
