export const initialState = {
  amount: "Amount",
  price: "Price per share",
  total: "Total",
  loading: false,
  countdown: null,
};

export const types = {
  INVEST: "INVEST:invest:melon.network",
  CHANGE: "CHANGE:invest:melon.network",
};

export const creators = {
  invest: () => ({
    type: types.INVEST,
  }),
  change: newValues => ({
    type: types.CHANGE,
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
    default:
      return state;
  }
};

export default reducer;
