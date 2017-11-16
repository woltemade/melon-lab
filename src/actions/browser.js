export const types = {
  LOADED: "LOADED:browser:ipfs-frontend",
};

export const creators = {
  loaded: () => ({
    type: types.LOADED,
  }),
};
