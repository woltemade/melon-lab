export const types = {
  CREATE: "CREATE:setup:melon.network",
  CHANGE: "CHANGE:setup:melon.network",
};

export const creators = {
  create: () => ({
    type: types.CREATE,
  }),
  change: newValues => ({
    type: types.CHANGE,
    ...newValues,
  }),
};
