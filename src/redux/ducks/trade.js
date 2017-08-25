export const initialState = {
  assetPair: "MLN-T/ETH-T",
  amount: "",
  price: "",
  total: "",
  selectedOrder: {},
};

export const types = {
  PREFILL: "PREFILL:trade:melon.network",
  CHANGE: "CHANGE:trade:melon.network",
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
    default:
      return state;
  }
};

export default reducer;
