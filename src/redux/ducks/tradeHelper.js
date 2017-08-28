export const initialState = {
  baseTokenBalance: 0,
  quoteTokenBalance: 0,
};

export const types = {
  REQUEST: "REQUEST:trade:melon.network",
  UPDATE: "UPDATE:trade:melon.network",
};

export const creators = {
  request: () => ({
    type: types.REQUEST,
  }),
  update: newValues => ({
    type: types.UPDATE,
    ...newValues,
  }),
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST: {
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
    default:
      return state;
  }
};

export default reducer;
