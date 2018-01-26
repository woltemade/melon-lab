import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReactModal from "react-modal";
import melonJsPkg from "@melonproject/melon.js/package.json";
import pkg from "../package.json";

import { configureStore } from "./config/configureStore";
import AppContainer from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";

import { actions } from "./actions/browser";

export const store = configureStore();

ReactModal.setAppElement("#root");

window.MELON_VERSIONS = `ipfs-frontend@${pkg.version} melon.js@${
  melonJsPkg.version
}`;

window.ENVIRONMENT = process.env.NODE_ENV;

if (window.Raven)
  window.Raven.config(
    "https://14d859a5b75f4d4fbd79defb6d53129a@sentry.io/278024",
    {
      release: window.MELON_VERSIONS,
      environment: window.ENVIRONMENT,
    },
  ).install();

window.addEventListener("load", () => {
  store.dispatch(actions.loaded());

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
