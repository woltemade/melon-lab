export const initialState = {
  requestId: "",
  readyToExecute: false,
  loading: false,
  // countdown: null,
};

export const types = {
  UPDATE: "UPDATE:executeRequest:melon.network",
  EXECUTE: "EXECUTE:executeRequest:melon.network",
};

export const creators = {
  update: newValues => ({
    type: types.UPDATE,
    ...newValues,
  }),
  execute: () => ({
    type: types.EXECUTE,
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
    case types.EXECUTE: {
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
