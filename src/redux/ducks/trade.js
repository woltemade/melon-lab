export const initialState = {
  assetPair: "MLN-T/ETH-T",
  amount: "Amount",
  price: "Price",
  total: "Total",
  selectedOrder: {},
};

export const types = {
  PREFILL: "PREFILL:trade:melon.network",
};

export const creators = {
  prefill: order => ({
    type: types.PREFILL,
    ...order,
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
    default:
      return state;
  }
};

export default reducer;
