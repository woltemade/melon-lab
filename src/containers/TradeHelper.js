import { connect } from "react-redux";
import { actions } from "../actions/tradeHelper";
import { actions as appActions } from "../actions/app";
import { lifecycle } from "recompose";
import TradeHelper from "../components/organisms/TradeHelper";
import displayNumber from "../utils/displayNumber";

const mapStateToProps = state => ({
  last: displayNumber(state.tradeHelper.last),
  bid: displayNumber(state.tradeHelper.bid),
  ask: displayNumber(state.tradeHelper.ask),
  baseTokenSymbol: state.app.assetPair.base,
  quoteTokenSymbol: state.app.assetPair.quote,
  baseTokenBalance: displayNumber(state.tradeHelper.baseTokenBalance),
  quoteTokenBalance: displayNumber(state.tradeHelper.quoteTokenBalance),
});

const mapDispatchToProps = dispatch => ({
  getTradeHelper: () => {
    dispatch(actions.tradeInfoRequested());
  },
  // To be linked up with trade form
  setPrice: price => {
    //   dispatch(tradeCreators.change({ price }));
  },
  setQuantity: amount => {
    //   dispatch(tradeCreators.change({ amount }));
  },
  setTotal: total => {
    //   dispatch(tradeCreators.change({ total }));
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
