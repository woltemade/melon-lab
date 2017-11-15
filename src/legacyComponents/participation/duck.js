export const initialState = {
  amount: "",
  price: "Price per share",
  total: "",
  loading: false,
  participationType: "Invest",
};

export const types = {
  INVEST: "INVEST:participation:melon.network",
  CHANGE: "CHANGE:participation:melon.network",
  REQUEST_PRICE: "REQUEST_PRICE:participation:melon.network",
  UPDATE: "UPDATE:participation:melon.network",
};

export const creators = {
  invest: () => ({
    type: types.INVEST,
  }),

  change: newValues => ({
    type: types.CHANGE,
    ...newValues,
  }),
  request_price: () => ({
    type: types.REQUEST_PRICE,
  }),
  update: newValues => ({
    type: types.UPDATE,
    ...newValues,
  }),
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
    case types.CHANGE: {
      return {
        ...state,
        ...params,
      };
    }
    case types.INVEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.REQUEST_PRICE: {
      return {
        ...state,
      };
    }
    case types.UPDATE: {
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
