import { types, creators } from "../ducks/orderbook";

const orderbookMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().orderbook;

  switch (type) {
    case types.REQUEST_ORDERBOOK: {
      // store.dispatch(
      //   creators.updateOrderbook({}),
      // );
      break;
    }
    default:
  }

  return next(action);
};

export default orderbookMiddleware;
