export const initialState = {
  assetPair: "MLN-T/ETH-T",
  amount: "",
  price: "",
  total: "",
  selectedOrder: {},
  orderType: "Buy",
  theirOrderType: "Sell",
  loading: false,
};

export const types = {
  PREFILL: "PREFILL:trade:melon.network",
  CHANGE: "CHANGE:trade:melon.network",
  UPDATE: "UPDATE:trade:melon.network",
  PLACE_ORDER: "PLACE_ORDER:trade:melon.network",
};

export const creators = {
  prefill: order => ({
    type: types.PREFILL,
    ...order,
  }),
  change: newValues => ({
    type: types.CHANGE,
    ...newValues,
  }),
  update: newValues => ({
    type: types.UPDATE,
    ...newValues,
  }),
  placeOrder: () => ({
    type: types.PLACE_ORDER,
  }),
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
    case types.PREFILL: {
      return {
        ...state,
        ...params,
      };
    }
    case types.CHANGE: {
      return {
        ...state,
        ...params,
      };
    }
    case types.UPDATE: {
      return {
        ...state,
        ...params,
      };
    }
    case types.PLACE_ORDER: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
