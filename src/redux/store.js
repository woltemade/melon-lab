import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import setup from "./ducks/setup";
import setupMiddleware from "./middlewares/setup";

export default createStore(
  combineReducers({
    setup,
  }),
  {
    /* preloadedState */
  },
  compose(
    applyMiddleware(setupMiddleware),
    /* eslint-disable no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
    /* eslint-enable */
  ),
);
