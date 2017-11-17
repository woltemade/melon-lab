import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import configureStore from "./config/configureStore";
import AppContainer from "./legacyComponents/app/container";
import registerServiceWorker from "./registerServiceWorker";
import { creators as orderbookCreators } from "./legacyComponents/orderbook/duck";
import { creators as fundHoldingsCreators } from "./legacyComponents/fundHoldings/duck";

import { creators } from "./actions/browser";

export const store = configureStore();

window.addEventListener("load", () => {
  store.dispatch(creators.loaded());
  /*
  // TODO: Refactor this ino own saga
  const tracker = melonTracker.on("DataUpdated", "LogItemUpdate");

  tracker(type => {
    switch (type) {
      case "DataUpdated":
        store.dispatch(fundHoldingsCreators.requestPrices());
        break;

      case "LogItemUpdate":
        store.dispatch(
          orderbookCreators.requestOrderbook(
            store.getState().general.assetPair,
          ),
        );
        break;

      default:
    }
  });
  */
});

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root"),
);

registerServiceWorker();
