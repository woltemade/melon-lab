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
});

const TradeContainer = connect(mapStateToProps, mapDispatchToProps)(Trade);

export default TradeContainer;
