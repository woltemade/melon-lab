export const initialState = {
  assets: [
    "MLN-T",
    "ANT-T",
    "BNT-T",
    "BAT-T",
    "BTC-T",
    "DGD-T",
    "DOGE-T",
    "ETC-T",
    "ETH-T",
    "EUR-T",
    "GNO-T",
    "GNT-T",
    "ICN-T",
    "LTC-T",
    "REP-T",
    "XRP-T",
    "SNGLS-T",
    "SNT-T",
  ],
  "MLN-T": "-",
  "ANT-T": "-",
  "BNT-T": "-",
  "BAT-T": "-",
  "BTC-T": "-",
  "DGD-T": "-",
  "DOGE-T": "-",
  "ETC-T": "-",
  "ETH-T": "-",
  "EUR-T": "-",
  "GNO-T": "-",
  "GNT-T": "-",
  "ICN-T": "-",
  "LTC-T": "-",
  "REP-T": "-",
  "XRP-T": "-",
  "SNGLS-T": "-",
  "SNT-T": "-",
  "MLN-T_PRICE": "-",
  "ANT-T_PRICE": "-",
  "BNT-T_PRICE": "-",
  "BAT-T_PRICE": "-",
  "BTC-T_PRICE": "-",
  "DGD-T_PRICE": "-",
  "DOGE-T_PRICE": "-",
  "ETC-T_PRICE": "-",
  "ETH-T_PRICE": "-",
  "EUR-T_PRICE": "-",
  "GNO-T_PRICE": "-",
  "GNT-T_PRICE": "-",
  "ICN-T_PRICE": "-",
  "LTC-T_PRICE": "-",
  "REP-T_PRICE": "-",
  "XRP-T_PRICE": "-",
  "SNGLS-T_PRICE": "-",
  "SNT-T_PRICE": "-",
};

export const types = {
  REQUEST_HOLDINGS: "REQUEST_HOLDINGS:fundHoldings:melon.network",
  UPDATE_HOLDINGS: "UPDATE_HOLDINGS:fundHoldings:melon.network",
  REQUEST_PRICES: "REQUEST_PRICES:fundHoldings:melon.network",
  UPDATE_PRICES: "UPDATE_PRICES:fundHoldings:melon.network",
};

export const creators = {
  requestHoldings: () => ({
    type: types.REQUEST_HOLDINGS,
  }),
  updateHoldings: newValues => ({
    type: types.UPDATE_HOLDINGS,
    ...newValues,
  }),
  requestPrices: () => ({
    type: types.REQUEST_PRICES,
  }),
  updatePrices: newValues => ({
    type: types.UPDATE_PRICES,
    ...newValues,
  }),
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST_HOLDINGS: {
      return {
        ...state,
      };
    }
    case types.UPDATE_HOLDINGS: {
      return {
        ...state,
        ...params,
      };
    }
    case types.REQUEST_PRICES: {
      return {
        ...state,
      };
    }
    case types.UPDATE_PRICES: {
      return {
        ...state,
        ...params,
      };
    }
    default:
      return state;
  }
};

export default reducer;
