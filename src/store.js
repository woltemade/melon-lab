import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import general from "./legacyComponents/general";
import setup from "./legacyComponents/setup/duck";
import invest from "./legacyComponents/invest/duck";
import factsheet from "./legacyComponents/factsheet/duck";
import fundHoldings from "./legacyComponents/fundHoldings/duck";
import orderbook from "./legacyComponents/orderbook/duck";
import recentTrades from "./legacyComponents/recentTrades/duck";
import trade from "./legacyComponents/trade/duck";
import tradeHelper from "./legacyComponents/tradeHelper/duck";
import participation from "./legacyComponents/participation/duck";
import executeRequest from "./legacyComponents/executeRequest/duck";
import tradingActivity from "./legacyComponents/tradingActivity/duck";
import settings from "./legacyComponents/settings/duck";
import web3 from "./legacyComponents/web3/duck";

import generalMiddleware from "./legacyComponents/generalMiddleware";
import setupMiddleware from "./legacyComponents/setup/middleware";
import investMiddleware from "./legacyComponents/invest/middleware";
import factsheetMiddleware from "./legacyComponents/factsheet/middleware";
import fundHoldingsMiddleware from "./legacyComponents/fundHoldings/middleware";
import orderbookMiddleware from "./legacyComponents/orderbook/middleware";
import recentTradesMiddleware from "./legacyComponents/recentTrades/middleware";
import tradeMiddleware from "./legacyComponents/trade/middleware";
import tradeHelperMiddleware from "./legacyComponents/tradeHelper/middleware";
import participationMiddleware from "./legacyComponents/participation/middleware";
import executeRequestMiddleware from "./legacyComponents/executeRequest/middleware";
import tradingActivityMiddleware from "./legacyComponents/tradingActivity/middleware";
import settingsMiddleware from "./legacyComponents/settings/middleware";
import web3Middleware from "./legacyComponents/web3/middleware";

export default createStore(
  combineReducers({
    general,
    setup,
    invest,
    factsheet,
    fundHoldings,
    orderbook,
    recentTrades,
    trade,
    tradeHelper,
    participation,
    executeRequest,
    tradingActivity,
    settings,
    web3,
  }),
  {
    /* preloadedState */
  },
  compose(
    applyMiddleware(
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
      web3Middleware,
    ),
    /* eslint-disable no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
    /* eslint-enable */
  ),
);
