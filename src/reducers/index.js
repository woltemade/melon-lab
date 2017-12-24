import { reducer as form } from "redux-form";

import account from "./account";
import app from "./app";
import ethereum from "./ethereum";
import fund from "./fund";
import holdings from "./holdings";
import modal from "./modal";
import orderbook from "./orderbook";
import ranking from "./ranking";
import recentTrades from "./recentTrades";
import tradeHelper from "./tradeHelper";
import tradeHistory from "./tradeHistory";

const reducerMap = {
  account,
  app,
  ethereum,
  form,
  fund,
  holdings,
  modal,
  orderbook,
  ranking,
  recentTrades,
  tradeHelper,
  tradeHistory
};

export default reducerMap;
