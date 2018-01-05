import { connect } from "react-redux";
import { actions } from "../actions/holdings";
import { actions as appActions } from "../actions/app";
import { actions as orderbookActions } from "../actions/orderbook";
import { actions as recentTradesActions } from "../actions/recentTrades";
import { actions as tradeHelperActions } from "../actions/tradeHelper";

import { lifecycle } from "recompose";
import Holdings from "../components/organisms/Holdings";
import displayNumber from "../utils/displayNumber";

const mapStateToProps = state => ({
  holdings: state.holdings.holdings.map(asset => ({
    name: asset.name,
    balance: displayNumber(asset.balance),
    price: displayNumber(asset.price),
    percentage: displayNumber(
      asset.balance
        .times(asset.price)
        .div(state.fund.nav)
        .times(100),
    ),
  })),
  isReadyToTrade: state.app.isReadyToTrade,
});

const mapDispatchToProps = dispatch => ({
  getHoldings: fundAddress => {
    dispatch(actions.getHoldings(fundAddress));
  },
  selectAsset: (asset, isReadyToTrade) => {
    if (asset !== "MLN-T") {
      dispatch(appActions.updateAssetPair({ base: asset, quote: "MLN-T" }));
      dispatch(orderbookActions.getOrderbook());
      dispatch(recentTradesActions.getRecentTrades());
      if (isReadyToTrade) {
        dispatch(appActions.scrollTo("trade"));
      } else {
        dispatch(tradeHelperActions.tradeInfoRequested());
        dispatch(appActions.scrollTo("orderbook"));
      }
    }
  },
});

const HoldingsLifecycle = lifecycle({
  componentDidMount() {
    this.props.getHoldings(this.props.fundAddress);
  },
})(Holdings);

const HoldingsContainter = connect(mapStateToProps, mapDispatchToProps)(
  HoldingsLifecycle,
);

export default HoldingsContainter;
