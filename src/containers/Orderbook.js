import { connect } from "react-redux";
import { actions } from "../actions/orderbook";
import { lifecycle } from "recompose";
import Orderbook from "../components/organisms/Orderbook";
import displayNumber from "../utils/displayNumber";

const mapStateToProps = state => ({
  ...state.orderbook,
  buyOrders: state.orderbook.buyOrders.map(order => {
    const formattedOrder = order;
    formattedOrder.price = displayNumber(order.price);
    formattedOrder.cumulativeVolume = displayNumber(order.cumulativeVolume);
    formattedOrder.howMuch = displayNumber(order.buy.howMuch);
    return formattedOrder;
  }),
  sellOrders: state.orderbook.sellOrders.map(order => {
    const formattedOrder = order;
    formattedOrder.price = displayNumber(order.price);
    formattedOrder.cumulativeVolume = displayNumber(order.cumulativeVolume);
    formattedOrder.howMuch = displayNumber(order.sell.howMuch);
    return formattedOrder;
  }),
  totalBuyVolume: displayNumber(state.orderbook.totalBuyVolume),
  totalSellVolume: displayNumber(state.orderbook.totalSellVolume),
  baseTokenSymbol: state.app.assetPair.split("/")[0],
  quoteTokenSymbol: state.app.assetPair.split("/")[1],
});

const mapDispatchToProps = dispatch => ({
  getOrderbook: () => {
    dispatch(actions.getOrderbook());
  },
  // onClick: asset => {
  //   if (asset !== "MLN-T") {
  //     const assetPair = `${asset}/MLN-T`;
  //     dispatch(generalCreators.updateAssetPair(assetPair));
  //   }
  // },
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
