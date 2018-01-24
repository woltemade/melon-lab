export const types = {
  GET_OPEN_ORDERS_REQUESTED: "GET_OPEN_ORDERS_REQUESTED:openOrders:melon.fund",
  GET_OPEN_ORDERS_SUCCEEDED: "GET_OPEN_ORDERS_SUCCEEDED:openOrders:melon.fund",
  GET_OPEN_ORDERS_FAILED: "GET_OPEN_ORDERS_FAILED:openOrders:melon.fund",
  CANCEL_ORDER_REQUESTED: "CANCEL_ORDER_REQUESTED:openOrders:melon.fund",
  CANCEL_ORDER_SUCCEEDED: "CANCEL_ORDER_SUCCEEDED:openOrders:melon.fund",
  CANCEL_ORDER_FAILED: "CANCEL_ORDER_FAILED:openOrders:melon.fund",
};

export const actions = {
  getOpenOrders: fundAddress => ({
    type: types.GET_OPEN_ORDERS_REQUESTED,
    fundAddress,
  }),
  getOpenOrdersFailed: reason => ({
    type: types.GET_OPEN_ORDERS_FAILED,
    reason,
  }),
  getOpenOrdersSucceeded: openOrders => ({
    type: types.GET_OPEN_ORDERS_SUCCEEDED,
    ...openOrders,
  }),
  cancelOrder: (orderIndex, orderId) => ({
    type: types.CANCEL_ORDER_REQUESTED,
    orderIndex,
    orderId,
  }),
  cancelOrderFailed: reason => ({
    type: types.CANCEL_ORDER_FAILED,
    reason,
  }),
  cancelOrderSucceeded: () => ({
    type: types.CANCEL_ORDER_SUCCEEDED,
  }),
};
