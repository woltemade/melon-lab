import moment from "moment";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { actions } from "../actions/tradeHistory";
import TradeHistory from "../components/organisms/TradeHistory";
import displayNumber from "../utils/displayNumber";

const mapStateToProps = state => ({
  ...state.tradeHistory,
  trades: state.tradeHistory.trades.map(trade => {
    trade.price = displayNumber(trade.price);
    trade.quantity = displayNumber(trade.quantity);
    trade.timestamp = moment(trade.timeStamp).format("D. MMM YYYY HH:mm");
    return trade;
  }),
});

const mapDispatchToProps = dispatch => ({
  getTradeHistory: fundAddress => {
    dispatch(actions.getTradeHistory(fundAddress));
  },
});

const TradeHistoryLifecycle = lifecycle({
  componentDidMount() {
    this.props.getTradeHistory(this.props.fundAddress);
  },
})(TradeHistory);

const TradeHistoryContainer = connect(mapStateToProps, mapDispatchToProps)(
  TradeHistoryLifecycle,
);

export default TradeHistoryContainer;
