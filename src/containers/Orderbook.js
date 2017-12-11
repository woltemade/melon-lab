import { connect } from "react-redux";
import { actions } from "../actions/orderbook";
import { lifecycle } from "recompose";
import Orderbook from "../components/organisms/Orderbook";
import displayNumber from "../utils/displayNumber";

const mapStateToProps = state => ({
  buyOrders: state.orderbook.buyOrders,
  sellOrders: state.orderbook.sellOrders,
  totalBuyVolume: state.orderbook.totalBuyVolume,
  totalSellVolume: state.orderbook.totalSellVolume,
});

const mapDispatchToProps = dispatch => ({
  getOrderbook: assetPair => {
    dispatch(actions.getOrderbook(assetPair));
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
    this.props.getOrderbook("ETH-T/MLN-T");
  },
})(Orderbook);

const OrderbookContainer = connect(mapStateToProps, mapDispatchToProps)(
  OrderbookLifecycle,
);

export default OrderbookContainer;
