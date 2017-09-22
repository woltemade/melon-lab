import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Web3 from "web3";
import {
  setup,
  getFundForManager,
  getFundInformations,
  performCalculations,
} from "@melonproject/melon.js";
import store from "./store";
import "./index.css";
import AppContainer from "./components/app/container";
import registerServiceWorker from "./registerServiceWorker";

import { creators as generalCreators } from "./components/general";
import { creators as orderbookCreators } from "./components/orderbook/duck";
import { creators as factsheetCreators } from "./components/factsheet/duck";
import { creators as fundHoldingsCreators } from "./components/fundHoldings/duck";
import { creators as recentTradesCreators } from "./components/recentTrades/duck";
import { creators as tradeHelperCreators } from "./components/tradeHelper/duck";

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

  getFundForManager(setup.web3.eth.accounts[0]).then(fundAddress => {
    if (!fundAddress) {
      store.dispatch(
        generalCreators.update({
          mode: "Setup",
        }),
      );
    } else {
      getFundInformations(fundAddress).then(fundInformations => {
        if (fundInformations) {
          store.dispatch(
            generalCreators.update({
              fundAddress: fundInformations.fundAddress,
              fundName: fundInformations.name,
            }),
          );
          return performCalculations(
            fundInformations.fundAddress,
          ).then(calculations => {
            if (calculations.totalSupply.toNumber() !== 0) {
              store.dispatch(
                generalCreators.update({
                  mode: "Manage",
                }),
              );
              const defaultAssetPair = "MLN-T/ETH-T";
              store.dispatch(
                orderbookCreators.requestOrderbook(defaultAssetPair),
              );
              store.dispatch(factsheetCreators.requestInformations());
              store.dispatch(fundHoldingsCreators.requestHoldings());
              store.dispatch(
                recentTradesCreators.requestRecentTrades(defaultAssetPair),
              );
              store.dispatch(tradeHelperCreators.request(defaultAssetPair));
            } else {
              store.dispatch(
                generalCreators.update({
                  mode: "Invest",
                }),
              );
            }
          });
        }
      });
    }
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer />
      </Provider>,
      document.getElementById("root"),
    );
  });
});

registerServiceWorker();
