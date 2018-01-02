import { connect } from "react-redux";
import { change } from "redux-form";
import { actions } from "../actions/tradeHelper";
import { actions as appActions } from "../actions/app";
import { lifecycle } from "recompose";
import TradeHelper from "../components/organisms/TradeHelper";
import displayNumber from "../utils/displayNumber";

const mapStateToProps = state => ({
  ...state.tradeHelper,
  last: displayNumber(state.tradeHelper.last),
  bid: displayNumber(state.tradeHelper.bid),
  ask: displayNumber(state.tradeHelper.ask),
  baseTokenSymbol: state.app.assetPair.base,
  quoteTokenSymbol: state.app.assetPair.quote,
  baseTokenBalance: displayNumber(state.tradeHelper.baseTokenBalance),
  quoteTokenBalance: displayNumber(state.tradeHelper.quoteTokenBalance),
  strategy: state.form.trade.values.strategy,
});

const mapDispatchToProps = dispatch => ({
  getTradeHelper: () => {
    dispatch(actions.tradeInfoRequested());
  },
  setPrice: (price, strategy) => {
    if (strategy === "Limit") dispatch(change("trade", "price", price));
  },
  setQuantity: (quantity, strategy) => {
    if (strategy === "Limit") dispatch(change("trade", "quantity", quantity));
  },
  setTotal: (total, strategy) => {
    if (strategy === "Limit") dispatch(change("trade", "total", total));
  },
});

const TradeHelperLifecycle = lifecycle({
  componentDidMount() {
    this.props.getTradeHelper();
  },
})(TradeHelper);

const TradeHelperContainer = connect(mapStateToProps, mapDispatchToProps)(
  TradeHelperLifecycle,
);

export default TradeHelperContainer;
