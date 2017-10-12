import BigNumber from "bignumber.js";
import { connect } from "react-redux";
import TradeHelper from "./tradeHelper";
import { creators as tradeCreators } from "../trade//duck";

const mapStateToProps = state => ({
  ...state.general,
  ...state.tradeHelper,
  bid: new BigNumber(state.tradeHelper.bid).toFixed(4),
  ask: new BigNumber(state.tradeHelper.ask).toFixed(4),
  last: state.tradeHelper.last.toFixed(4),
  baseTokenBalance: new BigNumber(state.tradeHelper.baseTokenBalance).toFixed(
    4,
  ),
  quoteTokenBalance: new BigNumber(state.tradeHelper.quoteTokenBalance).toFixed(
    4,
  ),
});

const mapDispatchToProps = dispatch => ({
  changePrice: price => {
    dispatch(tradeCreators.change({ price }));
  },
  changeQuantity: amount => {
    dispatch(tradeCreators.change({ amount }));
  },
  changeTotal: total => {
    dispatch(tradeCreators.change({ total }));
  },
});

const TradeHelperContainer = connect(mapStateToProps, mapDispatchToProps)(
  TradeHelper,
);

export default TradeHelperContainer;
