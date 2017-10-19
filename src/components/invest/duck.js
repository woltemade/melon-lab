export const initialState = {
  amount: "",
  price: 1,
  total: "",
  loading: false,
  countdown: null,
};

export const types = {
  INVEST: "INVEST:invest:melon.network",
  CHANGE: "CHANGE:invest:melon.network",
  UPDATE: "UPDATE:invest:melon.network",
};

export const creators = {
  invest: () => ({
    type: types.INVEST,
  }),
  change: newValues => ({
    type: types.CHANGE,
    ...newValues,
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
