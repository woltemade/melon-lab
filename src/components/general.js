export const initialState = {
  mode: "", // 4 existing modes right now: setup / invest / execute / manage
  vaultAddress: "",
  managerAddress: "",
  inceptionDate: null,
  assetPair: "MLN-T/ETH-T",
  baseTokenSymbol: "MLN-T",
  quoteTokenSymbol: "ETH-T",
};

export const types = {
  UPDATE: "UPDATE:general:melon.network",
  UPDATE_ASSET_PAIR: "UPDATE_ASSET_PAIR:general:melon.network",
};

export const creators = {
  update: newValues => ({
    type: types.UPDATE,
    ...newValues,
  }),
  updateAssetPair: assetPair => ({
    type: types.UPDATE_ASSET_PAIR,
    assetPair,
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
    case types.UPDATE_ASSET_PAIR: {
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
