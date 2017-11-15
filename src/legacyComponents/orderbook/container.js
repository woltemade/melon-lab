import { connect } from "react-redux";
import Orderbook from "./orderbook";
import { creators } from "./duck";
import { creators as tradeCreators } from "../trade/duck";

const mapStateToProps = state => ({
  ...state.general,
  ...state.orderbook,
});

const mapDispatchToProps = dispatch => ({
  onRequest: assetPair => {
    dispatch(creators.requestOrderbook(assetPair));
  },
  onClick: order => {
    dispatch(tradeCreators.prefill({ selectedOrder: order }));
  },
});

const OrderbookContainer = connect(mapStateToProps, mapDispatchToProps)(
  Orderbook,
);

export default OrderbookContainer;
