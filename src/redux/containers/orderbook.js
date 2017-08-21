import { connect } from "react-redux";
import Orderbook from "../../components/existingUser/orderbook";
import { creators } from "../ducks/orderbook";

const mapStateToProps = state => ({
  ...state.orderbook,
});

const mapDispatchToProps = dispatch => ({
  onRequest: () => {
    dispatch(creators.requestOrderbook());
  },
});

const OrderbookContainer = connect(mapStateToProps, mapDispatchToProps)(
  Orderbook,
);

export default OrderbookContainer;
