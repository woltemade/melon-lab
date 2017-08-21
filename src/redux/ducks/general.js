export const initialState = {
  vaultAddress: "",
  managerAddress: "",
  assetPair: "ETH-T/MLN-T",
  baseTokenSymbol: "ETH-T",
  quoteTokenSymbol: "MLN-T",
};

export const types = {
  UPDATE: "UPDATE:general:melon.network",
};

export const creators = {
  update: newValues => ({
    type: types.UPDATE,
    ...newValues,
  }),
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
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
