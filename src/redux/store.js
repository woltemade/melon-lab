import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import setup from "./ducks/setup";
import setupMiddleware from "./middlewares/setup";
// const store = createStore(
//   combineReducers({
//     setup,
//   }),
// );

// export default store;

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
