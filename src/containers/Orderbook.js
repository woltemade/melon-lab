import { connect } from "react-redux";
import { actions } from "../actions/orderbook";
import { lifecycle } from "recompose";
import Orderbook from "../components/organisms/Orderbook";
import displayNumber from "../utils/displayNumber";

const mapStateToProps = state => ({
  ...state.orderbook,
  buyOrders: state.orderbook.buyOrders.map(order => ({
    id: order.id,
    price: displayNumber(order.price),
    cumulativeVolume: displayNumber(order.cumulativeVolume),
    howMuch: displayNumber(order.buy.howMuch),
  })),
  sellOrders: state.orderbook.sellOrders.map(order => ({
    id: order.id,
    price: displayNumber(order.price),
    cumulativeVolume: displayNumber(order.cumulativeVolume),
    howMuch: displayNumber(order.sell.howMuch),
  })),
  totalBuyVolume: displayNumber(state.orderbook.totalBuyVolume),
  totalSellVolume: displayNumber(state.orderbook.totalSellVolume),
  baseTokenSymbol: state.app.assetPair.base,
  quoteTokenSymbol: state.app.assetPair.quote,
  isReadyToTrade: state.app.isReadyToTrade,
});

const mapDispatchToProps = dispatch => ({
  getOrderbook: () => {
    dispatch(actions.getOrderbook());
  },
  onClick: orderId => {
    dispatch(actions.selectOrder(orderId));
  },
});

const OrderbookLifecycle = lifecycle({
  componentDidMount() {
    this.props.getOrderbook();
  },
})(Orderbook);

const OrderbookContainer = connect(mapStateToProps, mapDispatchToProps)(
  OrderbookLifecycle,
);

export default OrderbookContainer;
