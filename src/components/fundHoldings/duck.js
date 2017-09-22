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
  "MLN-T": 0,
  "ANT-T": 0,
  "BNT-T": 0,
  "BAT-T": 0,
  "BTC-T": 0,
  "DGD-T": 0,
  "DOGE-T": 0,
  "ETC-T": 0,
  "ETH-T": 0,
  "EUR-T": 0,
  "GNO-T": 0,
  "GNT-T": 0,
  "ICN-T": 0,
  "LTC-T": 0,
  "REP-T": 0,
  "XRP-T": 0,
  "SNGLS-T": 0,
  "SNT-T": 0,
  "MLN-T_PRICE": 0,
  "ANT-T_PRICE": 0,
  "BNT-T_PRICE": 0,
  "BAT-T_PRICE": 0,
  "BTC-T_PRICE": 0,
  "DGD-T_PRICE": 0,
  "DOGE-T_PRICE": 0,
  "ETC-T_PRICE": 0,
  "ETH-T_PRICE": 0,
  "EUR-T_PRICE": 0,
  "GNO-T_PRICE": 0,
  "GNT-T_PRICE": 0,
  "ICN-T_PRICE": 0,
  "LTC-T_PRICE": 0,
  "REP-T_PRICE": 0,
  "XRP-T_PRICE": 0,
  "SNGLS-T_PRICE": 0,
  "SNT-T_PRICE": 0,
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
