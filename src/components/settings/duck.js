export const initialState = {
  subscriptionAllowed: false,
  redemptionAllowed: false,
  loading: false,
};

export const types = {
  REQUEST_SETTINGS: "REQUEST_SETTINGS:settings:melon.network",
  UPDATE_SETTINGS: "UPDATE_SETTINGS:settings:melon.network",
  TOGGLE: "TOGGLE:settings:melon.network",
};

export const creators = {
  requestSettings: () => ({
    type: types.REQUEST_SETTINGS,
  }),
  updateSettings: newValues => ({
    type: types.UPDATE_SETTINGS,
    ...newValues,
  }),
  toggle: toggleType => ({
    type: types.TOGGLE,
    toggleType,
  }),
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST_SETTINGS: {
      return {
        ...state,
      };
    }
    case types.UPDATE_SETTINGS: {
      return {
        ...state,
        ...params,
      };
    }
    case types.TOGGLE: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
