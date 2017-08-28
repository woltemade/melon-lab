import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Web3 from "web3";
import { setup, getConfig, getBalance } from "@melonproject/melon.js";
import store from "./redux/store";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { creators as orderbookCreators } from "./redux/ducks/orderbook";
import { creators as factsheetCreators } from "./redux/ducks/factsheet";
import { creators as fundHoldingsCreators } from "./redux/ducks/fundHoldings";
import { creators as recentTradesCreators } from "./redux/ducks/recentTrades";
import { creators as tradeHelperCreators } from "./redux/ducks/tradeHelper";

window.addEventListener("load", () => {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== "undefined") {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(window.web3.currentProvider);
    console.log("Found injected web3");
  } else {
    console.log("No web3? You should consider trying MetaMask!");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:8545"),
    );
  }
  setup.init({
    web3: window.web3,
    daemonAddress: "0x00360d2b7D240Ec0643B6D819ba81A09e40E5bCd",
  });
  getConfig().then(res => {
    console.log("melon.js config ", res);
  });

  // Now you can start your app & access web3 freely:

  // Dispatching on startup actions to get initial data
  store.dispatch(orderbookCreators.requestOrderbook("MLN-T/ETH-T"));
  store.dispatch(factsheetCreators.requestInformations());
  store.dispatch(fundHoldingsCreators.requestHoldings());
  store.dispatch(recentTradesCreators.requestRecentTrades("MLN-T/ETH-T"));
  store.dispatch(tradeHelperCreators.request());

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root"),
  );
});

registerServiceWorker();
