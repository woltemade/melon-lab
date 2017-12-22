import { types } from "../actions/account";

export const initialState = {
  hasGenerated: false,
  hasSavedMnemonic: false,
  hasEncrypted: false,
  newAddress: "",
  mnemonic: "",
  loading: false,
};

export const reducer = (state = initialState, action = {}) => {
  const { type, ...params } = action;

  return Object.values(types).includes(type)
    ? {
        ...state,
        ...params,
      }
    : state;
};

export default reducer;
