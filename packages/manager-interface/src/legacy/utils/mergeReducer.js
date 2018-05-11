const mergeReducer = (initialState, actionTypes) => (
  state = initialState,
  action = {},
) => {
  const { type, ...params } = action;

  return Object.keys(actionTypes)
    .map(key => actionTypes[key])
    .includes(type)
    ? {
        ...state,
        ...params,
      }
    : state;
};

export default mergeReducer;
