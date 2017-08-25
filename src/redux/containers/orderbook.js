import { connect } from "react-redux";
import Orderbook from "../../components/existingUser/orderbook";
import { creators } from "../ducks/orderbook";
import { creators as tradeCreators } from "../ducks/trade";

const mapStateToProps = state => ({
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
