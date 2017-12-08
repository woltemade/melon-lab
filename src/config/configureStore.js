import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import createHistory from "history/createHashHistory";

import { routerMiddleware as createRouterMiddleware } from "react-router-redux";

import rootReducer from "../reducers";
import rootSaga from "../sagas";

export const history = createHistory();

export const configureStore = preloadedState => {
  const routerMiddleware = createRouterMiddleware(history);

  const sagaMiddleware = createSagaMiddleware();

  const middlewares = applyMiddleware(routerMiddleware, sagaMiddleware);

  /* eslint-disable no-underscore-dangle */
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f;
  /* eslint-enable */

  const enhancer = compose(middlewares, devTools);

  const store = createStore(rootReducer, preloadedState, enhancer);

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
