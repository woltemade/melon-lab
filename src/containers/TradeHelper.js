import { connect } from "react-redux";
import { actions } from "../actions/tradeHelper";
import { actions as appActions } from "../actions/app";
import { lifecycle } from "recompose";
import TradeHelper from "../components/organisms/TradeHelper";
import displayNumber from "../utils/displayNumber";

const mapStateToProps = state => ({
  last:
    displayNumber(
      state.recentTrades.trades[state.recentTrades.trades.length - 1].price,
    ) || 0,
  bid: displayNumber(state.orderbook.buyOrders[0].price) || 0,
  ask: displayNumber(state.orderbook.sellOrders[0].price) || 0,
  baseTokenSymbol: state.app.assetPair.split("/")[0],
  quoteTokenSymbol: state.app.assetPair.split("/")[1],
  baseTokenBalance:
    state.holdings.find(o => o.name === state.app.assetPair.split("/")[0])
      .balance || 0,
  quoteTokenBalance:
    state.holdings.find(o => o.name === state.app.assetPair.split("/")[1])
      .balance || 0,
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
