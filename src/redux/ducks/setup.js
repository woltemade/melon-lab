export const initialState = {
  name: "Fund Name",
  managementFee: "2%",
  performanceFee: "5%",
  dimmerClass: "ui inverted dimmer",
  vaultAddress: "",
  vaultOwner: "",
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
        dimmerClass: "ui active inverted dimmer",
      };
    }
    default:
      return state;
  }
};

export default reducer;
