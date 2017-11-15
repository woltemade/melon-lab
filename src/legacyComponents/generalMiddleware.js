import {
  setup,
  getFundForManager,
  getFundInformations,
  performCalculations,
} from "@melonproject/melon.js";

import { types, creators } from "./general";
import { creators as orderbookCreators } from "./orderbook/duck";
import { creators as recentTradesCreators } from "./recentTrades/duck";
import { creators as tradeHelperCreators } from "./tradeHelper/duck";
import { creators as tradingActivityCreators } from "./tradingActivity/duck";
import { creators as factsheetCreators } from "./factsheet/duck";
import { creators as fundHoldingsCreators } from "./fundHoldings/duck";
import { creators as participationCreators } from "./participation/duck";
import { creators as settingsCreators } from "./settings/duck";
import { types as web3types } from "./web3/duck";

const generalMiddleware = store => next => action => {
  const { type, ...params } = action;

  switch (type) {
    case types.UPDATE_ASSET_PAIR: {
      store.dispatch(
        creators.update({
          baseTokenSymbol: params.assetPair.split("/")[0],
          quoteTokenSymbol: params.assetPair.split("/")[1],
        }),
      );
      store.dispatch(orderbookCreators.requestOrderbook(params.assetPair));
      store.dispatch(
        recentTradesCreators.requestRecentTrades(params.assetPair),
      );
      store.dispatch(tradingActivityCreators.requestFundRecentTrades());
      store.dispatch(tradeHelperCreators.request(params.assetPair));
      break;
    }
    case web3types.ACCOUNT_CHANGE: {
      console.log(params.account);
      if (params.account) {
        const defaultAssetPair = store.getState().general.assetPair;

        getFundForManager(setup.web3.eth.accounts[0]).then(fundAddress => {
          if (!fundAddress) {
            store.dispatch(
              creators.update({
                mode: "Setup",
              }),
            );
          } else {
            getFundInformations(fundAddress).then(fundInformations => {
              store.dispatch(
                creators.update({
                  fundAddress: fundInformations.fundAddress,
                  fundName: fundInformations.name,
                }),
              );
              return performCalculations(
                fundInformations.fundAddress,
              ).then(calculations => {
                if (calculations.totalSupply.toNumber() !== 0) {
                  store.dispatch(
                    creators.update({
                      mode: "Manage",
                    }),
                  );
                  store.dispatch(
                    orderbookCreators.requestOrderbook(
                      store.getState().general.assetPair,
                    ),
                  );
                  store.dispatch(factsheetCreators.requestInformations());
                  store.dispatch(fundHoldingsCreators.requestPrices());
                  store.dispatch(fundHoldingsCreators.requestHoldings());
                  store.dispatch(
                    recentTradesCreators.requestRecentTrades(defaultAssetPair),
                  );
                  store.dispatch(participationCreators.request_price());
                  store.dispatch(
                    tradingActivityCreators.requestFundRecentTrades(),
                  );
                  store.dispatch(tradeHelperCreators.request(defaultAssetPair));
                  store.dispatch(settingsCreators.requestSettings());
                } else {
                  store.dispatch(
                    creators.update({
                      mode: "Invest",
                    }),
                  );
                }
              });
            });
          }
        });
      }
      break;
    }
    default:
  }

  return next(action);
};

export default generalMiddleware;
