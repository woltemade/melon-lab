import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Web3 from "web3";
import {
  setup,
  melonTracker,
} from "@melonproject/melon.js";
import store from "./store";
import "./index.css";
import AppContainer from "./components/app/container";
import registerServiceWorker from "./registerServiceWorker";

import { creators as orderbookCreators } from "./components/orderbook/duck";
import { creators as fundHoldingsCreators } from "./components/fundHoldings/duck";

import {
  creators as web3Creators,
  connectionModes,
} from "./components/web3/duck";

const getWeb3 = (web3 = window.web3) => {
  let connectionMode;

  if (web3) {
    if (web3.currentProvider.isMetaMask) {
      connectionMode = connectionModes.METAMASK;
    } else {
      connectionMode = connectionModes.UNKNOWN_INJECTED;
    }
    return { web3: new Web3(web3.currentProvider), connectionMode };
  }

  let provider = new Web3.providers.HttpProvider("http://localhost:8545");

  if (provider.isConnected()) {
    connectionMode = connectionModes.LOCAL;
  } else {
    provider = new Web3.providers.HttpProvider("https://kovan.melonport.com");

    if (provider.isConnected()) {
      connectionMode = connectionModes.HOSTED;
    } else {
      connectionMode = connectionModes.NOT_CONNECTED;

    }
  }

  return { web3: new Web3(provider), connectionMode };
};

window.addEventListener("load", () => {
  const { web3, connectionMode } = getWeb3();

  setup.init({
    web3,
    daemonAddress: "0x00360d2b7D240Ec0643B6D819ba81A09e40E5bCd",
  });

  store.dispatch(web3Creators.setConnection(connectionMode));

  const tracker = melonTracker.on("DataUpdated", "LogItemUpdate");

  tracker((type) => {
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
