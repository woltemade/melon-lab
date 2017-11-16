import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { setup, melonTracker } from "@melonproject/melon.js";

import store from "./config/store";
import "./index.css";
import AppContainer from "./legacyComponents/app/container";
import registerServiceWorker from "./registerServiceWorker";
import { creators as orderbookCreators } from "./legacyComponents/orderbook/duck";
import { creators as fundHoldingsCreators } from "./legacyComponents/fundHoldings/duck";
import getWeb3 from "./utils/getWeb3";
import { creators } from "./actions/ethereum";

window.addEventListener("load", () => {
  const { web3, provider } = getWeb3();

  setup.init({
    web3,
    daemonAddress: "0x00360d2b7D240Ec0643B6D819ba81A09e40E5bCd",
  });

  store.dispatch(creators.setProvider(provider));

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
});

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root"),
);

registerServiceWorker();
