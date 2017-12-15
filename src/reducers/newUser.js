import { types } from "../actions/newUser";

export const initialState = {
  hasGenerated: false,
  hasSavedMnemonic: false,
  hasEncrypted: false,
  newAddress: "",
};

const reducers = {
  merge: (state, params) => ({ ...state, ...params }),
  default: state => ({ ...state }),
};

const mapActionToReducer = {
  [types.GENERATE_WALLET_SUCCEEDED]: reducers.merge,
  [types.ENCRYPT_WALLET_SUCCEEDED]: reducers.merge,
  [types.I_SAVED]: reducers.merge,
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  const matchedReducer = mapActionToReducer[type] || reducers.default;
  const newState = matchedReducer(state, params);

  return newState;
};

export default reducer;
