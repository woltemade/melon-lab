import { connect } from "react-redux";
import TradingActivity from "./tradingActivity";
import { creators } from "./duck";

const mapStateToProps = state => ({
  ...state.tradingActivity,
});

const mapDispatchToProps = dispatch => ({
  onRequest: () => {
    dispatch(creators.requestFundRecentTrades());
  },
});

const TradingActivityContainer = connect(mapStateToProps, mapDispatchToProps)(
  TradingActivity,
);

export default TradingActivityContainer;
