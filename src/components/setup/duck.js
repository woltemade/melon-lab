export const initialState = {
  name: "Fund Name",
  managementFee: "0%",
  performanceFee: "0%",
  fundAddress: "",
  fundOwner: "",
  loading: false,
};

export const types = {
  CREATE: "CREATE:setup:melon.network",
  CHANGE: "CHANGE:setup:melon.network",
};

export const creators = {
  create: () => ({
    type: types.CREATE,
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
    case types.CREATE: {
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
