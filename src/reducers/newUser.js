import { types } from "../actions/newUser";

export const initialState = {
  hasGenerated: false,
  hasSavedMnemonic: false,
  hasEncrypted: false,
  newAddress: "",
};

const reducers = {
  generated: (state, params) => ({
    ...state,
    hasGenerated: true,
    newAddress: params.newAddress,
  }),
  encrypted: state => ({ ...state, hasEncrypted: true }),
  default: state => ({ ...state }),
};

const mapActionToReducer = {
  [types.GENERATE_WALLET_SUCCEEDED]: reducers.generated,
  [types.ENCRYPT_WALLET_SUCCEEDED]: reducers.encrypted,
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  const matchedReducer = mapActionToReducer[type] || reducers.default;
  const newState = matchedReducer(state, params);

  return newState;
};

export default reducer;
