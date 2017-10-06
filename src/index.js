import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Web3 from "web3";
import {
  setup,
  getFundForManager,
  getFundInformations,
  performCalculations,
  melonTracker,
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
import { creators as participationCreators } from "./components/participation/duck";
import { creators as tradingActivityCreators } from "./components/tradingActivity/duck";
import {
  creators as web3Creators,
  connectionModes,
} from "./components/web3/duck";

const getWeb3 = (web3 = window.web3) => {
  if (web3) {
    if (web3.currentProvider.isMetaMask) {
      store.dispatch(web3Creators.setConnection(connectionModes.METAMASK));
    } else {
      store.dispatch(
        web3Creators.setConnection(connectionModes.UNKNOWN_INJECTED),
      );
    }
    return new Web3(web3.currentProvider);
  }

  let provider = new Web3.providers.HttpProvider("http://localhost:8545");

  if (provider.isConnected()) {
    store.dispatch(web3Creators.setConnection(connectionModes.LOCAL));
  } else {
    provider = new Web3.providers.HttpProvider("https://kovan.melonport.com");

    if (provider.isConnected()) {
      store.dispatch(web3Creators.setConnection(connectionModes.HOSTED));
    } else {
      store.dispatch(web3Creators.setConnection(connectionModes.NOT_CONNECTED));
    }
  }

  return new Web3(provider);
};

window.addEventListener("load", () => {
  setup.init({
    web3: getWeb3(),
    daemonAddress: "0x00360d2b7D240Ec0643B6D819ba81A09e40E5bCd",
  });

  const defaultAssetPair = store.getState().general.assetPair;

  const tracker = melonTracker.on("DataUpdated", "LogItemUpdate");

  tracker((type, data) => {
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

  if (setup.defaultAccount) {
    getFundForManager(setup.web3.eth.accounts[0]).then(fundAddress => {
      // if (fundAddress === "0x") {
      //   store.dispatch(
      //     generalCreators.update({
      //       mode: "Setup",
      //     }),
      //   );
      // } else {
      getFundInformations(
        "0x04347ebaf1e1e3b59e0f96cf018f87a2e9cc9dbc",
      ).then(fundInformations => {
        // getFundInformations(fundAddress).then(fundInformations => {
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
              store.dispatch(
                orderbookCreators.requestOrderbook(
                  store.getState().general.assetPair,
                ),
              );
              store.dispatch(factsheetCreators.requestInformations());
              store.dispatch(fundHoldingsCreators.requestHoldings());
              store.dispatch(fundHoldingsCreators.requestPrices());
              store.dispatch(
                recentTradesCreators.requestRecentTrades(defaultAssetPair),
              );
              store.dispatch(tradeHelperCreators.request(defaultAssetPair));
              store.dispatch(participationCreators.request_price());
              store.dispatch(tradingActivityCreators.requestFundRecentTrades());
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
      // }
    });
  }
});

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root"),
);

registerServiceWorker();
