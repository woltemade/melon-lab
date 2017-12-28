import { connect } from "react-redux";
import { reduxForm, change } from "redux-form";
import { actions } from "../actions/trade";
import Trade from "../components/organisms/Trade";
import { actions as fundActions } from "../actions/fund";
import {
  multiply,
  divide,
  greaterThan,
  isZero,
} from "../utils/functionalBigNumber";
import displayNumber from "../utils/displayNumber";

const mapStateToProps = state => ({
  loading: state.app.transactionInProgress,
  baseTokenSymbol: state.app.assetPair.base,
  quoteTokenSymbol: state.app.assetPair.quote,
  orderType: state.orderbook.selectedOrder
    ? state.form.trade.values.type
    : "Buy",
  strategy: state.form.trade.values.strategy,
  selectedOrder: state.orderbook.selectedOrder,
});

const onSubmit = (values, dispatch) => {
  if (values.strategy === "Market") {
    dispatch(actions.takeOrder(values));
  } else {
    dispatch(actions.makeOrder(values));
  }
};

const onChange = (values, dispatch, props, previousValues) => {
  const changed = Object.keys(values).reduce(
    (acc, key) => (values[key] !== previousValues[key] ? [key, ...acc] : acc),
    [],
  );

  // Only correct if only one field is changed (i.e. the user is in the form)
  // More than one changes come from the click on the orderbook for example.
  // Furthermore: Only dispatch a change if there is actually a change to avoid
  // infinite loop
  if (changed.length === 1) {
    const field = changed[0];

    if (field === "strategy" && previousValues.strategy === "Limit") {
      props.reset();
    }

    if (field === "total") {
      if (greaterThan(values.total, values.maxTotal)) {
        dispatch(change("trade", "total", values.maxTotal));
      } else {
        const quantity = divide(values.total, values.price);

        if (values.quantity !== quantity)
          dispatch(change("trade", "quantity", displayNumber(quantity)));
      }
    }

    if (field === "quantity") {
      if (greaterThan(values.quantity, values.maxQuantity)) {
        dispatch(change("trade", "quantity", values.maxQuantity));
      } else {
        const total = multiply(values.quantity, values.price);

        if (values.total !== total)
          dispatch(change("trade", "total", displayNumber(total)));
      }
    }

    if (field === "price") {
      dispatch(
        change("trade", "total", multiply(values.quantity, values.price)),
      );
    }
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  /* onChange: (event, value) => {
    // console.log(ownProps);
    // if (event.target.name === "total") {
    //   ownProps.change("quantity", divide(value, ownProps.values.price));
    // } else {
    //   ownProps.change("total", multiply(value, ownProps.values.price));
    // }
  },
  */
});

const TradeRedux = connect(mapStateToProps, mapDispatchToProps)(Trade);

const TradeForm = reduxForm({
  form: "trade",
  onSubmit,
  onChange,
  initialValues: {
    strategy: "Market",
    type: "Buy",
  },
})(TradeRedux);

export default TradeForm;
