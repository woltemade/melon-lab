export const initialState = {
  subscriptionAllowed: true,
  redemptionAllowed: true,
  loading: false,
};

export const types = {
  REQUEST_SETTINGS: "REQUEST_SETTINGS:settings:melon.network",
  UPDATE_SETTINGS: "UPDATE_SETTINGS:settings:melon.network",
  TOGGLE: "TOGGLE:settings:melon.network",
  CONVERT_UNCLAIMED_REWARDS: "CONVERT_UNCLAIMED_REWARDS:settings:melon.network",
  SHUT_DOWN: "SHUT_DOWN:settings:melon.network",
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
  convertUnclaimedRewards: () => ({
    type: types.CONVERT_UNCLAIMED_REWARDS,
  }),
  shutDown: () => ({
    type: types.SHUT_DOWN,
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
    case types.CONVERT_UNCLAIMED_REWARDS: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.SHUT_DOWN: {
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
