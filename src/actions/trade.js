export const types = {
  PLACE_ORDER_REQUESTED: "PLACE_ORDER_REQUESTED:trade:melon.fund",
  PLACE_ORDER_SUCCEEDED: "PLACE_ORDER_SUCCEEDED:trade:melon.fund",
  PLACE_ORDER_FAILED: "PLACE_ORDER_FAILED:trade:melon.fund",
  TAKE_ORDER_REQUESTED: "TAKE_ORDER_REQUESTED:trade:melon.fund",
  TAKE_ORDER_SUCCEEDED: "TAKE_ORDER_SUCCEEDED:trade:melon.fund",
  TAKE_ORDER_FAILED: "TAKE_ORDER_FAILED:trade:melon.fund",
};

export const actions = {
  placeOrder: ({ amount, total }) => ({
    type: types.PLACE_ORDER_REQUESTED,
    amount,
    total,
  }),
  placeOrderFailed: reason => ({
    type: types.PLACE_ORDER_FAILED,
    reason,
  }),
  placeOrderSucceeded: () => ({
    type: types.PLACE_ORDER_SUCCEEDED,
  }),
  takeOrder: ({ orderId }) => ({
    type: types.PLACE_ORDER_REQUESTED,
    orderId,
  }),
  takeOrderFailed: reason => ({
    type: types.PLACE_ORDER_FAILED,
    reason,
  }),
  takeOrderSucceeded: () => ({
    type: types.PLACE_ORDER_SUCCEEDED,
  }),
};
