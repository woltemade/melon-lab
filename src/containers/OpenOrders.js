import moment from "moment";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { actions } from "../actions/openOrders";
import OpenOrders from "../components/organisms/OpenOrders";
import displayNumber from "../utils/displayNumber";

const mapStateToProps = state => ({
  ...state.openOrders,
  orders: state.openOrders.orders.map(order => ({
    buyHowMuch: displayNumber(order.buyHowMuch),
    buySymbol: order.buySymbol,
    id: order.id.toNumber(),
    price: displayNumber(order.price),
    sellHowMuch: displayNumber(order.sellHowMuch),
    sellSymbol: order.sellSymbol,
    timestamp: moment(order.timestamp).format("D. MMM YYYY HH:mm"),
    type: order.type,
  })),
});

const mapDispatchToProps = dispatch => ({
  getOpenOrders: () => {
    dispatch(actions.getOpenOrders());
  },
});

const OpenOrdersLifecycle = lifecycle({
  componentDidMount() {
    this.props.getOpenOrders();
  },
})(OpenOrders);

const OpenOrdersContainer = connect(mapStateToProps, mapDispatchToProps)(
  OpenOrdersLifecycle,
);

export default OpenOrdersContainer;
