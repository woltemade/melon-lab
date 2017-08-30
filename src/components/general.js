export const initialState = {
  vaultAddress: "",
  managerAddress: "",
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
  updateAssetPair: newAssetPair => ({
    type: types.UPDATE_ASSET_PAIR,
    newAssetPair,
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
        assetPair: params.newAssetPair,
        baseTokenSymbol: params.newAssetPair.split("/")[0],
        quoteTokenSymbol: params.newAssetPair.split("/")[1],
      };
    }
    default:
      return state;
  }
};

export default reducer;
