import { types } from "../actions/orderbook";
import mergeReducer from "../utils/mergeReducer";

export const initialState = {
  orders: [],
  buyOrders: [],
  sellOrders: [],
  totalBuyVolume: 0,
  totalSellVolume: 0,
  selectedOrder: null,
  loading: false,
};

export const reducer = mergeReducer(initialState, types);

export default reducer;
