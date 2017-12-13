import moment from "moment";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { actions } from "../actions/recentTrades";
import RecentTrades from "../components/organisms/RecentTrades";
import displayNumber from "../utils/displayNumber";

const mapStateToProps = state => ({
  ...state.recentTrades,
  trades: state.recentTrades.trades.map(trade => ({
    price: displayNumber(trade.price),
    quantity: displayNumber(trade.quantity),
    timestamp: moment(trade.timeStamp).format("D. MMM YYYY HH:mm"),
    type: trade.type,
  })),
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
