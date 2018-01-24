export const types = {
  GET_OPEN_ORDERS_REQUESTED: "GET_OPEN_ORDERS_REQUESTED:openOrders:melon.fund",
  GET_OPEN_ORDERS_SUCCEEDED: "GET_OPEN_ORDERS_SUCCEEDED:openOrders:melon.fund",
  GET_OPEN_ORDERS_FAILED: "GET_OPEN_ORDERS_FAILED:openOrders:melon.fund",
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
};
