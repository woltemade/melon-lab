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
};

export const types = {
  REQUEST_HOLDINGS: "REQUEST_HOLDINGS:fundHoldings:melon.network",
  UPDATE_HOLDINGS: "UPDATE_HOLDINGS:fundHoldings:melon.network",
};

export const creators = {
  requestHoldings: () => ({
    type: types.REQUEST_INFORMATIONS,
  }),
  updateHoldings: newValues => ({
    type: types.UPDATE_INFORMATIONS,
    ...newValues,
  }),
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST_HOLDINGS: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.UPDATE_HOLDINGS: {
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
