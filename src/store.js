import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import general from "./components/general";
import setup from "./components/setup/duck";
import invest from "./components/invest/duck";
import factsheet from "./components/factsheet/duck";
import fundHoldings from "./components/fundHoldings/duck";
import orderbook from "./components/orderbook/duck";
import recentTrades from "./components/recentTrades/duck";
import trade from "./components/trade/duck";
import tradeHelper from "./components/tradeHelper/duck";
import participation from "./components/participation/duck";
import executeRequest from "./components/executeRequest/duck";
import tradingActivity from "./components/tradingActivity/duck";
import web3 from "./components/web3";

import generalMiddleware from "./components/generalMiddleware";
import setupMiddleware from "./components/setup/middleware";
import investMiddleware from "./components/invest/middleware";
import factsheetMiddleware from "./components/factsheet/middleware";
import fundHoldingsMiddleware from "./components/fundHoldings/middleware";
import orderbookMiddleware from "./components/orderbook/middleware";
import recentTradesMiddleware from "./components/recentTrades/middleware";
import tradeMiddleware from "./components/trade/middleware";
import tradeHelperMiddleware from "./components/tradeHelper/middleware";
import participationMiddleware from "./components/participation/middleware";
import executeRequestMiddleware from "./components/executeRequest/middleware";
import tradingActivityMiddleware from "./components/tradingActivity/middleware";

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
    ),
    /* eslint-disable no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
    /* eslint-enable */
  ),
);
