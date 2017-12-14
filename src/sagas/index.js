import { fork } from "redux-saga/effects";

import administration from "./administration";
import app from "./app";
import ethereum from "./ethereum";
import fund from "./fund";
import setup from "./setup";
import ranking from "./ranking";
import holdings from "./holdings";
import orderbook from "./orderbook";
import recentTrades from "./recentTrades";
import tradeHistory from "./tradeHistory";
import newUser from "./newUser";
import participation from "./participation";

function* rootSaga() {
  yield fork(administration);
  yield fork(app);
  yield fork(ethereum);
  yield fork(fund);
  yield fork(setup);
  yield fork(ranking);
  yield fork(holdings);
  yield fork(orderbook);
  yield fork(recentTrades);
  yield fork(tradeHistory);
  yield fork(newUser);
  yield fork(participation);
}

export default rootSaga;
