import { connect } from "react-redux";
import Trade from "./trade";
import { creators } from "./duck";
import store from "../../store";

const mapStateToProps = state => ({
  ...state.trade,
  ...state.general,
});

const mapDispatchToProps = dispatch => ({
  prefill: order => {
    dispatch(creators.prefill(order));
  },
  onChange: event => {
    dispatch(creators.change({ [event.target.name]: event.target.value }));
  },
  placeOrder: () => {
    if (store.getState().trade.selectedOrder.id) {
      dispatch(creators.takeOrder());
    } else {
      console.log("No order selected. Make order");
      dispatch(creators.makeOrder());
    }
  },
  prefillPrice: price => {
    dispatch(creators.update({ price }));
  },
  onSwitch: () => {
    if (
      store.getState().trade.orderType === "Buy" &&
      store.getState().trade.theirOrderType === "Sell"
    ) {
      dispatch(creators.update({ orderType: "Sell", theirOrderType: "Buy" }));
    } else if (
      store.getState().trade.orderType === "Sell" &&
      store.getState().trade.theirOrderType === "Buy"
    ) {
      dispatch(creators.update({ orderType: "Buy", theirOrderType: "Sell" }));
    }
  },
});

const TradeContainer = connect(mapStateToProps, mapDispatchToProps)(Trade);

export default TradeContainer;
