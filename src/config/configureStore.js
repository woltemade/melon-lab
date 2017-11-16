import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import generalMiddleware from "../legacyComponents/generalMiddleware";
import setupMiddleware from "../legacyComponents/setup/middleware";
import investMiddleware from "../legacyComponents/invest/middleware";
import factsheetMiddleware from "../legacyComponents/factsheet/middleware";
import fundHoldingsMiddleware from "../legacyComponents/fundHoldings/middleware";
import orderbookMiddleware from "../legacyComponents/orderbook/middleware";
import recentTradesMiddleware from "../legacyComponents/recentTrades/middleware";
import tradeMiddleware from "../legacyComponents/trade/middleware";
import tradeHelperMiddleware from "../legacyComponents/tradeHelper/middleware";
import participationMiddleware from "../legacyComponents/participation/middleware";
import executeRequestMiddleware from "../legacyComponents/executeRequest/middleware";
import tradingActivityMiddleware from "../legacyComponents/tradingActivity/middleware";
import settingsMiddleware from "../legacyComponents/settings/middleware";

import rootReducer from "../reducers";
import rootSaga from "../sagas";

const configureStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = applyMiddleware(
    /*
    setupMiddleware,
    investMiddleware,
    factsheetMiddleware,
    fundHoldingsMiddleware,
    orderbookMiddleware,
    recentTradesMiddleware,
    tradeMiddleware,
    tradeHelperMiddleware,
    generalMiddleware,
    participationMiddleware,
    executeRequestMiddleware,
    tradingActivityMiddleware,
    settingsMiddleware,
    */
    sagaMiddleware,
  );

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
