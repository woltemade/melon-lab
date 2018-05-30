import { pick, keys } from 'ramda';
import { types } from '../actions/wallet';

export const initialState = {
  hasGenerated: false,
  hasSavedMnemonic: false,
  hasEncrypted: false,
  newAddress: '',
  mnemonic: '',
  loading: false,
  privateKey: '',
};

// Helper util to only add params to the state if defined in initialState
// --> Possibility to have "private" params
const cleanParams = (model, params) => pick(keys(model), params);

export const reducer = (state = initialState, action = {}) => {
  const { type, ...params } = action;

  return Object.keys(types)
    .map(key => types[key])
    .includes(type)
    ? {
        ...state,
        ...cleanParams(initialState, params),
      }
    : state;
};

export default reducer;
