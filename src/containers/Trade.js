import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { actions } from "../actions/trade";
import Trade from "../components/organisms/Trade";
import { actions as fundActions } from "../actions/fund";
import { multiply, divide } from "../utils/functionalBigNumber";

const mapStateToProps = state => ({
  loading: state.app.transactionInProgress,
  baseTokenSymbol: state.app.assetPair.base,
  quoteTokenSymbol: state.app.assetPair.quote,
  orderType: state.orderbook.selectedOrder
    ? state.form.trade.values.type
    : "Buy",
});

const onSubmit = (values, dispatch) => {
  if (values.selectedOrder) {
    dispatch(actions.takeOrder(values));
  } else {
    dispatch(actions.makeOrder(values));
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (event, value) => {
    // if (event.target.name === "total") {
    //   ownProps.change("quantity", divide(value, ownProps.price));
    // } else {
    //   ownProps.change("total", multiply(value, ownProps.price));
    // }
  },
});

const TradeRedux = connect(mapStateToProps)(Trade);

const TradeForm = reduxForm({
  form: "trade",
  onSubmit,
})(TradeRedux);

export default TradeForm;
