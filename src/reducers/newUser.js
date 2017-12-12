import { types } from "../actions/newUser";

export const initialState = {
  wallet: undefined,
  hasGenerated: false,
  hasSavedMnemonic: false,
  hasEncryptedAndStoredLocally: false,
};

const reducers = {
  merge: (state, params) => ({
    ...state,
    ...params,
  }),
  default: state => ({ ...state }),
};

const mapActionToReducer = {
  [types.GENERATE_WALLET_SUCCEEDED]: reducers.merge,
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  const matchedReducer = mapActionToReducer[type] || reducers.default;
  const newState = matchedReducer(state, params);

  return newState;
};

export default reducer;
