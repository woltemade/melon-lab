export const initialState = {
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
  TAKE_ORDER: "TAKE_ORDER:trade:melon.network",
  MAKE_ORDER: "MAKE_ORDER:trade:melon.network",
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
  takeOrder: () => ({
    type: types.TAKE_ORDER,
  }),
  makeOrder: () => ({
    type: types.MAKE_ORDER,
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
    case types.TAKE_ORDER: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.MAKE_ORDER: {
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
