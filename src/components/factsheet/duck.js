export const initialState = {
  name: "My fund",
  inception: "N/A",
  aum: "0",
  sharePrice: "0",
  managementReward: "0",
  performanceReward: "0",
  unclaimedRewards: "0",
};

export const types = {
  REQUEST_INFORMATIONS: "REQUEST_INFORMATIONS:factsheet:melon.network",
  UPDATE_INFORMATIONS: "UPDATE_INFORMATIONS:factsheet:melon.network",
};

export const creators = {
  requestInformations: () => ({
    type: types.REQUEST_INFORMATIONS,
  }),
  updateInformations: newValues => ({
    type: types.UPDATE_INFORMATIONS,
    ...newValues,
  }),
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST_INFORMATION: {
      return {
        ...state,
      };
    }
    case types.UPDATE_INFORMATIONS: {
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
