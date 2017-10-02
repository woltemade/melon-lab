import BigNumber from "bignumber.js";
import {
  setup,
  deserializeOrder,
  averagePrice,
  matchOrders,
  takeMultipleOrdersFromFund,
  getPrices,
  makeOrderFromFund,
} from "@melonproject/melon.js";
import { types, creators } from "./duck";

import { creators as orderbookCreators } from "../orderbook/duck";
import { creators as fundHoldingsCreators } from "../fundHoldings/duck";
import { creators as tradeHelperCreators } from "../tradeHelper/duck";
import { creators as recentTradesCreators } from "../recentTrades/duck";
import { creators as factsheetCreators } from "../factsheet/duck";

const tradeMiddleware = store => next => action => {
  const { type, ...params } = action;
  const currentState = store.getState().trade;

  switch (type) {
    case types.PREFILL: {
      let index;
      let subsetOfOrders;
      let average;
      let orderType;
      let theirOrderType;

      if (params.selectedOrder.type === "buy") {
        orderType = "Sell";
        theirOrderType = "Buy";
        const buyOrders = store
          .getState()
          .orderbook.buyOrders.map(order => deserializeOrder(order));
        index = buyOrders.indexOf(params.selectedOrder);
        subsetOfOrders = buyOrders.slice(0, index + 1);
        average = averagePrice("buy", subsetOfOrders);
      } else if (params.selectedOrder.type === "sell") {
        orderType = "Buy";
        theirOrderType = "Sell";
        const sellOrders = store
          .getState()
          .orderbook.sellOrders.map(order => deserializeOrder(order));
        index = sellOrders.indexOf(params.selectedOrder);
        subsetOfOrders = sellOrders.slice(0, index + 1);
        average = averagePrice("sell", subsetOfOrders);
      }

      const total = average
        .times(new BigNumber(params.selectedOrder.cumulativeVolume))
        .toFixed(18);
      const amount = new BigNumber(
        params.selectedOrder.cumulativeVolume,
      ).toString();
      const price = average.toString();

      store.dispatch(
        creators.update({
          amount,
          price,
          total,
          orderType,
          theirOrderType,
        }),
      );

      break;
    }

    case types.CHANGE: {
      let amount;
      let total;

      if (params.amount) {
        total = params.amount * currentState.price;
        store.dispatch(
          creators.update({
            amount: params.amount.toString(10),
            total: total.toString(10),
          }),
        );
      } else if (params.total) {
        amount = params.total / currentState.price;
        store.dispatch(
          creators.update({
            amount: amount.toString(10),
            total: params.total.toString(10),
          }),
        );
      } else if (params.price) {
        total = params.price * currentState.amount;
        store.dispatch(
          creators.update({
            price: params.price.toString(10),
            total: total.toString(10),
            selectedOrder: {},
          }),
        );
      }
      break;
    }

    case types.TAKE_ORDER: {
      const theirOrderType = currentState.selectedOrder.type;
      const ourOrderType = theirOrderType === "buy" ? "sell" : "buy";
      const priceTreshold = getPrices(currentState.selectedOrder)[
        theirOrderType
      ];

      const orders =
        theirOrderType === "buy"
          ? store
              .getState()
              .orderbook.buyOrders.map(order => deserializeOrder(order))
          : store
              .getState()
              .orderbook.sellOrders.map(order => deserializeOrder(order));
      const matchedOrders = matchOrders(theirOrderType, priceTreshold, orders);
      const quantityAsked =
        ourOrderType === "buy"
          ? new BigNumber(currentState.amount)
          : new BigNumber(currentState.total);
      takeMultipleOrdersFromFund(
        matchedOrders,
        setup.web3.eth.accounts[0],
        store.getState().general.fundAddress,
        quantityAsked,
      )
        .then(result => {
          console.log("Trade receipt ", result);
          store.dispatch(
            creators.update({
              amount: "",
              price: "",
              total: "",
              selectedOrder: {},
              orderType: "Buy",
              theirOrderType: "Sell",
              loading: false,
            }),
          );
          const assetPair = store.getState().general.assetPair;
          store.dispatch(fundHoldingsCreators.requestHoldings());
          store.dispatch(tradeHelperCreators.request(assetPair));
          store.dispatch(orderbookCreators.requestOrderbook(assetPair));
          store.dispatch(recentTradesCreators.requestRecentTrades(assetPair));
          store.dispatch(factsheetCreators.requestInformations());
        })
        .catch(error => console.log(error));
      break;
    }

    case types.MAKE_ORDER: {
      let buyHowMuch;
      let buyWhichToken;
      let sellHowMuch;
      let sellWhichToken;

      if (currentState.orderType === "Buy") {
        buyHowMuch = currentState.amount;
        buyWhichToken = store.getState().general.baseTokenSymbol;
        sellHowMuch = currentState.total;
        sellWhichToken = store.getState().general.quoteTokenSymbol;
      } else if (currentState.orderType === "Sell") {
        buyHowMuch = currentState.total;
        buyWhichToken = store.getState().general.quoteTokenSymbol;
        sellHowMuch = currentState.amount;
        sellWhichToken = store.getState().general.baseTokenSymbol;
      }

      console.log(
        "Make order from fund with ",
        store.getState().general.fundAddress,
        sellWhichToken,
        buyWhichToken,
        sellHowMuch,
        buyHowMuch,
        setup.web3.eth.accounts[0],
      );
      makeOrderFromFund(
        store.getState().general.fundAddress,
        sellWhichToken,
        buyWhichToken,
        sellHowMuch,
        buyHowMuch,
        setup.web3.eth.accounts[0],
      )
        .then(result => {
          console.log("Trade receipt ", result);
          store.dispatch(
            creators.update({
              amount: "",
              price: "",
              total: "",
              selectedOrder: {},
              orderType: "Buy",
              theirOrderType: "Sell",
              loading: false,
            }),
          );
          const assetPair = store.getState().general.assetPair;
          store.dispatch(fundHoldingsCreators.requestHoldings());
          store.dispatch(tradeHelperCreators.request(assetPair));
          store.dispatch(orderbookCreators.requestOrderbook(assetPair));
          store.dispatch(recentTradesCreators.requestRecentTrades(assetPair));
        })
        .catch(error => console.log(error));
      break;
    }

    default:
  }

  return next(action);
};

export default tradeMiddleware;
