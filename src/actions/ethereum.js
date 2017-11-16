export const types = {
  SET_PROVIDER: "SET_PROVIDER:ethereum:melon.js",
};

export const creators = {
  setProvider: provider => ({
    type: types.SET_PROVIDER,
    provider,
  }),
};
