import moment from "moment";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { actions } from "../actions/recentTrades";
import RecentTrades from "../components/organisms/RecentTrades";
import displayNumber from "../utils/displayNumber";

const mapStateToProps = state => ({
  ...state.recentTrades,
  trades: state.recentTrades.trades.map(trade => {
    trade.price = displayNumber(trade.price);
    trade.quantity = displayNumber(trade.quantity);
    trade.timestamp = moment(trade.timeStamp).format("D. MMM YYYY HH:mm");
    return trade;
  }),
});

const mapDispatchToProps = dispatch => ({
  getRecentTrades: assetPair => {
    dispatch(actions.getRecentTrades(assetPair));
  },
});

const RecentTradesLifecycle = lifecycle({
  componentDidMount() {
    this.props.getRecentTrades("ETH-T/MLN-T");
  },
})(RecentTrades);

const RecentTradesContainer = connect(mapStateToProps, mapDispatchToProps)(
  RecentTradesLifecycle,
);

export default RecentTradesContainer;
