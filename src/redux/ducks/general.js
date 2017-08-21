export const initialState = {
  vaultAddress: "",
  managerAddress: "",
  assetPair: "MLN-T/ETH-T",
};

export const types = {
  // REQUEST_INFORMATIONS: "REQUEST_INFORMATIONS:factsheet:melon.network",
  // UPDATE_INFORMATIONS: "UPDATE_INFORMATIONS:factsheet:melon.network",
};

export const creators = {
  // requestInformations: () => ({
  //   type: types.REQUEST_INFORMATIONS,
  // }),
  // updateInformations: newValues => ({
  //   type: types.UPDATE_INFORMATIONS,
  //   ...newValues,
  // }),
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
    // case types.REQUEST_INFORMATION: {
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // }
    // case types.UPDATE_INFORMATIONS: {
    //   return {
    //     ...state,
    //     ...params,
    //   };
    // }
    default:
      return state;
  }
};

export default reducer;
