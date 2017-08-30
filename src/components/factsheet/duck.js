export const initialState = {
  name: "My fund",
  inception: "N/A",
  aum: "N/A",
  sharePrice: "N/A",
  managementReward: "N/A",
  performanceReward: "N/A",
  unclaimedRewards: "N/A",
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
