import { combineReducers } from "redux";

import app from "./app";
import ethereum from "./ethereum";
import executeRequest from "../legacyComponents/executeRequest/duck";
import factsheet from "../legacyComponents/factsheet/duck";
import fundHoldings from "../legacyComponents/fundHoldings/duck";
import general from "../legacyComponents/general";
import invest from "../legacyComponents/invest/duck";
import orderbook from "../legacyComponents/orderbook/duck";
import participation from "../legacyComponents/participation/duck";
import recentTrades from "../legacyComponents/recentTrades/duck";
import settings from "../legacyComponents/settings/duck";
import setup from "../legacyComponents/setup/duck";
import trade from "../legacyComponents/trade/duck";
import tradeHelper from "../legacyComponents/tradeHelper/duck";
import tradingActivity from "../legacyComponents/tradingActivity/duck";

const rootReducer = combineReducers({
  app,
  ethereum,
  executeRequest,
  factsheet,
  fundHoldings,
  general,
  invest,
  orderbook,
  participation,
  recentTrades,
  settings,
  setup,
  trade,
  tradeHelper,
  tradingActivity,
});

export default rootReducer;
