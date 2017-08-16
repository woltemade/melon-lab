import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import setup from "./ducks/setup";
import invest from "./ducks/invest";

import setupMiddleware from "./middlewares/setup";
import investMiddleware from "./middlewares/invest";

export default createStore(
  combineReducers({
    setup,
    invest,
  }),
  {
    /* preloadedState */
  },
  compose(
    applyMiddleware(setupMiddleware, investMiddleware),
    /* eslint-disable no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
    /* eslint-enable */
  ),
);
